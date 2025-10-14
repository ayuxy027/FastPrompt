/**
 * Data Structures Index
 * Centralized exports for all validation data structures
 */

// Import all classes and types
import { GibberishDetector } from './GibberishDetector';
import type { GibberishResult, GibberishCheck } from './GibberishDetector';

import { KeywordMatcher } from './KeywordMatcher';
import type { KeywordMatchResult, KeywordMatches, CategoryBreakdown, CategoryInfo } from './KeywordMatcher';

import { PatternAnalyzer } from './PatternAnalyzer';
import type { PatternAnalysisResult, StructureAnalysis, QualityAnalysis, ComplexityAnalysis, CoherenceAnalysis, CompletenessAnalysis, QualityIndicator } from './PatternAnalyzer';

import { QualityScorer } from './QualityScorer';
import type { QualityScore, OverallScore, ScoreBreakdown, QualityGrade, ScoreInterpretation } from './QualityScorer';

// Export all classes and types
export { GibberishDetector, KeywordMatcher, PatternAnalyzer, QualityScorer };
export type { 
  GibberishResult, 
  GibberishCheck,
  KeywordMatchResult, 
  KeywordMatches, 
  CategoryBreakdown, 
  CategoryInfo,
  PatternAnalysisResult, 
  StructureAnalysis, 
  QualityAnalysis, 
  ComplexityAnalysis, 
  CoherenceAnalysis, 
  CompletenessAnalysis, 
  QualityIndicator,
  QualityScore, 
  OverallScore, 
  ScoreBreakdown, 
  QualityGrade, 
  ScoreInterpretation 
};

/**
 * Unified Query Validator
 * Combines all data structures for comprehensive query validation
 */
export class QueryValidator {
  /**
   * Comprehensive query validation using all data structures
   */
  static async validate(query: string): Promise<ValidationResult> {
    const startTime = performance.now();
    
    try {
      // Run quality scoring (which internally uses all other validators)
      const qualityScore = QualityScorer.score(query);
      
      // Determine if query should be processed
      const shouldProcess = qualityScore.overall.isPassing && qualityScore.overall.score >= 0.4;
      
      // Generate fallback response if needed
      const fallbackResponse = shouldProcess ? null : {
        fallbackResponse: "I am unable to process this matter since it appears either senseless or is unprocessable completely, please try again with more valid query"
      };

      const processingTime = performance.now() - startTime;

      return {
        isValid: shouldProcess,
        qualityScore: qualityScore.overall.score,
        grade: qualityScore.overall.grade,
        shouldProcess,
        fallbackResponse,
        analysis: qualityScore,
        processingTime,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Query validation error:', error);
      return {
        isValid: false,
        qualityScore: 0,
        grade: 'F' as QualityGrade,
        shouldProcess: false,
        fallbackResponse: {
          fallbackResponse: "I am unable to process this matter since it appears either senseless or is unprocessable completely, please try again with more valid query"
        },
        error: error instanceof Error ? error.message : 'Unknown validation error',
        processingTime: performance.now() - startTime,
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Quick validation for real-time feedback
   */
  static quickValidate(query: string): QuickValidationResult {
    if (!query || query.trim().length < 3) {
      return {
        isValid: false,
        reason: 'too_short',
        suggestion: 'Please provide a longer, more detailed query'
      };
    }

    // Basic gibberish check
    const gibberishResult = GibberishDetector.detect(query);
    if (gibberishResult.isGibberish) {
      return {
        isValid: false,
        reason: 'gibberish',
        suggestion: 'Please provide a meaningful query with clear intent'
      };
    }

    // Basic keyword relevance
    const keywordResult = KeywordMatcher.match(query);
    if (keywordResult.relevanceScore < 0.1) {
      return {
        isValid: false,
        reason: 'not_relevant',
        suggestion: 'Include UI/UX related terms like "design", "app", "interface", or "layout"'
      };
    }

    return {
      isValid: true,
      reason: 'valid',
      suggestion: 'Query looks good! You can proceed with processing.'
    };
  }

  /**
   * Get detailed analysis for debugging or advanced features
   */
  static getDetailedAnalysis(query: string): DetailedAnalysisResult {
    const qualityScore = QualityScorer.score(query);
    const interpretation = QualityScorer.interpretScore(qualityScore);
    
    return {
      query,
      qualityScore,
      interpretation,
      breakdown: {
        gibberish: qualityScore.details.gibberish,
        keywords: qualityScore.details.keywords,
        patterns: qualityScore.details.patterns
      },
      recommendations: qualityScore.recommendations,
      processingTime: qualityScore.processingTime
    };
  }
}

// Type definitions for the validator
export interface ValidationResult {
  isValid: boolean;
  qualityScore: number;
  grade: QualityGrade;
  shouldProcess: boolean;
  fallbackResponse?: { fallbackResponse: string } | null;
  analysis?: QualityScore;
  error?: string;
  processingTime: number;
  timestamp: string;
}

export interface QuickValidationResult {
  isValid: boolean;
  reason: 'too_short' | 'gibberish' | 'not_relevant' | 'valid';
  suggestion: string;
}

export interface DetailedAnalysisResult {
  query: string;
  qualityScore: QualityScore;
  interpretation: ScoreInterpretation;
  breakdown: {
    gibberish: GibberishResult;
    keywords: KeywordMatchResult;
    patterns: PatternAnalysisResult;
  };
  recommendations: string[];
  processingTime: number;
}