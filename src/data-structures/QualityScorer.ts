/**
 * Quality Scoring Data Structure
 * Comprehensive scoring system for query quality assessment
 */

import { GibberishDetector, GibberishResult } from './GibberishDetector';
import { KeywordMatcher, KeywordMatchResult } from './KeywordMatcher';
import { PatternAnalyzer, PatternAnalysisResult } from './PatternAnalyzer';

export class QualityScorer {
  private static readonly SCORE_WEIGHTS = {
    gibberish: 0.3,      // Most important - filters out invalid queries
    keywords: 0.25,      // Relevance to UI/UX domain
    patterns: 0.25,      // Structural quality
    length: 0.1,         // Appropriate length
    complexity: 0.1      // Adequate complexity
  };

  /**
   * Main quality scoring method
   */
  static score(query: string): QualityScore {
    const startTime = performance.now();
    
    // Run all analyses in parallel for better performance
    const [gibberishResult, keywordResult, patternResult] = [
      GibberishDetector.detect(query),
      KeywordMatcher.match(query),
      PatternAnalyzer.analyze(query)
    ];

    // Calculate individual scores
    const scores = {
      gibberish: this.calculateGibberishScore(gibberishResult),
      keywords: this.calculateKeywordScore(keywordResult),
      patterns: this.calculatePatternScore(patternResult),
      length: this.calculateLengthScore(query),
      complexity: this.calculateComplexityScore(query)
    };

    // Calculate weighted overall score
    const overallScore = this.calculateOverallScore(scores);
    const grade = this.calculateGrade(overallScore);
    
    const processingTime = performance.now() - startTime;

    return {
      overall: {
        score: overallScore,
        grade,
        isPassing: overallScore >= 0.4 && !gibberishResult.isGibberish
      },
      breakdown: scores,
      details: {
        gibberish: gibberishResult,
        keywords: keywordResult,
        patterns: patternResult
      },
      recommendations: this.generateRecommendations(scores, gibberishResult, keywordResult, patternResult),
      processingTime,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Calculate gibberish score (inverted - lower gibberish = higher score)
   */
  private static calculateGibberishScore(gibberishResult: GibberishResult): number {
    if (gibberishResult.isGibberish) {
      return Math.max(0, 1 - gibberishResult.confidence);
    }
    return 1.0;
  }

  /**
   * Calculate keyword relevance score
   */
  private static calculateKeywordScore(keywordResult: KeywordMatchResult): number {
    let score = keywordResult.relevanceScore;
    
    // Bonus for having matches in multiple categories
    const categoryCount = Object.values(keywordResult.matches).filter(arr => arr.length > 0).length;
    const diversityBonus = Math.min(categoryCount * 0.1, 0.3);
    
    // Penalty for negative indicators
    const negativePenalty = keywordResult.hasNegativeIndicators ? 0.5 : 0;
    
    return Math.max(0, Math.min(1, score + diversityBonus - negativePenalty));
  }

  /**
   * Calculate pattern analysis score
   */
  private static calculatePatternScore(patternResult: PatternAnalysisResult): number {
    return patternResult.overallScore;
  }

  /**
   * Calculate length appropriateness score
   */
  private static calculateLengthScore(query: string): number {
    const length = query.trim().length;
    
    // Optimal length range: 20-200 characters
    if (length < 10) return 0.2;
    if (length < 20) return 0.5;
    if (length <= 200) return 1.0;
    if (length <= 500) return 0.8;
    return 0.4; // Too long
  }

  /**
   * Calculate complexity appropriateness score
   */
  private static calculateComplexityScore(query: string): number {
    const words = query.split(/\s+/);
    const sentences = query.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    // Word count complexity
    const wordComplexity = Math.min(words.length / 20, 1); // Normalize to 20 words
    
    // Sentence structure complexity
    const avgWordsPerSentence = words.length / sentences.length || 0;
    const sentenceComplexity = Math.min(avgWordsPerSentence / 15, 1); // Normalize to 15 words per sentence
    
    // Punctuation complexity
    const punctuationCount = (query.match(/[.!?,;:]/g) || []).length;
    const punctuationComplexity = Math.min(punctuationCount / 3, 1); // Normalize to 3 punctuation marks
    
    return (wordComplexity + sentenceComplexity + punctuationComplexity) / 3;
  }

  /**
   * Calculate weighted overall score
   */
  private static calculateOverallScore(scores: ScoreBreakdown): number {
    return Object.entries(this.SCORE_WEIGHTS).reduce((total, [key, weight]) => {
      return total + (scores[key as keyof ScoreBreakdown] * weight);
    }, 0);
  }

  /**
   * Calculate grade based on score
   */
  private static calculateGrade(score: number): QualityGrade {
    if (score >= 0.9) return 'A+';
    if (score >= 0.8) return 'A';
    if (score >= 0.7) return 'B+';
    if (score >= 0.6) return 'B';
    if (score >= 0.5) return 'C+';
    if (score >= 0.4) return 'C';
    if (score >= 0.3) return 'D+';
    if (score >= 0.2) return 'D';
    return 'F';
  }

  /**
   * Generate personalized recommendations
   */
  private static generateRecommendations(
    scores: ScoreBreakdown,
    gibberishResult: GibberishResult,
    keywordResult: KeywordMatchResult,
    patternResult: PatternAnalysisResult
  ): string[] {
    const recommendations: string[] = [];

    // Gibberish recommendations
    if (gibberishResult.isGibberish) {
      recommendations.push('Please provide a meaningful query with clear intent');
      if (gibberishResult.reason === 'repeated_characters') {
        recommendations.push('Avoid repeating the same characters multiple times');
      } else if (gibberishResult.reason === 'keyboard_mashing') {
        recommendations.push('Try typing a coherent sentence instead of random characters');
      }
    }

    // Keyword recommendations
    if (scores.keywords < 0.3) {
      recommendations.push('Include UI/UX related terms like "button", "layout", "design", or "interface"');
      if (keywordResult.matches.functionality.length === 0) {
        recommendations.push('Specify the type of application: "web app", "dashboard", "mobile app"');
      }
    }

    // Pattern recommendations
    if (scores.patterns < 0.4) {
      recommendations.push('Structure your query with clear intent: "Create a..." or "Design a..."');
      recommendations.push(...patternResult.recommendations.slice(0, 2));
    }

    // Length recommendations
    if (scores.length < 0.5) {
      if (scores.length < 0.3) {
        recommendations.push('Provide more details about what you want to create');
      } else {
        recommendations.push('Add specific requirements or features to your query');
      }
    }

    // Complexity recommendations
    if (scores.complexity < 0.3) {
      recommendations.push('Consider adding more details about the design requirements');
    }

    // Positive reinforcement
    if (scores.overall >= 0.8) {
      recommendations.push('Great query! You\'ve provided clear requirements and context');
    }

    return recommendations.slice(0, 5); // Limit to 5 recommendations
  }

  /**
   * Get score interpretation
   */
  static interpretScore(score: QualityScore): ScoreInterpretation {
    const { overall, breakdown } = score;
    
    return {
      summary: this.getScoreSummary(overall.score),
      strengths: this.getStrengths(breakdown),
      weaknesses: this.getWeaknesses(breakdown),
      nextSteps: this.getNextSteps(overall, breakdown),
      confidence: this.calculateConfidence(breakdown)
    };
  }

  private static getScoreSummary(score: number): string {
    if (score >= 0.9) return 'Excellent query with clear intent and comprehensive requirements';
    if (score >= 0.8) return 'Very good query with strong relevance and structure';
    if (score >= 0.7) return 'Good query with minor areas for improvement';
    if (score >= 0.6) return 'Decent query but could benefit from more specificity';
    if (score >= 0.4) return 'Query needs significant improvement in clarity and relevance';
    return 'Query appears to be invalid or nonsensical';
  }

  private static getStrengths(breakdown: ScoreBreakdown): string[] {
    const strengths: string[] = [];
    
    if (breakdown.gibberish >= 0.9) strengths.push('Clear, non-gibberish input');
    if (breakdown.keywords >= 0.7) strengths.push('Strong UI/UX domain relevance');
    if (breakdown.patterns >= 0.7) strengths.push('Well-structured query format');
    if (breakdown.length >= 0.8) strengths.push('Appropriate query length');
    if (breakdown.complexity >= 0.7) strengths.push('Good level of detail and complexity');
    
    return strengths;
  }

  private static getWeaknesses(breakdown: ScoreBreakdown): string[] {
    const weaknesses: string[] = [];
    
    if (breakdown.gibberish < 0.5) weaknesses.push('Input appears to be gibberish or nonsensical');
    if (breakdown.keywords < 0.4) weaknesses.push('Lacks UI/UX domain-specific terminology');
    if (breakdown.patterns < 0.4) weaknesses.push('Poor query structure and format');
    if (breakdown.length < 0.4) weaknesses.push('Inappropriate query length');
    if (breakdown.complexity < 0.4) weaknesses.push('Insufficient detail or complexity');
    
    return weaknesses;
  }

  private static getNextSteps(overall: OverallScore, breakdown: ScoreBreakdown): string[] {
    if (overall.isPassing) {
      return ['Query is ready for processing', 'Consider adding more specific design requirements'];
    }
    
    const nextSteps: string[] = [];
    
    if (breakdown.gibberish < 0.5) nextSteps.push('Rewrite with clear, meaningful language');
    if (breakdown.keywords < 0.4) nextSteps.push('Include UI/UX related terms and context');
    if (breakdown.patterns < 0.4) nextSteps.push('Restructure query with clear intent');
    
    return nextSteps;
  }

  private static calculateConfidence(breakdown: ScoreBreakdown): number {
    // Confidence based on consistency across all metrics
    const scores = Object.values(breakdown);
    const variance = this.calculateVariance(scores);
    const avgScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    
    return Math.max(0, Math.min(1, avgScore - variance));
  }

  private static calculateVariance(scores: number[]): number {
    const mean = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    const variance = scores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / scores.length;
    return Math.sqrt(variance);
  }
}

// Type definitions
export interface QualityScore {
  overall: OverallScore;
  breakdown: ScoreBreakdown;
  details: {
    gibberish: GibberishResult;
    keywords: KeywordMatchResult;
    patterns: PatternAnalysisResult;
  };
  recommendations: string[];
  processingTime: number;
  timestamp: string;
}

export interface OverallScore {
  score: number;
  grade: QualityGrade;
  isPassing: boolean;
}

export interface ScoreBreakdown {
  gibberish: number;
  keywords: number;
  patterns: number;
  length: number;
  complexity: number;
}

export type QualityGrade = 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D+' | 'D' | 'F';

export interface ScoreInterpretation {
  summary: string;
  strengths: string[];
  weaknesses: string[];
  nextSteps: string[];
  confidence: number;
}
