import React, { useState } from 'react';
import { ChatSettingsProps } from '../types/index';
import { models, ResponseMode, ModelType } from '../ai/groqService';

const ChatSettings: React.FC<ChatSettingsProps> = ({
    model,
    responseMode,
    temperature,
    reasoning,
    onModelChange,
    onResponseModeChange,
    onTemperatureChange,
    onReasoningChange
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const responseModes: ResponseMode[] = ['concise', 'detailed', 'creative', 'educational'];
    const modelOptions: ModelType[] = Object.keys(models) as ModelType[];

    return (
        <div className="p-4 mb-4 bg-white rounded-lg border border-gray-200 chat-settings">
            <div
                className="flex justify-between items-center cursor-pointer settings-header"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <h3 className="font-medium text-md">Chat Settings</h3>
                <span className="text-sm text-gray-500">
                    {isExpanded ? '▲ Hide' : '▼ Show'}
                </span>
            </div>

            {isExpanded && (
                <div className="mt-4 space-y-4 settings-body">
                    {/* Model Selection */}
                    <div className="setting-group">
                        <label className="block mb-2 text-sm font-medium">Model</label>
                        <div className="flex flex-wrap gap-2">
                            {modelOptions.map((modelOption) => (
                                <button
                                    key={modelOption}
                                    onClick={() => onModelChange(modelOption)}
                                    className={`px-3 py-1 text-sm rounded-full ${model === modelOption
                                        ? 'bg-gray-800 text-white'
                                        : 'bg-gray-200 hover:bg-gray-300'
                                        }`}
                                >
                                    {modelOption}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Response Mode */}
                    <div className="setting-group">
                        <label className="block mb-2 text-sm font-medium">Response Style</label>
                        <div className="flex flex-wrap gap-2">
                            {responseModes.map((mode) => (
                                <button
                                    key={mode}
                                    onClick={() => onResponseModeChange(mode)}
                                    className={`px-3 py-1 text-sm rounded-full ${responseMode === mode
                                        ? 'bg-gray-800 text-white'
                                        : 'bg-gray-200 hover:bg-gray-300'
                                        }`}
                                >
                                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Temperature Slider */}
                    <div className="setting-group">
                        <label className="block mb-2 text-sm font-medium">
                            Temperature: {temperature.toFixed(1)}
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={temperature}
                            onChange={(e) => onTemperatureChange(parseFloat(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between mt-1 text-xs text-gray-500">
                            <span>Precise</span>
                            <span>Creative</span>
                        </div>
                    </div>

                    {/* Show Reasoning Toggle */}
                    <div className="setting-group">
                        <div className="flex items-center">
                            <label htmlFor="reasoning-toggle" className="mr-2 text-sm font-medium">
                                Show Reasoning
                            </label>
                            <label className="inline-flex relative items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    id="reasoning-toggle"
                                    checked={reasoning}
                                    onChange={(e) => onReasoningChange(e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gray-800"></div>
                            </label>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                            When enabled, the AI will explain its reasoning before giving the final answer.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatSettings; 