/**
 * Gibberish Detection Data Structure
 * Advanced pattern matching for detecting nonsensical input
 */

export class GibberishDetector {
  private static readonly REPEATED_CHAR_THRESHOLD = 5;
  private static readonly PATTERN_REPETITION_THRESHOLD = 3;
  private static readonly SYMBOL_RATIO_THRESHOLD = 0.7;

  /**
   * Main gibberish detection method
   */
  static detect(query: string): GibberishResult {
    if (!query || query.trim().length === 0) {
      return { isGibberish: true, confidence: 1.0, reason: 'empty_input' };
    }

    const normalizedQuery = query.trim().toLowerCase();
    const checks = [
      this.checkRepeatedCharacters(normalizedQuery),
      this.checkSymbolRatio(normalizedQuery),
      this.checkPatternRepetition(normalizedQuery),
      this.checkRandomness(normalizedQuery),
      this.checkKeyboardMashing(normalizedQuery),
      this.checkNumberSequence(normalizedQuery),
      this.checkSingleCharacterSequence(normalizedQuery)
    ];

    const gibberishChecks = checks.filter(check => check.isGibberish);
    const confidence = gibberishChecks.length > 0 
      ? gibberishChecks.reduce((sum, check) => sum + check.confidence, 0) / gibberishChecks.length
      : 0;

    return {
      isGibberish: gibberishChecks.length > 0,
      confidence,
      reason: gibberishChecks.length > 0 ? gibberishChecks[0].reason : 'valid',
      details: gibberishChecks
    };
  }

  /**
   * Check for excessive repeated characters
   */
  private static checkRepeatedCharacters(query: string): GibberishCheck {
    const repeatedPattern = /(.)\1{4,}/g;
    const matches = query.match(repeatedPattern);
    
    if (matches) {
      return {
        isGibberish: true,
        confidence: 0.9,
        reason: 'repeated_characters',
        description: `Found repeated character patterns: ${matches.join(', ')}`
      };
    }

    return { isGibberish: false, confidence: 0, reason: 'valid' };
  }

  /**
   * Check ratio of symbols to alphanumeric characters
   */
  private static checkSymbolRatio(query: string): GibberishCheck {
    const symbolCount = (query.match(/[^a-zA-Z0-9\s]/g) || []).length;
    const totalChars = query.length;
    const symbolRatio = symbolCount / totalChars;

    if (symbolRatio > this.SYMBOL_RATIO_THRESHOLD) {
      return {
        isGibberish: true,
        confidence: 0.8,
        reason: 'excessive_symbols',
        description: `${Math.round(symbolRatio * 100)}% of characters are symbols`
      };
    }

    return { isGibberish: false, confidence: 0, reason: 'valid' };
  }

  /**
   * Check for pattern repetition (e.g., "abcabcabc")
   */
  private static checkPatternRepetition(query: string): GibberishCheck {
    // Look for repeated substrings of length 2-4
    for (let patternLength = 2; patternLength <= 4; patternLength++) {
      for (let i = 0; i <= query.length - patternLength * this.PATTERN_REPETITION_THRESHOLD; i++) {
        const pattern = query.substr(i, patternLength);
        const repetitions = (query.match(new RegExp(pattern, 'g')) || []).length;
        
        if (repetitions >= this.PATTERN_REPETITION_THRESHOLD) {
          return {
            isGibberish: true,
            confidence: 0.7,
            reason: 'pattern_repetition',
            description: `Pattern "${pattern}" repeated ${repetitions} times`
          };
        }
      }
    }

    return { isGibberish: false, confidence: 0, reason: 'valid' };
  }

  /**
   * Check for high randomness (entropy-based detection)
   */
  private static checkRandomness(query: string): GibberishCheck {
    const charFrequency: { [key: string]: number } = {};
    
    // Count character frequencies
    for (const char of query) {
      if (char !== ' ') {
        charFrequency[char] = (charFrequency[char] || 0) + 1;
      }
    }

    // Calculate entropy
    const totalChars = Object.values(charFrequency).reduce((sum, count) => sum + count, 0);
    let entropy = 0;
    
    for (const count of Object.values(charFrequency)) {
      const probability = count / totalChars;
      entropy -= probability * Math.log2(probability);
    }

    // High entropy (>4.5) suggests random/gibberish text
    if (entropy > 4.5 && totalChars > 10) {
      return {
        isGibberish: true,
        confidence: 0.6,
        reason: 'high_randomness',
        description: `High entropy detected: ${entropy.toFixed(2)}`
      };
    }

    return { isGibberish: false, confidence: 0, reason: 'valid' };
  }

  /**
   * Check for keyboard mashing patterns
   */
  private static checkKeyboardMashing(query: string): GibberishCheck {
    const keyboardPatterns = [
      /[qwertyuiop]{5,}/,
      /[asdfghjkl]{5,}/,
      /[zxcvbnm]{5,}/,
      /[qwerty]{5,}/,
      /[asdf]{5,}/,
      /[zxcv]{5,}/
    ];

    for (const pattern of keyboardPatterns) {
      if (pattern.test(query)) {
        return {
          isGibberish: true,
          confidence: 0.9,
          reason: 'keyboard_mashing',
          description: 'Detected keyboard mashing pattern'
        };
      }
    }

    return { isGibberish: false, confidence: 0, reason: 'valid' };
  }

  /**
   * Check for pure number sequences
   */
  private static checkNumberSequence(query: string): GibberishCheck {
    const numberOnlyPattern = /^[\d\s]+$/;
    
    if (numberOnlyPattern.test(query) && query.replace(/\s/g, '').length > 5) {
      return {
        isGibberish: true,
        confidence: 0.8,
        reason: 'number_sequence',
        description: 'Query contains only numbers and spaces'
      };
    }

    return { isGibberish: false, confidence: 0, reason: 'valid' };
  }

  /**
   * Check for single character sequences
   */
  private static checkSingleCharacterSequence(query: string): GibberishCheck {
    const singleCharPattern = /^[a-z]\s[a-z]\s[a-z]/;
    
    if (singleCharPattern.test(query)) {
      return {
        isGibberish: true,
        confidence: 0.7,
        reason: 'single_character_sequence',
        description: 'Query contains only single characters separated by spaces'
      };
    }

    return { isGibberish: false, confidence: 0, reason: 'valid' };
  }
}

export interface GibberishResult {
  isGibberish: boolean;
  confidence: number;
  reason: string;
  details?: GibberishCheck[];
}

export interface GibberishCheck {
  isGibberish: boolean;
  confidence: number;
  reason: string;
  description?: string;
}
