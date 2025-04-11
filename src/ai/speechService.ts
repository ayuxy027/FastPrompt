// This service will handle browser-based speech recognition
import { useState, useCallback, useEffect } from 'react';

// SpeechRecognition interface for web browsers
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: Event) => void) | null;
  onend: ((event: Event) => void) | null;
  onstart: ((event: Event) => void) | null;
}

// Get the browser's SpeechRecognition object
const SpeechRecognitionAPI = 
  window.SpeechRecognition || 
  (window as any).webkitSpeechRecognition ||
  null;

export const useSpeechRecognition = () => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Initialize speech recognition on first call
  useEffect(() => {
    if (!SpeechRecognitionAPI) {
      setError('Speech recognition is not supported in this browser');
      return;
    }
    
    const recognitionInstance = new SpeechRecognitionAPI() as SpeechRecognition;
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = 'en-US';
    
    recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');
      
      setTranscript(transcript);
    };
    
    recognitionInstance.onerror = (event) => {
      console.error('Speech recognition error', event);
      setError('Error occurred during speech recognition');
      setIsListening(false);
    };
    
    recognitionInstance.onend = () => {
      setIsListening(false);
    };
    
    setRecognition(recognitionInstance);
    
    return () => {
      if (recognitionInstance) {
        recognitionInstance.abort();
      }
    };
  }, []);

  const startListening = useCallback(() => {
    if (!recognition) return;
    
    setTranscript('');
    setError(null);
    setIsListening(true);
    
    try {
      recognition.start();
    } catch (err) {
      console.error('Error starting speech recognition:', err);
      setError('Could not start speech recognition');
      setIsListening(false);
    }
  }, [recognition]);

  const stopListening = useCallback(() => {
    if (!recognition) return;
    
    try {
      recognition.stop();
      setIsListening(false);
    } catch (err) {
      console.error('Error stopping speech recognition:', err);
    }
  }, [recognition]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
  }, []);

  return {
    transcript,
    isListening,
    error,
    startListening,
    stopListening,
    resetTranscript,
    browserSupportsSpeechRecognition: !!SpeechRecognitionAPI
  };
};

export default useSpeechRecognition; 