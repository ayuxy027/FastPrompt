import React, { useState, useRef, useEffect, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import { motion } from 'framer-motion';

interface JsonEditorProps {
  initialJson?: string;
  onSave?: (json: string) => void;
  onFormat?: (json: string) => void;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ initialJson = '{}' }) => {
  const [jsonValue, setJsonValue] = useState<string>(initialJson);
  const [isFormatted, setIsFormatted] = useState<boolean>(false);
  const [isMinified, setIsMinified] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean>(true);
  const editorRef = useRef<unknown>(null);

  // Update jsonValue when initialJson prop changes
  useEffect(() => {
    setJsonValue(initialJson);
    setIsFormatted(false);
    setIsMinified(false);
    setError(null);
  }, [initialJson]);

  const handleEditorDidMount = (editor: unknown) => {
    editorRef.current = editor;
  };

  const validateJson = useCallback((value: string) => {
    try {
      JSON.parse(value);
      setError(null);
      setIsValid(true);
      return true;
    } catch {
      setError('Invalid JSON format');
      setIsValid(false);
      return false;
    }
  }, []);

  const handleFormatJson = useCallback(() => {
    try {
      const parsed = JSON.parse(jsonValue);
      const formatted = JSON.stringify(parsed, null, 2);
      setJsonValue(formatted);
      setIsFormatted(true);
      setIsMinified(false);
      setError(null);
      setIsValid(true);
    } catch {
      setError('Invalid JSON format');
      setIsValid(false);
    }
  }, [jsonValue]);

  const handleMinifyJson = useCallback(() => {
    try {
      const parsed = JSON.parse(jsonValue);
      const minified = JSON.stringify(parsed);
      setJsonValue(minified);
      setIsMinified(true);
      setIsFormatted(false);
      setError(null);
      setIsValid(true);
    } catch {
      setError('Invalid JSON format');
      setIsValid(false);
    }
  }, [jsonValue]);

  const handleCompressJson = useCallback(() => {
    try {
      const parsed = JSON.parse(jsonValue);
      const compressed = JSON.stringify(parsed, null, 0);
      setJsonValue(compressed);
      setIsMinified(true);
      setIsFormatted(false);
      setError(null);
      setIsValid(true);
    } catch {
      setError('Invalid JSON format');
      setIsValid(false);
    }
  }, [jsonValue]);

  const handleChange = useCallback((value: string | undefined) => {
    if (value !== undefined) {
      setJsonValue(value);
      validateJson(value);
    }
  }, [validateJson]);

  const handleCopyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(jsonValue);
  }, [jsonValue]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([jsonValue], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [jsonValue]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col h-full bg-white rounded-xl border border-orange-200 shadow-sm overflow-hidden"
    >
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between p-4 bg-orange-50 border-b border-orange-100">
        <div className="flex items-center space-x-2 mb-2 sm:mb-0">
          <button
            onClick={handleFormatJson}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${isFormatted
                ? 'bg-orange-400 text-white'
                : 'bg-white text-gray-700 hover:bg-orange-100 border border-orange-200'
              }`}
          >
            Format
          </button>
          <button
            onClick={handleMinifyJson}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${isMinified
                ? 'bg-orange-400 text-white'
                : 'bg-white text-gray-700 hover:bg-orange-100 border border-orange-200'
              }`}
          >
            Minify
          </button>
          <button
            onClick={handleCompressJson}
            className="px-3 py-1.5 bg-white text-gray-700 rounded-lg text-sm font-medium hover:bg-orange-100 border border-orange-200 transition-colors"
          >
            Compress
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopyToClipboard}
            className="px-3 py-1.5 bg-white text-gray-700 rounded-lg text-sm font-medium hover:bg-orange-100 border border-orange-200 transition-colors flex items-center space-x-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span>Copy</span>
          </button>
          <button
            onClick={handleDownload}
            className="px-3 py-1.5 bg-white text-gray-700 rounded-lg text-sm font-medium hover:bg-orange-100 border border-orange-200 transition-colors flex items-center space-x-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Download</span>
          </button>
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
          theme="vs-light"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            wordWrap: 'on',
            formatOnPaste: true,
            formatOnType: true,
          }}
        />
      </div>

      {/* Status Bar */}
      <div className="p-2 bg-orange-50 border-t border-orange-100 flex justify-between items-center text-sm">
        <div className="text-gray-600">
          {isValid ? (
            <span className="text-green-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Valid JSON
            </span>
          ) : error ? (
            <span className="text-red-500 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </span>
          ) : null}
        </div>
        <div className="text-gray-500">
          Lines: {jsonValue.split('\n').length} | Characters: {jsonValue.length}
        </div>
      </div>
    </motion.div>
  );
};

export default JsonEditor;