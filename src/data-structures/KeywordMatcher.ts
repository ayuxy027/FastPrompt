/**
 * Keyword Matching Data Structure
 * Efficient keyword detection and categorization for UI/UX queries
 */

export class KeywordMatcher {
  private static readonly KEYWORD_CATEGORIES = {
    uiComponents: [
      'button', 'input', 'form', 'modal', 'dialog', 'dropdown', 'select', 'checkbox', 
      'radio', 'switch', 'toggle', 'slider', 'progress', 'spinner', 'loader', 'card',
      'accordion', 'tab', 'menu', 'navigation', 'navbar', 'sidebar', 'header', 'footer',
      'table', 'list', 'grid', 'carousel', 'pagination', 'breadcrumb', 'tooltip', 'popover'
    ],
    
    designElements: [
      'layout', 'design', 'ui', 'ux', 'interface', 'theme', 'color', 'typography', 
      'font', 'spacing', 'margin', 'padding', 'border', 'shadow', 'gradient', 'animation',
      'transition', 'responsive', 'mobile', 'desktop', 'tablet', 'breakpoint'
    ],
    
    functionality: [
      'app', 'application', 'website', 'webapp', 'dashboard', 'admin', 'login', 'signup',
      'register', 'authentication', 'profile', 'settings', 'search', 'filter', 'sort',
      'upload', 'download', 'export', 'import', 'api', 'database', 'backend', 'frontend'
    ],
    
    businessContext: [
      'ecommerce', 'shop', 'store', 'product', 'cart', 'checkout', 'payment', 'order',
      'inventory', 'customer', 'user', 'account', 'subscription', 'billing', 'analytics',
      'report', 'statistics', 'metrics', 'dashboard', 'crm', 'cms', 'blog', 'news'
    ],
    
    visualStyle: [
      'modern', 'minimal', 'clean', 'professional', 'corporate', 'creative', 'artistic',
      'bold', 'elegant', 'sophisticated', 'playful', 'friendly', 'warm', 'cool', 'dark',
      'light', 'colorful', 'monochrome', 'vintage', 'retro', 'futuristic', 'tech'
    ]
  };

  private static readonly NEGATIVE_KEYWORDS = [
    'test', 'testing', 'debug', 'error', 'broken', 'fix', 'bug', 'hack', 'random',
    'gibberish', 'nonsense', 'meaningless', 'invalid', 'wrong', 'stupid', 'dumb'
  ];

  /**
   * Main keyword matching method
   */
  static match(query: string): KeywordMatchResult {
    const normalizedQuery = query.toLowerCase();
    const words = this.extractWords(normalizedQuery);
    
    const matches = {
      uiComponents: this.findMatches(words, this.KEYWORD_CATEGORIES.uiComponents),
      designElements: this.findMatches(words, this.KEYWORD_CATEGORIES.designElements),
      functionality: this.findMatches(words, this.KEYWORD_CATEGORIES.functionality),
      businessContext: this.findMatches(words, this.KEYWORD_CATEGORIES.businessContext),
      visualStyle: this.findMatches(words, this.KEYWORD_CATEGORIES.visualStyle)
    };

    const negativeMatches = this.findMatches(words, this.NEGATIVE_KEYWORDS);
    const totalMatches = Object.values(matches).reduce((sum, categoryMatches) => sum + categoryMatches.length, 0);
    
    const relevanceScore = this.calculateRelevanceScore(matches, words.length);
    const hasNegativeIndicators = negativeMatches.length > 0;

    return {
      matches,
      negativeMatches,
      relevanceScore,
      hasNegativeIndicators,
      totalMatches,
      isRelevant: relevanceScore > 0.3 && !hasNegativeIndicators,
      categoryBreakdown: this.getCategoryBreakdown(matches)
    };
  }

  /**
   * Extract meaningful words from query
   */
  private static extractWords(query: string): string[] {
    return query
      .replace(/[^\w\s]/g, ' ') // Remove special characters
      .split(/\s+/)
      .filter(word => word.length > 2) // Filter out short words
      .map(word => word.toLowerCase());
  }

