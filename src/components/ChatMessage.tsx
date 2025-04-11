import React from 'react';
import { MessageUIProps } from '../types/index';
import ReactMarkdown from 'react-markdown';
import { FaRobot, FaUser } from 'react-icons/fa';

const ChatMessage: React.FC<MessageUIProps> = ({ message, isLoading }) => {
    const isUser = message.role === 'user';

    return (
        <div className={`message-container flex gap-3 ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
            {!isUser && (
                <div className="flex flex-shrink-0 justify-center items-center w-9 h-9 bg-gradient-to-br from-blue-500/80 to-purple-500/80 text-white rounded-full shadow-md avatar backdrop-blur-sm">
                    <FaRobot className="text-white" />
                </div>
            )}

            <div className={`message max-w-[80%] p-4 rounded-2xl shadow-sm ${isUser
                    ? 'bg-gradient-to-r from-blue-500/80 to-indigo-600/80 text-white'
                    : 'bg-white/80 dark:bg-gray-800/80 border border-gray-200/30 dark:border-gray-700/30'
                }`}>
                {isLoading ? (
                    <div className="flex items-center p-2 space-x-2 loading-indicator">
                        <div className="dot-pulse flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 dark:bg-gray-300 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-gray-400 dark:bg-gray-300 rounded-full delay-150 animate-pulse"></div>
                            <div className="w-2 h-2 bg-gray-400 dark:bg-gray-300 rounded-full delay-300 animate-pulse"></div>
                        </div>
                    </div>
                ) : (
                    <div className={`message-content prose ${!isUser && 'dark:prose-invert'} max-w-none`}>
                        <ReactMarkdown>
                            {message.content}
                        </ReactMarkdown>
                    </div>
                )}
                <div className={`mt-1 text-xs text-right ${isUser ? 'text-blue-100' : 'text-gray-400 dark:text-gray-500'}`}>
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
            </div>

            {isUser && (
                <div className="flex flex-shrink-0 justify-center items-center w-9 h-9 bg-gradient-to-br from-indigo-600/80 to-blue-500/80 text-white rounded-full shadow-md avatar backdrop-blur-sm">
                    <FaUser className="text-white" />
                </div>
            )}
        </div>
    );
};

export default ChatMessage; 