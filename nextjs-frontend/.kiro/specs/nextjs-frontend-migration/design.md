# Design Document

## Overview

The Next.js migration will transform the current vanilla JavaScript code runner frontend into a modern React-based application while preserving all existing functionality. The design focuses on component-based architecture, improved state management, and maintainable styling while keeping the same user experience and API integration.

## Architecture

### Application Structure
```
nextjs-frontend/
├── components/
│   ├── CodeEditor/
│   │   ├── CodeEditor.tsx
│   │   └── CodeEditor.module.css
│   ├── LanguageSelector/
│   │   ├── LanguageSelector.tsx
│   │   └── LanguageSelector.module.css
│   ├── ThemeSelector/
│   │   ├── ThemeSelector.tsx
│   │   └── ThemeSelector.module.css
│   ├── OutputDisplay/
│   │   ├── OutputDisplay.tsx
│   │   └── OutputDisplay.module.css
│   └── Layout/
│       ├── Layout.tsx
│       └── Layout.module.css
├── hooks/
│   ├── useLanguages.ts
│   ├── useCodeExecution.ts
│   └── useLocalStorage.ts
├── lib/
│   ├── api.ts
│   ├── sampleCode.ts
│   └── constants.ts
├── styles/
│   ├── globals.css
│   └── themes.css
├── pages/
│   ├── _app.tsx
│   ├── _document.tsx
│   └── index.tsx
└── public/
    └── favicon.ico
```

### Technology Stack
- **Framework**: Next.js 15 (latest) with App Router
- **Runtime**: Node.js 20+ (LTS)
- **Language**: TypeScript for type safety
- **Styling**: CSS Modules for component-scoped styles
- **Code Editor**: CodeMirror 6 (latest version)
- **State Management**: React hooks (useState, useEffect, useContext)
- **HTTP Client**: Native fetch API with custom hooks
- **Build Tool**: Next.js built-in bundler (replaces Webpack)

## Components and Interfaces

### Core Components

#### CodeEditor Component
```typescript
interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
  theme: string;
}
```
- Wraps CodeMirror 6 editor
- Handles syntax highlighting based on selected language
- Manages theme switching
- Provides auto-focus and line numbers

#### LanguageSelector Component
```typescript
interface LanguageSelectorProps {
  languages: string[];
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  loading?: boolean;
}
```
- Renders dropdown for language selection
- Handles loading state while fetching languages
- Triggers sample code updates on language change

#### ThemeSelector Component
```typescript
interface ThemeSelectorProps {
  selectedTheme: string;
  onThemeChange: (theme: string) => void;
}
```
- Provides theme selection dropdown
- Manages CodeMirror theme switching
- Maintains theme persistence

#### OutputDisplay Component
```typescript
interface OutputDisplayProps {
  output: {
    stdout: string;
    stderr: string;
    error: string;
  } | null;
  loading: boolean;
}
```
- Displays execution results in formatted sections
- Shows loading state during code execution
- Handles empty/null output gracefully

#### Layout Component
```typescript
interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}
```
- Provides consistent page structure
- Handles responsive design
- Manages dark/light mode detection

### Custom Hooks

#### useLanguages Hook
```typescript
interface UseLanguagesReturn {
  languages: string[];
  loading: boolean;
  error: string | null;
}
```
- Fetches available languages from API
- Manages loading and error states
- Caches results to prevent unnecessary requests

#### useCodeExecution Hook
```typescript
interface UseCodeExecutionReturn {
  executeCode: (code: string, language: string) => Promise<void>;
  output: ExecutionOutput | null;
  loading: boolean;
  error: string | null;
}
```
- Handles code execution API calls
- Manages execution state and results
- Provides error handling and loading states

#### useLocalStorage Hook
```typescript
interface UseLocalStorageReturn<T> {
  value: T;
  setValue: (value: T) => void;
}
```
- Persists user preferences (theme, last language)
- Handles localStorage safely with SSR
- Provides type-safe storage interface

## Data Models

### API Request/Response Types
```typescript
interface CodeExecutionRequest {
  source: string;
  language: string;
}

interface CodeExecutionResponse {
  stdout: string;
  stderr: string;
  error: string;
}

interface LanguagesResponse {
  languages: string[];
}
```

### Application State Types
```typescript
interface AppState {
  code: string;
  selectedLanguage: string;
  selectedTheme: string;
  languages: string[];
  output: CodeExecutionResponse | null;
  loading: {
    languages: boolean;
    execution: boolean;
  };
}
```

## Error Handling

### API Error Handling
- Implement retry logic for network failures
- Display user-friendly error messages
- Log detailed errors for debugging
- Graceful degradation when API is unavailable

### Client-Side Error Handling
- Error boundaries for component crashes
- Validation for user inputs
- Fallback UI for missing data
- Safe localStorage access with SSR

### Error Display Strategy
- Toast notifications for temporary errors
- Inline error messages for form validation
- Fallback content for missing data
- Clear error recovery actions

## Testing Strategy

### Unit Testing
- Component testing with React Testing Library
- Hook testing with @testing-library/react-hooks
- API utility function testing with Jest
- Mock external dependencies (CodeMirror, fetch)

### Integration Testing
- End-to-end user workflows
- API integration testing
- Theme switching functionality
- Language selection and code execution flow

### Testing Tools
- **Jest**: Unit test runner
- **React Testing Library**: Component testing
- **MSW (Mock Service Worker)**: API mocking
- **Playwright**: E2E testing (optional)

### Test Coverage Goals
- 80%+ code coverage for utilities and hooks
- Component behavior testing for all user interactions
- API integration testing for all endpoints
- Cross-browser compatibility testing

## Performance Considerations

### Code Splitting
- Dynamic imports for CodeMirror themes
- Lazy loading of language-specific syntax highlighting
- Component-level code splitting for large components

### Bundle Optimization
- Tree shaking for unused CodeMirror features
- CSS optimization and minification
- Image optimization with Next.js Image component
- Static asset optimization

### Runtime Performance
- Debounced API calls for rapid user interactions
- Memoization of expensive computations
- Efficient re-rendering with React.memo
- Optimized CodeMirror configuration

## Migration Strategy

### Phase 1: Project Setup
- Initialize Next.js project with TypeScript
- Set up CSS Modules and global styles
- Configure development environment
- Install and configure CodeMirror 6

### Phase 2: Core Components
- Implement Layout component with responsive design
- Create CodeEditor component with basic functionality
- Build LanguageSelector and ThemeSelector components
- Implement OutputDisplay component

### Phase 3: State Management
- Create custom hooks for API interactions
- Implement local storage persistence
- Add error handling and loading states
- Connect components with state management

### Phase 4: Styling and Polish
- Migrate existing CSS to CSS Modules
- Implement dark/light mode detection
- Add responsive design improvements
- Optimize for accessibility

### Phase 5: Testing and Deployment
- Write comprehensive test suite
- Performance optimization and bundle analysis
- Cross-browser testing
- Production deployment configuration