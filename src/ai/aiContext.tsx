import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
    sendChatRequest,
    Message,
    ResponseMode,
    ModelType,
    models
} from './groqService';

interface AIContextProps {
    messages: Message[];
    isLoading: boolean;
    error: Error | null;
    model: ModelType;
    responseMode: ResponseMode;
    temperature: number;
    reasoning: boolean;
    sendMessage: (content: string) => Promise<void>;
    clearMessages: () => void;
    setModel: (model: ModelType) => void;
    setResponseMode: (mode: ResponseMode) => void;
    setTemperature: (temp: number) => void;
    setReasoning: (enabled: boolean) => void;
    availableModels: typeof models;
}

const AIContext = createContext<AIContextProps | undefined>(undefined);

export const useAI = () => {
    const context = useContext(AIContext);
    if (!context) {
        throw new Error('useAI must be used within an AIProvider');
    }
    return context;
};

interface AIProviderProps {
    children: ReactNode;
    initialSystemPrompt?: string;
}

export const AIProvider: React.FC<AIProviderProps> = ({
    children,
    initialSystemPrompt,
}) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [model, setModel] = useState<ModelType>('llama3');
    const [responseMode, setResponseMode] = useState<ResponseMode>('concise');
    const [temperature, setTemperature] = useState<number>(0.7);
    const [reasoning, setReasoning] = useState<boolean>(false);

    const sendMessage = async (content: string) => {
        try {
            setIsLoading(true);
            setError(null);

            // Add user message to the conversation
            const userMessage: Message = { role: 'user', content };
            const updatedMessages = [...messages, userMessage];
            setMessages(updatedMessages);

            // If reasoning is enabled, include instructions in the prompt
            let systemPrompt = initialSystemPrompt;
            if (reasoning) {
                systemPrompt = `${initialSystemPrompt || ''}\nWhen answering, first explain your reasoning step by step, then provide a conclusion.`;
            }

            // Send request to API
            const response = await sendChatRequest({
                messages: updatedMessages,
                model,
                responseMode,
                temperature,
                systemPrompt
            });

            // Add assistant's response to the conversation
            if ('choices' in response && response.choices && response.choices.length > 0) {
                const assistantMessage: Message = {
                    role: 'assistant',
                    content: response.choices[0].message.content || ''
                };

                setMessages([...updatedMessages, assistantMessage]);
            }
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Unknown error occurred'));
            console.error('Error sending message:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const clearMessages = () => {
        setMessages([]);
    };

    const value = {
        messages,
        isLoading,
        error,
        model,
        responseMode,
        temperature,
        reasoning,
        sendMessage,
        clearMessages,
        setModel,
        setResponseMode,
        setTemperature,
        setReasoning,
        availableModels: models
    };

    return <AIContext.Provider value={value}>{children}</AIContext.Provider>;
}; 