import { Message, ResponseMode, ModelType } from '../ai/groqService';

export interface ChatMessage extends Message {
  id: string;
  timestamp: number;
}

export interface ChatUIProps {
  title?: string;
  description?: string;
  placeholder?: string;
  showSettings?: boolean;
}

export interface MessageUIProps {
  message: ChatMessage;
  isLoading?: boolean;
}

export interface ChatControlsProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
  onVoiceStart?: () => void;
  onVoiceStop?: () => void;
  isListening?: boolean;
  voiceText?: string;
}

export interface ChatSettingsProps {
  model: ModelType;
  responseMode: ResponseMode;
  temperature: number;
  reasoning: boolean;
  onModelChange: (model: ModelType) => void;
  onResponseModeChange: (mode: ResponseMode) => void;
  onTemperatureChange: (temp: number) => void;
  onReasoningChange: (enabled: boolean) => void;
}

export interface AIChatProps extends ChatUIProps {
  initialSystemPrompt?: string;
} 