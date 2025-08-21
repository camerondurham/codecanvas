import {
  getLanguageMode,
  isLanguageSupported,
  getSupportedLanguages,
  isValidTheme,
  getAvailableThemes,
  getThemeWithFallback,
  getSystemThemePreference,
  getRecommendedTheme,
  debounce,
  safeJsonParse,
  formatOutput,
  capitalize
} from '../utils'

describe('Language Utilities', () => {
  describe('getLanguageMode', () => {
    it('should return correct mode for supported languages', () => {
      expect(getLanguageMode('python3')).toBe('python')
      expect(getLanguageMode('javascript')).toBe('javascript')
      expect(getLanguageMode('go')).toBe('go')
      expect(getLanguageMode('rust')).toBe('rust')
      expect(getLanguageMode('cpp')).toBe('cpp')
    })

    it('should return text mode for unsupported languages', () => {
      expect(getLanguageMode('unsupported')).toBe('text')
      expect(getLanguageMode('')).toBe('text')
    })

    it('should handle case insensitive input', () => {
      expect(getLanguageMode('PYTHON3')).toBe('python')
      expect(getLanguageMode('JavaScript')).toBe('javascript')
    })
  })

  describe('isLanguageSupported', () => {
    it('should return true for supported languages', () => {
      expect(isLanguageSupported('python3')).toBe(true)
      expect(isLanguageSupported('javascript')).toBe(true)
      expect(isLanguageSupported('go')).toBe(true)
    })

    it('should return false for unsupported languages', () => {
      expect(isLanguageSupported('unsupported')).toBe(false)
      expect(isLanguageSupported('')).toBe(false)
    })

    it('should handle case insensitive input', () => {
      expect(isLanguageSupported('PYTHON3')).toBe(true)
      expect(isLanguageSupported('JavaScript')).toBe(true)
    })
  })

  describe('getSupportedLanguages', () => {
    it('should return array of supported languages', () => {
      const languages = getSupportedLanguages()
      expect(Array.isArray(languages)).toBe(true)
      expect(languages.length).toBeGreaterThan(0)
      expect(languages).toContain('python3')
      expect(languages).toContain('javascript')
    })
  })
})

describe('Theme Utilities', () => {
  describe('isValidTheme', () => {
    it('should return true for valid themes', () => {
      expect(isValidTheme('default')).toBe(true)
      expect(isValidTheme('dark')).toBe(true)
    })

    it('should return false for invalid themes', () => {
      expect(isValidTheme('invalid')).toBe(false)
      expect(isValidTheme('')).toBe(false)
    })
  })

  describe('getAvailableThemes', () => {
    it('should return array of available themes', () => {
      const themes = getAvailableThemes()
      expect(Array.isArray(themes)).toBe(true)
      expect(themes.length).toBeGreaterThan(0)
      expect(themes).toContain('default')
    })
  })

  describe('getThemeWithFallback', () => {
    it('should return valid theme as is', () => {
      expect(getThemeWithFallback('dark')).toBe('dark')
    })

    it('should return default for invalid theme', () => {
      expect(getThemeWithFallback('invalid')).toBe('default')
      expect(getThemeWithFallback('')).toBe('default')
    })
  })

  describe('getSystemThemePreference', () => {
    it('should return light or dark', () => {
      const preference = getSystemThemePreference()
      expect(['light', 'dark']).toContain(preference)
    })
  })

  describe('getRecommendedTheme', () => {
    it('should return a valid theme', () => {
      const theme = getRecommendedTheme()
      expect(isValidTheme(theme)).toBe(true)
    })
  })
})

describe('General Utilities', () => {
  describe('debounce', () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it('should debounce function calls', () => {
      const mockFn = jest.fn()
      const debouncedFn = debounce(mockFn, 100)

      debouncedFn()
      debouncedFn()
      debouncedFn()

      expect(mockFn).not.toHaveBeenCalled()

      jest.advanceTimersByTime(100)

      expect(mockFn).toHaveBeenCalledTimes(1)
    })

    it('should pass arguments correctly', () => {
      const mockFn = jest.fn()
      const debouncedFn = debounce(mockFn, 100)

      debouncedFn('arg1', 'arg2')

      jest.advanceTimersByTime(100)

      expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2')
    })
  })

  describe('safeJsonParse', () => {
    it('should parse valid JSON', () => {
      const result = safeJsonParse('{"key": "value"}', {})
      expect(result).toEqual({ key: 'value' })
    })

    it('should return fallback for invalid JSON', () => {
      const fallback = { default: true }
      const result = safeJsonParse('invalid json', fallback)
      expect(result).toBe(fallback)
    })

    it('should handle null and undefined', () => {
      expect(safeJsonParse('null', 'fallback')).toBe(null)
      expect(safeJsonParse('undefined', 'fallback')).toBe('fallback')
    })
  })

  describe('formatOutput', () => {
    it('should return "none" for empty or null values', () => {
      expect(formatOutput('')).toBe('none')
      expect(formatOutput(null)).toBe('none')
      expect(formatOutput(undefined)).toBe('none')
      expect(formatOutput('   ')).toBe('none')
    })

    it('should return the string as is for valid content', () => {
      expect(formatOutput('Hello World')).toBe('Hello World')
      expect(formatOutput('  content  ')).toBe('  content  ')
    })
  })

  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(capitalize('hello')).toBe('Hello')
      expect(capitalize('world')).toBe('World')
    })

    it('should handle empty string', () => {
      expect(capitalize('')).toBe('')
    })

    it('should handle single character', () => {
      expect(capitalize('a')).toBe('A')
    })

    it('should not change already capitalized strings', () => {
      expect(capitalize('Hello')).toBe('Hello')
    })
  })
})