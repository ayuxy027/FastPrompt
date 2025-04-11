import React, { useState, useEffect, useRef } from 'react';
import { IoSend, IoMic, IoMicOff } from 'react-icons/io5';

interface ChatControlsProps {
    onSend: (message: string) => void;
    disabled?: boolean;
    placeholder?: string;
    onVoiceStart?: () => void;
    onVoiceStop?: () => void;
    isListening?: boolean;
    voiceText?: string;
}

const ChatControls: React.FC<ChatControlsProps> = ({
    onSend,
    disabled = false,
    placeholder = 'Type a message...',
    onVoiceStart,
    onVoiceStop,
    isListening = false,
    voiceText = ''
}) => {
    const [message, setMessage] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Update message when voice text changes
    useEffect(() => {
        if (voiceText) {
            setMessage(voiceText);
        }
    }, [voiceText]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleSend = () => {
        const trimmedMessage = message.trim();
        if (trimmedMessage && !disabled) {
            onSend(trimmedMessage);
            setMessage('');
        }
    };

    const handleVoiceToggle = () => {
        if (isListening) {
            onVoiceStop?.();
        } else {
            onVoiceStart?.();
        }
    };

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
        }
    };

    useEffect(() => {
        adjustTextareaHeight();
    }, [message]);

    return (
        <div className="chat-controls">
            <div className="flex gap-2 items-end p-3 rounded-xl border border-gray-200/30 dark:border-gray-700/30 shadow-sm backdrop-filter">
                <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="flex-grow min-h-[40px] max-h-[150px] p-2 bg-transparent border-none resize-none focus:outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    disabled={disabled}
                    rows={1}
                />

                <div className="flex gap-2 items-center">
                    {onVoiceStart && onVoiceStop && (
                        <button
                            onClick={handleVoiceToggle}
                            className={`p-2.5 rounded-full transition-all duration-200 ease-in-out ${isListening
                                    ? 'text-white bg-red-500/90 shadow-md hover:bg-red-600/90'
                                    : 'text-gray-600 dark:text-gray-300 bg-gray-200/80 dark:bg-gray-700/80 hover:bg-gray-300/80 dark:hover:bg-gray-600/80'
                                }`}
                            type="button"
                            disabled={disabled}
                        >
                            {isListening ? <IoMicOff size={20} /> : <IoMic size={20} />}
                        </button>
                    )}

                    <button
                        onClick={handleSend}
                        className={`p-2.5 rounded-full transition-all duration-200 ease-in-out ${message.trim() && !disabled
                                ? 'bg-blue-600/90 hover:bg-blue-700/90 text-white shadow-md'
                                : 'bg-gray-200/80 dark:bg-gray-700/80 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                            }`}
                        type="button"
                        disabled={!message.trim() || disabled}
                    >
                        <IoSend size={20} />
                    </button>
                </div>
            </div>

            {isListening && (
                <div className="flex gap-2 items-center mt-2 text-sm text-gray-600 dark:text-gray-400 voice-indicator">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    Listening...
                </div>
            )}
        </div>
    );
};

export default ChatControls; 