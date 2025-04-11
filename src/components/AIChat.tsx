import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ChatMessage from './ChatMessage';
import ChatControls from './ChatControls';
import ChatSettings from './ChatSettings';
import AIPrompts from '../components/AIPrompts';
import { useAI, AIProvider } from '../ai/aiContext';
import { ChatMessage as ChatMessageType } from '../types/index';
import { Message } from '../ai/groqService';
import useSpeechRecognition from '../ai/speechService';

interface AIChatProps {
    title?: string;
    description?: string;
    placeholder?: string;
    showSettings?: boolean;
    initialSystemPrompt?: string;
}

// Inner component that uses the AI context
const AIChatInner: React.FC<AIChatProps> = ({
    title = 'AI Chat',
    description,
    placeholder = 'Ask me anything...',
    showSettings = true,
}) => {
    const {
        messages: contextMessages,
        isLoading,
        sendMessage,
        model,
        responseMode,
        temperature,
        reasoning,
        setModel,
        setResponseMode,
        setTemperature,
        setReasoning
    } = useAI();

    const [chatMessages, setChatMessages] = useState<ChatMessageType[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Speech recognition
    const {
        transcript,
        isListening,
        startListening,
        stopListening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    // Convert context messages to chat message format with IDs and timestamps
    useEffect(() => {
        const formattedMessages = contextMessages.map(msg => ({
            ...msg,
            id: uuidv4(),
            timestamp: Date.now()
        }));
        setChatMessages(formattedMessages);
    }, [contextMessages]);

    // Scroll to bottom when messages change
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatMessages]);

    // Handle sending a message
    const handleSendMessage = (content: string) => {
        sendMessage(content);
        resetTranscript();
    };

    // Handle stopping voice and sending message
    const handleVoiceStop = () => {
        stopListening();
        if (transcript.trim()) {
            handleSendMessage(transcript);
        }
    };

    return (
        <div className="flex flex-col h-full ai-chat">
            <div className="mb-4 chat-header">
                <h2 className="text-xl font-bold">{title}</h2>
                {description && <p className="mt-1 text-sm text-gray-600">{description}</p>}
            </div>

            {showSettings && (
                <ChatSettings
                    model={model}
                    responseMode={responseMode}
                    temperature={temperature}
                    reasoning={reasoning}
                    onModelChange={setModel}
                    onResponseModeChange={setResponseMode}
                    onTemperatureChange={setTemperature}
                    onReasoningChange={setReasoning}
                />
            )}

            <div className="overflow-y-auto flex-1 mb-4 space-y-4 chat-messages">
                {chatMessages.length === 0 ? (
                    <div className="py-8 text-center text-gray-500">
                        No messages yet. Start a conversation!
                    </div>
                ) : (
                    chatMessages.map((message) => (
                        <ChatMessage
                            key={message.id}
                            message={message}
                            isLoading={isLoading && message === chatMessages[chatMessages.length - 1] && message.role === 'assistant'}
                        />
                    ))
                )}

                {isLoading && chatMessages.length > 0 && chatMessages[chatMessages.length - 1].role === 'user' && (
                    <ChatMessage
                        message={{
                            id: 'loading',
                            role: 'assistant',
                            content: '',
                            timestamp: Date.now()
                        }}
                        isLoading={true}
                    />
                )}

                <div ref={messagesEndRef} />
            </div>

            <ChatControls
                onSend={handleSendMessage}
                disabled={isLoading}
                placeholder={placeholder}
                onVoiceStart={browserSupportsSpeechRecognition ? startListening : undefined}
                onVoiceStop={browserSupportsSpeechRecognition ? handleVoiceStop : undefined}
                isListening={isListening}
                voiceText={transcript}
            />
        </div>
    );
};

// Wrapper component that provides the AI context
const AIChat: React.FC<AIChatProps> = (props) => {
    return (
        <AIProvider initialSystemPrompt={props.initialSystemPrompt}>
            <AIChatInner {...props} />
        </AIProvider>
    );
};

export default AIChat; 