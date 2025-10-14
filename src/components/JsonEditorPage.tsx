import React, { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import JsonEditor from './JsonEditor';
import { motion } from 'framer-motion';

interface LocationState {
  initialJson?: string;
}

const JsonEditorPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Check if there's JSON data passed from the chat component
  const locationState = location.state as LocationState | undefined;

  const initialJson = locationState?.initialJson ||
    JSON.stringify({
      "example": "JSON data",
      "description": "Edit your JSON here",
      "features": ["formatting", "validation", "editing tools"]
    }, null, 2);

  const handleSave = useCallback((json: string) => {
    // In a real app, this would save to a backend or state
    console.log('Saving JSON:', json);
    alert('JSON saved successfully!');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-['Plus_Jakarta_Sans'] tracking-tight">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">
            JSON Editor
          </h1>
          <p className="text-gray-600">
            Edit, format, and validate your JSON data with powerful tools
          </p>
        </motion.div>

        {/* JSON Editor Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <JsonEditor initialJson={initialJson} onSave={handleSave} />
        </motion.div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl border border-orange-200 p-6 shadow-sm"
        >
          <h3 className="text-lg font-medium text-gray-800 mb-4">JSON Editor Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-start space-x-2">
              <div className="mt-1 w-2 h-2 rounded-full bg-orange-400"></div>
              <div>
                <h4 className="font-medium text-gray-800">Syntax Highlighting</h4>
                <p className="text-sm text-gray-600">Automatic syntax highlighting for better readability</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="mt-1 w-2 h-2 rounded-full bg-orange-400"></div>
              <div>
                <h4 className="font-medium text-gray-800">Auto Formatting</h4>
                <p className="text-sm text-gray-600">Format your JSON with the click of a button</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="mt-1 w-2 h-2 rounded-full bg-orange-400"></div>
              <div>
                <h4 className="font-medium text-gray-800">Real-time Validation</h4>
                <p className="text-sm text-gray-600">Instant validation as you type</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="mt-1 w-2 h-2 rounded-full bg-orange-400"></div>
              <div>
                <h4 className="font-medium text-gray-800">Minify/Compress</h4>
                <p className="text-sm text-gray-600">Optimize your JSON for storage or transmission</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="mt-1 w-2 h-2 rounded-full bg-orange-400"></div>
              <div>
                <h4 className="font-medium text-gray-800">Copy/Download</h4>
                <p className="text-sm text-gray-600">Easily copy to clipboard or download as file</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="mt-1 w-2 h-2 rounded-full bg-orange-400"></div>
              <div>
                <h4 className="font-medium text-gray-800">Error Detection</h4>
                <p className="text-sm text-gray-600">Clear error messages for invalid JSON</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 mt-6"
        >
          <button
            onClick={() => navigate('/')}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Home</span>
          </button>
          <button
            onClick={() => navigate('/chat')}
            className="flex-1 bg-orange-400 hover:bg-orange-500 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>Try Chat</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default JsonEditorPage;