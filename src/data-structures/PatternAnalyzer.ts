/**
 * Pattern Analysis Data Structure
 * Advanced pattern recognition for query structure and quality analysis
 */

export class PatternAnalyzer {
  private static readonly STRUCTURE_PATTERNS = {
    imperative: /^(create|build|make|design|develop|generate)\s+/i,
    descriptive: /^(a|an|the)\s+\w+\s+(that|which|with)/i,
    question: /^(what|how|where|when|why|can|could|would|should|is|are|do|does|will)/i,
    requirement: /^(need|want|require|looking for|seeking)\s+/i
  };

  private static readonly QUALITY_INDICATORS = {
    specificity: {
      high: ['specific', 'detailed', 'exact', 'precise', 'particular', 'custom', 'unique'],
      medium: ['some', 'few', 'several', 'various', 'different', 'multiple'],
      low: ['any', 'all', 'every', 'generic', 'basic', 'simple']
    },
    completeness: {
      high: ['complete', 'full', 'comprehensive', 'detailed', 'thorough'],
      medium: ['partial', 'basic', 'simple', 'minimal'],
      low: ['incomplete', 'unfinished', 'draft', 'rough']
    }
  };

  /**
   * Main pattern analysis method
   */
  static analyze(query: string): PatternAnalysisResult {
    const normalizedQuery = query.trim();
    
    const analysis = {
      structure: this.analyzeStructure(normalizedQuery),
      quality: this.analyzeQuality(normalizedQuery),
      complexity: this.analyzeComplexity(normalizedQuery),
      coherence: this.analyzeCoherence(normalizedQuery),
      completeness: this.analyzeCompleteness(normalizedQuery)
    };

    const overallScore = this.calculateOverallScore(analysis);
    const recommendations = this.generateRecommendations(analysis);

    return {
      ...analysis,
      overallScore,
      recommendations,
      isValid: overallScore > 0.4 && analysis.coherence.score > 0.3
    };
  }

  /**
   * Analyze query structure and intent
   */
  private static analyzeStructure(query: string): StructureAnalysis {
    const patterns = Object.entries(this.STRUCTURE_PATTERNS);
    let matchedPattern: string | null = null;
    let confidence = 0;

    for (const [patternName, regex] of patterns) {
      if (regex.test(query)) {
        matchedPattern = patternName;
        confidence = 0.8;
        break;
      }
    }

    // Check for imperative structure even without explicit verbs
    if (!matchedPattern && this.hasImperativeStructure(query)) {
      matchedPattern = 'imperative';
      confidence = 0.6;
    }

    return {
      type: matchedPattern || 'unstructured',
      confidence,
      isWellFormed: matchedPattern !== null,
      characteristics: this.extractStructureCharacteristics(query)
    };
  }

  /**
   * Analyze query quality indicators
   */
  private static analyzeQuality(query: string): QualityAnalysis {
    const words = query.toLowerCase().split(/\s+/);
    let specificityScore = 0;
    let completenessScore = 0;

    // Analyze specificity
    const specificityMatches = this.countMatches(words, this.QUALITY_INDICATORS.specificity);
    if (specificityMatches.high > 0) specificityScore = 0.9;
    else if (specificityMatches.medium > 0) specificityScore = 0.6;
    else if (specificityMatches.low > 0) specificityScore = 0.3;

    // Analyze completeness
    const completenessMatches = this.countMatches(words, this.QUALITY_INDICATORS.completeness);
    if (completenessMatches.high > 0) completenessScore = 0.9;
    else if (completenessMatches.medium > 0) completenessScore = 0.6;
    else if (completenessMatches.low > 0) completenessScore = 0.3;

    return {
      specificity: {
        score: specificityScore,
        level: this.getScoreLevel(specificityScore),
        indicators: this.findQualityIndicators(query, this.QUALITY_INDICATORS.specificity)
      },
      completeness: {
        score: completenessScore,
        level: this.getScoreLevel(completenessScore),
        indicators: this.findQualityIndicators(query, this.QUALITY_INDICATORS.completeness)
      },
      overall: (specificityScore + completenessScore) / 2
    };
  }

