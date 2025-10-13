import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { motion } from 'framer-motion';

interface ChatState {
    query: string;
    timestamp: string;
}

const Chat: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [chatState, setChatState] = useState<ChatState | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    useEffect(() => {
        // Get the query from location state
        const state = location.state as ChatState;
        if (state?.query) {
            setChatState(state);
            // Start processing the query
            processQuery(state.query);
        } else {
            // If no query provided, redirect back to home
            navigate('/');
        }
    }, [location.state, navigate]);

    const processQuery = async (query: string) => {
        setIsProcessing(true);

        // Simulate processing time (replace with actual API call later)
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Mock result (replace with actual JSON generation later)
        const mockResult = {
            query: query,
            timestamp: new Date().toISOString(),
            status: "processed",
            message: "Your query is being processed. This is where the JSON specification will be generated."
        };

        setResult(JSON.stringify(mockResult, null, 2));
        setIsProcessing(false);
    };

    const handleNewQuery = () => {
        navigate('/');
    };

    if (!chatState) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 font-['Plus_Jakarta_Sans'] tracking-tight">
            <Navbar />

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-semibold text-gray-800 mb-2">
                        Processing Your Query
                    </h1>
                    <p className="text-gray-600">
                        We're transforming your idea into a detailed JSON specification
                    </p>
                </motion.div>

                {/* Query Display */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white rounded-xl border border-orange-200 p-6 mb-6 shadow-sm"
                >
                    <h2 className="text-lg font-medium text-gray-800 mb-3">Your Query</h2>
                    <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
                        <p className="text-gray-700 font-medium">"{chatState.query}"</p>
                        <p className="text-sm text-gray-500 mt-2">
                            Submitted at: {new Date(chatState.timestamp).toLocaleString()}
                        </p>
                    </div>
                </motion.div>

                {/* Processing Status */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white rounded-xl border border-orange-200 p-6 mb-6 shadow-sm"
                >
                    <h2 className="text-lg font-medium text-gray-800 mb-4">Processing Status</h2>

                    {isProcessing ? (
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-400"></div>
                                <div>
                                    <p className="text-gray-700 font-medium">Generating JSON specification...</p>
                                    <p className="text-sm text-gray-500">
                                        Analyzing your UI requirements and creating detailed specifications
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => result && navigator.clipboard.writeText(result)}
                                className="flex items-center justify-center p-2 rounded-lg bg-orange-100 hover:bg-orange-200 transition-colors"
                                disabled={!result}
                                title="Copy JSON"
                            >
                                <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            </button>
                        </div>
                    ) : result ? (
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2 text-green-600">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="font-medium">Processing Complete!</span>
                            </div>

                            {/* Result Display */}
                            <div className="bg-gray-50 rounded-lg p-4 border">
                                <h3 className="text-sm font-medium text-gray-700 mb-2">Generated JSON Specification:</h3>
                                <pre className="text-xs text-gray-600 overflow-x-auto">
                                    {result}
                                </pre>
                            </div>
                        </div>
                    ) : null}
                </motion.div>

                {/* Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-3"
                >
                    {result && (
                        <button
                            onClick={() => {
                                // TODO: Navigate to JSON editor with the result
                                console.log('Navigate to JSON Editor with:', result);
                            }}
                            className="flex-1 bg-orange-400 hover:bg-orange-500 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            <span>Edit with JSON Editor</span>
                        </button>
                    )}
                    <button
                        onClick={handleNewQuery}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span>Start New Query</span>
                    </button>
                </motion.div>

                {/* Progress Steps */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-8 bg-white rounded-xl border border-orange-200 p-6 shadow-sm"
                >
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Processing Steps</h3>
                    <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span className="text-gray-700">Query received and validated</span>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isProcessing ? 'bg-orange-400' : result ? 'bg-green-500' : 'bg-gray-300'
                                }`}>
                                {isProcessing ? (
                                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                                ) : result ? (
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <span className="text-xs text-white font-bold">2</span>
                                )}
                            </div>
                            <span className="text-gray-700">Generating JSON specification</span>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${result ? 'bg-green-500' : 'bg-gray-300'
                                }`}>
                                {result ? (
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <span className="text-xs text-white font-bold">3</span>
                                )}
                            </div>
                            <span className="text-gray-700">Ready for export to design tools</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Chat;
