import { Groq } from 'groq-sdk';

// Initialize the Groq client
const apiKey = import.meta.env.VITE_GROQ_API_KEY;

if (!apiKey) {
  console.error('GROQ API key not found! Please add it to your .env file.');
}

const client = new Groq({
  apiKey: apiKey || 'missing-api-key',
  dangerouslyAllowBrowser: true // Allow usage in browser environment
});

// Available response modes
export type ResponseMode = 'concise' | 'detailed' | 'creative' | 'educational';

// Available LLM models
export const models = {
  llama3: 'llama3-8b-8192',
  mixtral: 'mixtral-8x7b-32768',
  gemma: 'gemma-7b-it'
} as const;

export type ModelType = keyof typeof models;

// Message type - must match the Groq API expected format
export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  name?: string;
}

// Multimodal content interface
export interface MultimodalContent {
  type: 'text' | 'image';
  text?: string;
  image_url?: string;
}

export interface ChatRequestOptions {
  messages: Message[];
  model?: ModelType;
  temperature?: number;
  responseMode?: ResponseMode;
  systemPrompt?: string;
  stream?: boolean;
}

// Base system prompt template
const getSystemPrompt = (responseMode: ResponseMode = 'concise'): string => {
  const basePrompt = "You are an intelligent AI assistant. Answer questions based on your knowledge.";
  
  switch (responseMode) {
    case 'concise':
      return `${basePrompt} Keep your responses brief and to the point.`;
    case 'detailed':
      return `${basePrompt} Provide thorough, well-structured responses with examples where relevant.`;
    case 'creative':
      return `${basePrompt} Be imaginative and think outside the box. Feel free to explore unique perspectives and ideas.`;
    case 'educational':
      return `${basePrompt} Explain concepts thoroughly, as if teaching someone who is learning the subject. Use examples and analogies to illustrate points.`;
    default:
      return basePrompt;
  }
};

/**
 * Sends a chat completion request to the Groq API
 */
export const sendChatRequest = async ({
  messages,
  model = 'llama3',
  temperature = 0.7,
  responseMode = 'concise',
  systemPrompt,
  stream = false
}: ChatRequestOptions) => {
  try {
    // Prepare messages array with system prompt
    const finalSystemPrompt = systemPrompt || getSystemPrompt(responseMode);
    
    const finalMessages = [
      { role: 'system', content: finalSystemPrompt } as const,
      ...messages.map(msg => ({
        role: msg.role,
        content: msg.content,
        ...(msg.name ? { name: msg.name } : {})
      }))
    ];

    // Send request to Groq API
    const response = await client.chat.completions.create({
      messages: finalMessages,
      model: models[model],
      temperature,
      stream
    });

    return response;
  } catch (error) {
    console.error('Error calling Groq API:', error);
    throw error;
  }
}; 