  /**
   * Analyze query complexity
   */
  private static analyzeComplexity(query: string): ComplexityAnalysis {
    const words = query.split(/\s+/);
    const sentences = query.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const avgWordsPerSentence = words.length / sentences.length || 0;
    
    // Count complex structures
    const complexStructures = {
      conjunctions: (query.match(/\b(and|or|but|however|although|because|since|while|whereas)\b/gi) || []).length,
      relativeClauses: (query.match(/\b(that|which|who|whom|whose|where|when)\b/gi) || []).length,
      conditionals: (query.match(/\b(if|unless|provided|assuming|supposing)\b/gi) || []).length,
      prepositions: (query.match(/\b(in|on|at|by|for|with|from|to|of|about|under|over|through|during)\b/gi) || []).length
    };

    const complexityScore = Math.min(
      (complexStructures.conjunctions * 0.1) +
      (complexStructures.relativeClauses * 0.2) +
      (complexStructures.conditionals * 0.3) +
      (avgWordsPerSentence > 10 ? 0.2 : 0),
      1
    );

    return {
      score: complexityScore,
      level: this.getScoreLevel(complexityScore),
      characteristics: {
        avgWordsPerSentence,
        totalWords: words.length,
        sentenceCount: sentences.length,
        complexStructures
      }
    };
  }

  /**
   * Analyze query coherence and logical flow
   */
  private static analyzeCoherence(query: string): CoherenceAnalysis {
    const words = query.toLowerCase().split(/\s+/);
    
    // Check for logical connectors
    const connectors = ['because', 'therefore', 'however', 'moreover', 'furthermore', 'additionally', 'also'];
    const connectorCount = connectors.reduce((count, connector) => {
      return count + (words.includes(connector) ? 1 : 0);
    }, 0);

    // Check for topic consistency (simple keyword overlap)
    const topicConsistency = this.analyzeTopicConsistency(words);
    
    // Check for grammatical structure
    const grammaticalScore = this.analyzeGrammaticalStructure(query);

    const coherenceScore = (connectorCount * 0.3 + topicConsistency * 0.4 + grammaticalScore * 0.3);

    return {
      score: Math.min(coherenceScore, 1),
      level: this.getScoreLevel(coherenceScore),
      characteristics: {
        connectorCount,
        topicConsistency,
        grammaticalScore,
        hasLogicalFlow: connectorCount > 0 || topicConsistency > 0.5
      }
    };
  }

  /**
   * Analyze query completeness
   */
  private static analyzeCompleteness(query: string): CompletenessAnalysis {
    const requiredElements = {
      hasSubject: this.hasSubject(query),
      hasAction: this.hasAction(query),
      hasContext: this.hasContext(query),
      hasSpecificity: this.hasSpecificity(query)
    };

    const completenessScore = Object.values(requiredElements).reduce((sum, has) => sum + (has ? 0.25 : 0), 0);

    return {
      score: completenessScore,
      level: this.getScoreLevel(completenessScore),
      elements: requiredElements,
      missingElements: Object.entries(requiredElements)
        .filter(([_, has]) => !has)
        .map(([element, _]) => element)
    };
  }

  // Helper methods
  private static hasImperativeStructure(query: string): boolean {
    const actionWords = ['create', 'build', 'make', 'design', 'develop', 'generate', 'show', 'display'];
    const firstWords = query.toLowerCase().split(/\s+/).slice(0, 3);
    return actionWords.some(action => firstWords.includes(action));
  }

  private static extractStructureCharacteristics(query: string): string[] {
    const characteristics: string[] = [];
    
    if (query.endsWith('?')) characteristics.push('question');
    if (query.endsWith('!')) characteristics.push('exclamation');
    if (query.includes(',')) characteristics.push('comma_separated');
    if (/\d+/.test(query)) characteristics.push('contains_numbers');
    if (/[A-Z]/.test(query)) characteristics.push('contains_capitals');
    
    return characteristics;
  }

  private static countMatches(words: string[], categories: { [key: string]: string[] }): { [key: string]: number } {
    const matches: { [key: string]: number } = {};
    
    for (const [category, keywords] of Object.entries(categories)) {
      matches[category] = keywords.reduce((count, keyword) => {
        return count + (words.includes(keyword) ? 1 : 0);
      }, 0);
    }
    
    return matches;
  }

  private static getScoreLevel(score: number): 'low' | 'medium' | 'high' {
    if (score >= 0.7) return 'high';
    if (score >= 0.4) return 'medium';
    return 'low';
  }

  private static findQualityIndicators(query: string, indicators: { [key: string]: string[] }): string[] {
    const found: string[] = [];
    const words = query.toLowerCase().split(/\s+/);
    
    for (const category of Object.values(indicators)) {
      for (const indicator of category) {
        if (words.includes(indicator)) {
          found.push(indicator);
        }
      }
    }
    
    return found;
  }

