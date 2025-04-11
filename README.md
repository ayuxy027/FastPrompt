# FastPrompt

A beautiful web application with a sunlight effect and a powerful AI chatbot.

## Features

- **Sunlight Effect:** Toggle a beautiful sunlight effect using the spacebar
- **AI Chatbot with Groq API:** Modern conversation interface with AI
- **Voice Input:** Speak to the chatbot directly with Web Speech API
- **Multiple Response Modes:** Choose between concise, detailed, creative, or educational responses
- **Multiple LLM Models:** Select between different language models
- **Reasoning Mode:** Option to show AI reasoning step-by-step
- **System Prompts:** Customize how the AI responds with different system prompts

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and add your Groq API key
4. Run the development server: `npm run dev`

## AI Features

- **Voice Input:** Click the microphone icon to speak to the AI assistant
- **Model Selection:** Choose between different LLM models
- **Response Style:** Set your preference for how detailed or creative the AI should be
- **Reasoning Toggle:** Enable to see the AI's step-by-step reasoning process
- **Temperature Control:** Adjust randomness in responses

## Requirements

- Node.js 16+
- Groq API key (from [groq.com](https://groq.com))
- Modern web browser with SpeechRecognition API support (Chrome recommended)

## License

MIT