  /**
   * Find keyword matches in a category
   */
  private static findMatches(words: string[], keywords: string[]): string[] {
    const matches: string[] = [];
    
    for (const word of words) {
      for (const keyword of keywords) {
        // Exact match
        if (word === keyword) {
          matches.push(keyword);
        }
        // Partial match (keyword contains the word)
        else if (keyword.includes(word) && word.length > 3) {
          matches.push(keyword);
        }
        // Partial match (word contains the keyword)
        else if (word.includes(keyword) && keyword.length > 3) {
          matches.push(keyword);
        }
      }
    }

    return [...new Set(matches)]; // Remove duplicates
  }

  /**
   * Calculate relevance score based on keyword matches
   */
  private static calculateRelevanceScore(matches: KeywordMatches, totalWords: number): number {
    if (totalWords === 0) return 0;

    const categoryWeights = {
      uiComponents: 0.4,
      designElements: 0.3,
      functionality: 0.2,
      businessContext: 0.05,
      visualStyle: 0.05
    };

    let weightedScore = 0;
    
    for (const [category, categoryMatches] of Object.entries(matches)) {
      const weight = categoryWeights[category as keyof typeof categoryWeights] || 0;
      const categoryScore = Math.min(categoryMatches.length / totalWords, 1);
      weightedScore += categoryScore * weight;
    }

    return Math.min(weightedScore, 1);
  }

  /**
   * Get category breakdown for detailed analysis
   */
  private static getCategoryBreakdown(matches: KeywordMatches): CategoryBreakdown {
    return {
      uiComponents: {
        count: matches.uiComponents.length,
        percentage: (matches.uiComponents.length / Object.values(matches).reduce((sum, arr) => sum + arr.length, 0)) * 100 || 0,
        keywords: matches.uiComponents
      },
      designElements: {
        count: matches.designElements.length,
        percentage: (matches.designElements.length / Object.values(matches).reduce((sum, arr) => sum + arr.length, 0)) * 100 || 0,
        keywords: matches.designElements
      },
      functionality: {
        count: matches.functionality.length,
        percentage: (matches.functionality.length / Object.values(matches).reduce((sum, arr) => sum + arr.length, 0)) * 100 || 0,
        keywords: matches.functionality
      },
      businessContext: {
        count: matches.businessContext.length,
        percentage: (matches.businessContext.length / Object.values(matches).reduce((sum, arr) => sum + arr.length, 0)) * 100 || 0,
        keywords: matches.businessContext
      },
      visualStyle: {
        count: matches.visualStyle.length,
        percentage: (matches.visualStyle.length / Object.values(matches).reduce((sum, arr) => sum + arr.length, 0)) * 100 || 0,
        keywords: matches.visualStyle
      }
    };
  }

  /**
   * Get suggestions for improving query relevance
   */
  static getSuggestions(query: string, matchResult: KeywordMatchResult): string[] {
    const suggestions: string[] = [];
    
    if (matchResult.relevanceScore < 0.2) {
      suggestions.push("Consider adding UI component keywords like 'button', 'form', or 'layout'");
    }
    
    if (matchResult.matches.designElements.length === 0) {
      suggestions.push("Include design-related terms like 'modern', 'responsive', or 'color scheme'");
    }
    
    if (matchResult.matches.functionality.length === 0) {
      suggestions.push("Specify the type of application: 'web app', 'dashboard', 'ecommerce site'");
    }
    
    if (matchResult.hasNegativeIndicators) {
      suggestions.push("Avoid testing or debug-related terms in your query");
    }
    
    return suggestions;
  }
}

export interface KeywordMatchResult {
  matches: KeywordMatches;
  negativeMatches: string[];
  relevanceScore: number;
  hasNegativeIndicators: boolean;
  totalMatches: number;
  isRelevant: boolean;
  categoryBreakdown: CategoryBreakdown;
}

export interface KeywordMatches {
  uiComponents: string[];
  designElements: string[];
  functionality: string[];
  businessContext: string[];
  visualStyle: string[];
}

export interface CategoryBreakdown {
  uiComponents: CategoryInfo;
  designElements: CategoryInfo;
  functionality: CategoryInfo;
  businessContext: CategoryInfo;
  visualStyle: CategoryInfo;
}

export interface CategoryInfo {
  count: number;
  percentage: number;
  keywords: string[];
}