  private static analyzeTopicConsistency(words: string[]): number {
    // Simple topic consistency based on repeated meaningful words
    const meaningfulWords = words.filter(word => word.length > 3);
    const wordFrequency: { [key: string]: number } = {};
    
    meaningfulWords.forEach(word => {
      wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    });
    
    const repeatedWords = Object.values(wordFrequency).filter(count => count > 1).length;
    return Math.min(repeatedWords / meaningfulWords.length, 1);
  }

  private static analyzeGrammaticalStructure(query: string): number {
    // Basic grammatical structure analysis
    const hasCapitalStart = /^[A-Z]/.test(query);
    const hasProperEnding = /[.!?]$/.test(query);
    const hasVerb = /\b(is|are|was|were|have|has|had|do|does|did|will|would|can|could|should|must)\b/i.test(query);
    
    return [hasCapitalStart, hasProperEnding, hasVerb].filter(Boolean).length / 3;
  }

  private static hasSubject(query: string): boolean {
    const subjectIndicators = ['app', 'website', 'page', 'interface', 'dashboard', 'system', 'platform'];
    return subjectIndicators.some(indicator => query.toLowerCase().includes(indicator));
  }

  private static hasAction(query: string): boolean {
    const actionWords = ['create', 'build', 'make', 'design', 'develop', 'show', 'display', 'generate'];
    return actionWords.some(action => query.toLowerCase().includes(action));
  }

  private static hasContext(query: string): boolean {
    const contextWords = ['for', 'with', 'using', 'that', 'which', 'where', 'when'];
    return contextWords.some(context => query.toLowerCase().includes(context));
  }

  private static hasSpecificity(query: string): boolean {
    const specificWords = ['modern', 'responsive', 'mobile', 'desktop', 'specific', 'detailed'];
    return specificWords.some(specific => query.toLowerCase().includes(specific));
  }

  private static calculateOverallScore(analysis: any): number {
    return (
      analysis.structure.confidence * 0.2 +
      analysis.quality.overall * 0.3 +
      analysis.complexity.score * 0.2 +
      analysis.coherence.score * 0.2 +
      analysis.completeness.score * 0.1
    );
  }

  private static generateRecommendations(analysis: any): string[] {
    const recommendations: string[] = [];
    
    if (analysis.structure.confidence < 0.5) {
      recommendations.push('Start with an action verb like "create", "build", or "design"');
    }
    
    if (analysis.completeness.score < 0.5) {
      recommendations.push('Be more specific about what you want to create');
      if (!analysis.completeness.elements.hasContext) {
        recommendations.push('Add context about the purpose or target audience');
      }
    }
    
    if (analysis.quality.specificity.score < 0.5) {
      recommendations.push('Include specific design requirements or features');
    }
    
    if (analysis.coherence.score < 0.4) {
      recommendations.push('Structure your query more clearly with logical flow');
    }
    
    return recommendations;
  }
}

// Type definitions
export interface PatternAnalysisResult {
  structure: StructureAnalysis;
  quality: QualityAnalysis;
  complexity: ComplexityAnalysis;
  coherence: CoherenceAnalysis;
  completeness: CompletenessAnalysis;
  overallScore: number;
  recommendations: string[];
  isValid: boolean;
}

export interface StructureAnalysis {
  type: string;
  confidence: number;
  isWellFormed: boolean;
  characteristics: string[];
}

export interface QualityAnalysis {
  specificity: QualityIndicator;
  completeness: QualityIndicator;
  overall: number;
}

export interface QualityIndicator {
  score: number;
  level: 'low' | 'medium' | 'high';
  indicators: string[];
}

export interface ComplexityAnalysis {
  score: number;
  level: 'low' | 'medium' | 'high';
  characteristics: {
    avgWordsPerSentence: number;
    totalWords: number;
    sentenceCount: number;
    complexStructures: {
      conjunctions: number;
      relativeClauses: number;
      conditionals: number;
      prepositions: number;
    };
  };
}

export interface CoherenceAnalysis {
  score: number;
  level: 'low' | 'medium' | 'high';
  characteristics: {
    connectorCount: number;
    topicConsistency: number;
    grammaticalScore: number;
    hasLogicalFlow: boolean;
  };
}

export interface CompletenessAnalysis {
  score: number;
  level: 'low' | 'medium' | 'high';
  elements: {
    hasSubject: boolean;
    hasAction: boolean;
    hasContext: boolean;
    hasSpecificity: boolean;
  };
  missingElements: string[];
}
