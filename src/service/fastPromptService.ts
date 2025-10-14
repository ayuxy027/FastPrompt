import Groq from "groq-sdk";
import { systemPrompt } from '../../systemPrompt';
import { QueryValidator, ValidationResult } from '../data-structures';

// Initialize GROQ client
const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY || '',
  dangerouslyAllowBrowser: true,
});

// Message type for GROQ API
interface GroqMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

// Configuration for JSON generation
const GENERATION_CONFIG = {
  temperature: 0.7,
  max_tokens: 4000,
  top_p: 0.9,
};

const GROQ_MODEL = "llama-3.1-8b-instant";

/**
 * FastPrompt JSON Processing Service using GROQ API
 */
export class FastPromptService {
  /**
   * Validate if query is meaningful and processable using advanced data structures
   */
  private static async isValidQuery(query: string): Promise<ValidationResult> {
    return await QueryValidator.validate(query);
  }

  /**
   * Quick validation for immediate feedback
   */
  private static quickValidateQuery(query: string): boolean {
    const quickResult = QueryValidator.quickValidate(query);
    return quickResult.isValid;
  }

  /**
   * Generate fallback response for invalid queries
   */
  private static generateFallbackResponse(validationResult?: ValidationResult): string {
    const baseMessage = "I am unable to process this matter since it appears either senseless or is unprocessable completely, please try again with more valid query";
    
    // Add specific recommendations if available
    if (validationResult?.analysis?.recommendations?.length > 0) {
      const topRecommendation = validationResult.analysis.recommendations[0];
      return JSON.stringify({
        fallbackResponse: `${baseMessage} ${topRecommendation}`
      });
    }
    
    return JSON.stringify({
      fallbackResponse: baseMessage
    });
  }
  /**
   * Prepare messages for GROQ API
   */
  private static prepareMessages(userPrompt: string): GroqMessage[] {
    return [
      { 
        role: "system", 
        content: systemPrompt.content
      },
      { 
        role: "user", 
        content: userPrompt
      }
    ];
  }

  /**
   * Generate JSON specification using GROQ API
   */
  static async generateJsonSpecification(userPrompt: string): Promise<string> {
    // Validate query using advanced data structures
    const validationResult = await this.isValidQuery(userPrompt);
    
    if (!validationResult.shouldProcess) {
      return this.generateFallbackResponse(validationResult);
    }

    if (!import.meta.env.VITE_GROQ_API_KEY) {
      throw new Error("Missing GROQ API key. Please add VITE_GROQ_API_KEY to your environment variables.");
    }

    const messages = this.prepareMessages(userPrompt);
    
    try {
      const completion = await groq.chat.completions.create({
        messages,
        model: GROQ_MODEL,
        temperature: GENERATION_CONFIG.temperature,
        max_tokens: GENERATION_CONFIG.max_tokens,
        top_p: GENERATION_CONFIG.top_p,
        stream: false
      });
      
      if (!completion.choices?.[0]?.message?.content) {
        throw new Error('No content received from GROQ API');
      }
      
      const response = completion.choices[0].message.content;
      
      // Try to extract JSON from the response
      return this.extractJsonFromResponse(response);
      
    } catch (error) {
      console.error('Error generating JSON specification:', error);
      throw new Error(`Failed to generate JSON specification: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  /**
   * Stream JSON specification generation with realtime updates
   */
  static async streamJsonSpecification(
    userPrompt: string, 
    onChunk: (chunk: string, done: boolean) => void
  ): Promise<string> {
    // Validate query using advanced data structures
    const validationResult = await this.isValidQuery(userPrompt);
    
    if (!validationResult.shouldProcess) {
      const fallbackResponse = this.generateFallbackResponse(validationResult);
      onChunk("", true); // Signal completion
      return fallbackResponse;
    }

    if (!import.meta.env.VITE_GROQ_API_KEY) {
      throw new Error("Missing GROQ API key. Please add VITE_GROQ_API_KEY to your environment variables.");
    }

    const messages = this.prepareMessages(userPrompt);
    let accumulatedResponse = "";
    
    try {
      const stream = await groq.chat.completions.create({
        messages,
        model: GROQ_MODEL,
        temperature: GENERATION_CONFIG.temperature,
        max_tokens: GENERATION_CONFIG.max_tokens,
        top_p: GENERATION_CONFIG.top_p,
        stream: true
      });

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || "";
        accumulatedResponse += content;
        onChunk(content, false);
      }
      
      onChunk("", true);
      
      // Extract and return the final JSON
      return this.extractJsonFromResponse(accumulatedResponse);
      
    } catch (error) {
      console.error('Error streaming JSON specification:', error);
      throw new Error(`Failed to stream JSON specification: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Extract JSON from GROQ response
   */
  private static extractJsonFromResponse(response: string): string {
    try {
      // Try to parse the entire response as JSON first
      JSON.parse(response);
      return response;
    } catch {
      // If that fails, try to extract JSON from the response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          // Validate the extracted JSON
          JSON.parse(jsonMatch[0]);
          return jsonMatch[0];
        } catch (parseError) {
          console.warn('Extracted JSON is invalid:', parseError);
        }
      }
      
      // If no valid JSON found, return the original response
      console.warn('No valid JSON found in response, returning original');
      return response;
    }
  }

  /**
   * Validate JSON specification
   */
  static validateJsonSpecification(jsonString: string): { isValid: boolean; error?: string; isFallback?: boolean } {
    try {
      const parsed = JSON.parse(jsonString);
      
      // Check if this is a fallback response
      if (parsed.fallbackResponse) {
        return {
          isValid: true,
          isFallback: true
        };
      }
      
      // Check for required top-level keys
      const requiredKeys = ['audit', 'layout', 'uiDetails', 'interactions', 'functionality', 'toneAudience', 'finalPrompt'];
      const missingKeys = requiredKeys.filter(key => !(key in parsed));
      
      if (missingKeys.length > 0) {
        return {
          isValid: false,
          error: `Missing required keys: ${missingKeys.join(', ')}`
        };
      }
      
      return { isValid: true };
    } catch (error) {
      return {
        isValid: false,
        error: `Invalid JSON: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  /**
   * Get query analysis and quality insights
   */
  static async getQueryAnalysis(userPrompt: string): Promise<ValidationResult> {
    return await this.isValidQuery(userPrompt);
  }

  /**
   * Get detailed query breakdown for debugging or advanced features
   */
  static async getDetailedQueryAnalysis(userPrompt: string) {
    const { QueryValidator } = await import('../data-structures');
    return QueryValidator.getDetailedAnalysis(userPrompt);
  }

  /**
   * Quick validation for real-time feedback (synchronous)
   */
  static quickValidateQuerySync(query: string): boolean {
    return this.quickValidateQuery(query);
  }

  /**
   * Get query improvement suggestions
   */
  static async getQuerySuggestions(userPrompt: string): Promise<string[]> {
    const validationResult = await this.isValidQuery(userPrompt);
    return validationResult.analysis?.recommendations || [];
  }
}
