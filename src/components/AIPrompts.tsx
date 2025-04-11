import React, { useState } from 'react';

// Define different system prompts for various use cases
export const SYSTEM_PROMPTS = {
    general: "You are a helpful AI assistant. Provide accurate, clear, and concise responses to questions.",
    creative: "You are a creative AI assistant with a talent for generating imaginative ideas, stories, and content. Think outside the box and provide unique perspectives.",
    developer: "You are a coding assistant AI. Provide helpful programming advice, code examples, and technical explanations. Focus on clean, efficient, and well-documented code.",
    educator: "You are an AI tutor designed to explain concepts clearly and comprehensively. Break down complex topics into simpler parts, use analogies when helpful, and check for understanding.",
    business: "You are a business consultant AI. Provide strategic advice, market insights, and practical business solutions. Be professional, data-driven, and results-oriented.",
    coach: "You are a supportive AI coach. Offer encouragement, constructive feedback, and practical advice to help users achieve their goals. Be empathetic yet direct."
};

export type SystemPromptType = keyof typeof SYSTEM_PROMPTS;

interface AIPromptsProps {
    onSelectPrompt: (prompt: string) => void;
    currentPrompt?: string;
}

const AIPrompts: React.FC<AIPromptsProps> = ({ onSelectPrompt, currentPrompt }) => {
    const [customPrompt, setCustomPrompt] = useState<string>('');
    const [selectedType, setSelectedType] = useState<SystemPromptType | 'custom'>('general');

    const handlePromptTypeChange = (type: SystemPromptType | 'custom') => {
        setSelectedType(type);
        if (type !== 'custom') {
            onSelectPrompt(SYSTEM_PROMPTS[type]);
        }
    };

    const handleCustomPromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCustomPrompt(e.target.value);
    };

    const handleCustomPromptSubmit = () => {
        if (customPrompt.trim()) {
            onSelectPrompt(customPrompt);
        }
    };

    return (
        <div className="ai-prompts space-y-4">
            <h3 className="text-lg font-medium">System Prompts</h3>

            <div className="prompt-selector">
                <label className="block text-sm font-medium mb-2">
                    Select Prompt Type
                </label>

                <div className="flex flex-wrap gap-2 mb-4">
                    {Object.keys(SYSTEM_PROMPTS).map((type) => (
                        <button
                            key={type}
                            onClick={() => handlePromptTypeChange(type as SystemPromptType)}
                            className={`px-3 py-1 rounded-full text-sm ${selectedType === type
                                ? 'bg-gray-800 text-white'
                                : 'bg-gray-200 hover:bg-gray-300'
                                }`}
                        >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePromptTypeChange('custom')}
                        className={`px-3 py-1 rounded-full text-sm ${selectedType === 'custom'
                            ? 'bg-gray-800 text-white'
                            : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                    >
                        Custom
                    </button>
                </div>
            </div>

            {selectedType === 'custom' && (
                <div className="custom-prompt-section">
                    <label className="block text-sm font-medium mb-2">
                        Custom System Prompt
                    </label>
                    <textarea
                        value={customPrompt}
                        onChange={handleCustomPromptChange}
                        placeholder="Enter your custom system prompt..."
                        className="w-full px-3 py-2 border rounded-md resize-none h-32"
                    />
                    <button
                        onClick={handleCustomPromptSubmit}
                        className="mt-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
                    >
                        Apply Custom Prompt
                    </button>
                </div>
            )}

            {selectedType !== 'custom' && (
                <div className="current-prompt mt-4">
                    <h4 className="text-sm font-medium mb-1">Current Prompt:</h4>
                    <p className="text-sm bg-gray-100 p-3 rounded-md">
                        {SYSTEM_PROMPTS[selectedType as SystemPromptType]}
                    </p>
                </div>
            )}
        </div>
    );
};

export default AIPrompts; 