import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import Editor from '@monaco-editor/react';
import { motion } from 'framer-motion';

interface JsonEditorProps {
  initialJson?: string;
  onSave?: (json: string) => void;
  onFormat?: (json: string) => void;
  autoSave?: boolean;
  storageKey?: string;
}

const JsonEditor: React.FC<JsonEditorProps> = ({
  initialJson = '{}',
  onSave,
  onFormat,
  autoSave = true,
  storageKey = 'fastprompt_json_editor'
}) => {
  const [jsonValue, setJsonValue] = useState<string>(initialJson);
  const [isFormatted, setIsFormatted] = useState<boolean>(false);
  const [isMinified, setIsMinified] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [editorTheme, setEditorTheme] = useState<'light' | 'dark'>('light');
  const [fontSize, setFontSize] = useState<number>(14);
  const [wordWrap, setWordWrap] = useState<boolean>(true);
  const [showMinimap, setShowMinimap] = useState<boolean>(false);
  const [showLineNumbers, setShowLineNumbers] = useState<boolean>(true);
  const [showWhitespace, setShowWhitespace] = useState<boolean>(false);
  const [autoFormat, setAutoFormat] = useState<boolean>(true);
  const editorRef = useRef<unknown>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const loadFromStorage = () => {
      try {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
          const parsed = JSON.parse(stored);
          setJsonValue(parsed.content || initialJson);
          setEditorTheme(parsed.theme || 'light');
          setFontSize(parsed.fontSize || 14);
          setWordWrap(parsed.wordWrap !== false);
          setShowMinimap(parsed.showMinimap || false);
          setShowLineNumbers(parsed.showLineNumbers !== false);
          setShowWhitespace(parsed.showWhitespace || false);
          setAutoFormat(parsed.autoFormat !== false);
        } else {
          setJsonValue(initialJson);
        }
      } catch (error) {
        console.warn('Failed to load from localStorage:', error);
        setJsonValue(initialJson);
      }
    };

    loadFromStorage();
  }, [initialJson, storageKey]);

  // Auto-save functionality
  useEffect(() => {
    if (autoSave && hasUnsavedChanges) {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      saveTimeoutRef.current = setTimeout(() => {
        saveToStorage();
      }, 1000); // Auto-save after 1 second of inactivity
    }

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [jsonValue, autoSave, hasUnsavedChanges, storageKey]);

  // Update jsonValue when initialJson prop changes
  useEffect(() => {
    if (initialJson !== jsonValue) {
      setJsonValue(initialJson);
      setIsFormatted(false);
      setIsMinified(false);
      setError(null);
      setHasUnsavedChanges(true);
    }
  }, [initialJson]);

  const handleEditorDidMount = (editor: unknown) => {
    editorRef.current = editor;
  };

  const saveToStorage = useCallback(() => {
    try {
      const data = {
        content: jsonValue,
        theme: editorTheme,
        fontSize,
        wordWrap,
        showMinimap,
        showLineNumbers,
        showWhitespace,
        autoFormat,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(storageKey, JSON.stringify(data));
      setHasUnsavedChanges(false);
      setLastSaved(new Date());
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  }, [jsonValue, editorTheme, fontSize, wordWrap, showMinimap, showLineNumbers, showWhitespace, autoFormat, storageKey]);

  const validateJson = useCallback((value: string) => {
    if (!value.trim()) {
      setError('JSON cannot be empty');
      setIsValid(false);
      return false;
    }

    try {
      const parsed = JSON.parse(value);

      // Additional validation
      if (typeof parsed !== 'object' || parsed === null) {
        setError('JSON must be an object or array');
        setIsValid(false);
        return false;
      }

      setError(null);
      setIsValid(true);
      return true;
    } catch (error) {
      if (error instanceof SyntaxError) {
        const message = error.message;
        if (message.includes('Unexpected end of JSON input')) {
          setError('Incomplete JSON - missing closing bracket or quote');
        } else if (message.includes('Unexpected token')) {
          setError(`Syntax error: ${message}`);
        } else {
          setError(`JSON parse error: ${message}`);
        }
      } else {
        setError('Invalid JSON format');
      }
      setIsValid(false);
      return false;
    }
  }, []);

  const handleFormatJson = useCallback(() => {
    if (!jsonValue.trim()) {
      setError('Cannot format empty JSON');
      return;
    }

    try {
      const parsed = JSON.parse(jsonValue);
      const formatted = JSON.stringify(parsed, null, 2);
      setJsonValue(formatted);
      setIsFormatted(true);
      setIsMinified(false);
      setError(null);
      setIsValid(true);
      setHasUnsavedChanges(true);
    } catch (error) {
      setError('Cannot format invalid JSON');
      setIsValid(false);
    }
  }, [jsonValue]);

  const handleMinifyJson = useCallback(() => {
    if (!jsonValue.trim()) {
      setError('Cannot minify empty JSON');
      return;
    }

    try {
      const parsed = JSON.parse(jsonValue);
      const minified = JSON.stringify(parsed);
      setJsonValue(minified);
      setIsMinified(true);
      setIsFormatted(false);
      setError(null);
      setIsValid(true);
      setHasUnsavedChanges(true);
    } catch (error) {
      setError('Cannot minify invalid JSON');
      setIsValid(false);
    }
  }, [jsonValue]);

  const handleCompressJson = useCallback(() => {
    if (!jsonValue.trim()) {
      setError('Cannot compress empty JSON');
      return;
    }

    try {
      const parsed = JSON.parse(jsonValue);
      const compressed = JSON.stringify(parsed, null, 0);
      setJsonValue(compressed);
      setIsMinified(true);
      setIsFormatted(false);
      setError(null);
      setIsValid(true);
      setHasUnsavedChanges(true);
    } catch (error) {
      setError('Cannot compress invalid JSON');
      setIsValid(false);
    }
  }, [jsonValue]);

  const handleChange = useCallback((value: string | undefined) => {
    if (value !== undefined) {
      setJsonValue(value);
      setHasUnsavedChanges(true);
      validateJson(value);

      // Auto-format if enabled and JSON is valid
      if (autoFormat && value.trim()) {
        try {
          JSON.parse(value);
          // Don't auto-format if already formatted or minified
          if (!isFormatted && !isMinified) {
            const parsed = JSON.parse(value);
            const formatted = JSON.stringify(parsed, null, 2);
            if (formatted !== value) {
              setJsonValue(formatted);
              setIsFormatted(true);
            }
          }
        } catch {
          // Ignore formatting errors during typing
        }
      }
    }
  }, [validateJson, autoFormat, isFormatted, isMinified]);

  const handleCopyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(jsonValue);
      // You could add a toast notification here
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = jsonValue;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  }, [jsonValue]);

  const handleDownload = useCallback(() => {
    try {
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `fastprompt-json-${timestamp}.json`;
      const blob = new Blob([jsonValue], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download file:', error);
    }
  }, [jsonValue]);

  const handleClear = useCallback(() => {
    setJsonValue('{}');
    setError(null);
    setIsValid(true);
    setIsFormatted(false);
    setIsMinified(false);
    setHasUnsavedChanges(true);
  }, []);

  const handleLoadFromFile = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
      setError('Please select a valid JSON file');
      return;
    }

    setIsLoading(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        JSON.parse(content); // Validate JSON
        setJsonValue(content);
        setError(null);
        setIsValid(true);
        setHasUnsavedChanges(true);
      } catch (error) {
        setError('Invalid JSON file');
        setIsValid(false);
      } finally {
        setIsLoading(false);
        event.target.value = ''; // Reset file input
      }
    };

    reader.onerror = () => {
      setError('Failed to read file');
      setIsLoading(false);
    };

    reader.readAsText(file);
  }, []);

  const handleSave = useCallback(() => {
    saveToStorage();
    if (onSave) {
      onSave(jsonValue);
    }
  }, [jsonValue, saveToStorage, onSave]);

  // Statistics
  const stats = useMemo(() => {
    const lines = jsonValue.split('\n').length;
    const characters = jsonValue.length;
    const words = jsonValue.split(/\s+/).filter(word => word.length > 0).length;

    let size = '0 B';
    if (characters > 0) {
      const bytes = new Blob([jsonValue]).size;
      if (bytes < 1024) {
        size = `${bytes} B`;
      } else if (bytes < 1024 * 1024) {
        size = `${(bytes / 1024).toFixed(1)} KB`;
      } else {
        size = `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
      }
    }

    return { lines, characters, words, size };
  }, [jsonValue]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col h-full bg-white rounded-xl border border-orange-200 shadow-sm overflow-hidden"
    >
      {/* Toolbar */}
      <div className="bg-orange-50 border-b border-orange-100">
        {/* Main Toolbar */}
        <div className="flex flex-wrap items-center justify-between p-4">
          <div className="flex items-center space-x-2 mb-2 sm:mb-0">
            <button
              onClick={handleFormatJson}
              disabled={isLoading}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1 ${isFormatted
                  ? 'bg-orange-400 text-white'
                  : 'bg-white text-gray-700 hover:bg-orange-100 border border-orange-200 disabled:opacity-50'
                }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              <span>Format</span>
            </button>
            <button
              onClick={handleMinifyJson}
              disabled={isLoading}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1 ${isMinified
                  ? 'bg-orange-400 text-white'
                  : 'bg-white text-gray-700 hover:bg-orange-100 border border-orange-200 disabled:opacity-50'
                }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Minify</span>
            </button>
            <button
              onClick={handleCompressJson}
              disabled={isLoading}
              className="px-3 py-1.5 bg-white text-gray-700 rounded-lg text-sm font-medium hover:bg-orange-100 border border-orange-200 transition-colors flex items-center space-x-1 disabled:opacity-50"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span>Compress</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyToClipboard}
              disabled={isLoading}
              className="px-3 py-1.5 bg-white text-gray-700 rounded-lg text-sm font-medium hover:bg-orange-100 border border-orange-200 transition-colors flex items-center space-x-1 disabled:opacity-50"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Copy</span>
            </button>
            <button
              onClick={handleDownload}
              disabled={isLoading}
              className="px-3 py-1.5 bg-white text-gray-700 rounded-lg text-sm font-medium hover:bg-orange-100 border border-orange-200 transition-colors flex items-center space-x-1 disabled:opacity-50"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download</span>
            </button>
            <button
              onClick={handleClear}
              disabled={isLoading}
              className="px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 border border-red-200 transition-colors flex items-center space-x-1 disabled:opacity-50"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Secondary Toolbar - File Operations & Settings */}
        <div className="flex flex-wrap items-center justify-between p-4 pt-0 border-t border-orange-100">
          <div className="flex items-center space-x-2 mb-2 sm:mb-0">
            <input
              type="file"
              accept=".json"
              onChange={handleLoadFromFile}
              className="hidden"
              id="json-file-input"
            />
            <label
              htmlFor="json-file-input"
              className="px-3 py-1.5 bg-white text-gray-700 rounded-lg text-sm font-medium hover:bg-orange-100 border border-orange-200 transition-colors flex items-center space-x-1 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span>Load File</span>
            </label>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 border border-green-200 transition-colors flex items-center space-x-1 disabled:opacity-50"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span>Save</span>
            </button>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-600">
            {hasUnsavedChanges && (
              <span className="flex items-center space-x-1 text-orange-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span>Unsaved changes</span>
              </span>
            )}
            {lastSaved && (
              <span className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Saved {lastSaved.toLocaleTimeString()}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 relative">
        <Editor
          height="500px"
          defaultLanguage="json"
          value={jsonValue}
          onChange={handleChange}
          onMount={handleEditorDidMount}
          theme={editorTheme === 'dark' ? 'vs-dark' : 'vs-light'}
          loading={<div className="flex items-center justify-center h-full">Loading editor...</div>}
          options={{
            minimap: { enabled: showMinimap },
            fontSize: fontSize,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            wordWrap: wordWrap ? 'on' : 'off',
            formatOnPaste: autoFormat,
            formatOnType: autoFormat,
            lineNumbers: showLineNumbers ? 'on' : 'off',
            renderWhitespace: showWhitespace ? 'all' : 'none',
            tabSize: 2,
            insertSpaces: true,
            detectIndentation: false,
            bracketPairColorization: { enabled: true },
            guides: {
              bracketPairs: true,
              indentation: true
            },
            suggest: {
              showKeywords: true,
              showSnippets: true
            },
            quickSuggestions: true,
            parameterHints: { enabled: true },
            hover: { enabled: true },
            contextmenu: true,
            mouseWheelZoom: true,
            smoothScrolling: true,
            cursorBlinking: 'blink',
            cursorSmoothCaretAnimation: 'on',
            fontFamily: "'Fira Code', 'Monaco', 'Cascadia Code', 'Roboto Mono', monospace",
            fontLigatures: true
          }}
        />
      </div>

      {/* Status Bar */}
      <div className="p-3 bg-orange-50 border-t border-orange-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0 text-sm">
          {/* Validation Status */}
          <div className="flex items-center space-x-4">
            {isValid ? (
              <span className="text-green-600 flex items-center space-x-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Valid JSON</span>
              </span>
            ) : error ? (
              <span className="text-red-500 flex items-center space-x-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">{error}</span>
              </span>
            ) : (
              <span className="text-gray-500 flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Ready to edit</span>
              </span>
            )}

            {/* Auto-save indicator */}
            {autoSave && (
              <span className="text-gray-500 flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Auto-save enabled</span>
              </span>
            )}
          </div>

          {/* Statistics */}
          <div className="flex items-center space-x-4 text-gray-500">
            <span className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>{stats.lines} lines</span>
            </span>
            <span className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
              </svg>
              <span>{stats.characters} chars</span>
            </span>
            <span className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2M9 9h6M9 13h6M9 17h6" />
              </svg>
              <span>{stats.size}</span>
            </span>
            <span className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>{stats.words} words</span>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default JsonEditor;