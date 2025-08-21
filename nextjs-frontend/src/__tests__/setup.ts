import '@testing-library/jest-dom';
import React from 'react';

// Polyfill for Response and Request
if (!global.Response) {
  global.Response = class Response {
    constructor(public body: any, public init: any = {}) {}
    ok = true;
    status = 200;
    statusText = 'OK';
    headers = new Map();
    json() { return Promise.resolve(this.body); }
    text() { return Promise.resolve(String(this.body)); }
  } as any;
}

if (!global.Request) {
  global.Request = class Request {
    constructor(public url: string, public init: any = {}) {}
    headers = new Map();
    json() { return Promise.resolve({}); }
  } as any;
}

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn().mockResolvedValue(undefined),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
    };
  },
}));

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    };
  },
  useSearchParams() {
    return new URLSearchParams();
  },
  usePathname() {
    return '/';
  },
}));

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return React.createElement('img', props);
  },
}));

// Mock CodeMirror to avoid issues with DOM dependencies
jest.mock('codemirror', () => ({
  EditorView: class MockEditorView {
    constructor() {}
    destroy() {}
    dispatch() {}
    static theme = jest.fn(() => []);
  },
  basicSetup: [],
  EditorState: {
    create: jest.fn(() => ({})),
  },
}));

jest.mock('@codemirror/view', () => ({
  EditorView: class MockEditorView {
    constructor() {}
    destroy() {}
    dispatch() {}
    static theme = jest.fn(() => []);
  },
  ViewUpdate: jest.fn(),
}));

jest.mock('@codemirror/state', () => ({
  EditorState: {
    create: jest.fn(() => ({})),
  },
  StateEffect: jest.fn(),
}));

jest.mock('@codemirror/theme-one-dark', () => ({
  oneDark: jest.fn(() => []),
}));

jest.mock('@codemirror/lang-javascript', () => ({
  javascript: jest.fn(() => []),
}));

jest.mock('@codemirror/lang-python', () => ({
  python: jest.fn(() => []),
}));

jest.mock('@codemirror/lang-cpp', () => ({
  cpp: jest.fn(() => []),
}));

jest.mock('@codemirror/lang-rust', () => ({
  rust: jest.fn(() => []),
}));

jest.mock('@codemirror/lang-go', () => ({
  go: jest.fn(() => []),
}));

jest.mock('@codemirror/language', () => ({
  StreamLanguage: {
    define: jest.fn(() => []),
  },
}));

jest.mock('@codemirror/legacy-modes/mode/shell', () => ({
  shell: jest.fn(() => []),
}));

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

// Mock sessionStorage
Object.defineProperty(window, 'sessionStorage', {
  value: localStorageMock,
  writable: true,
});

// MSW setup
import { server } from './mocks/server';

// Start MSW server before all tests
beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

// Reset handlers after each test
afterEach(() => {
  server.resetHandlers();
});

// Clean up after all tests
afterAll(() => {
  server.close();
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Set up environment variables for tests
process.env.NEXT_PUBLIC_API_BASE_URL = 'https://runner.fly.dev/api/v1';

// Reset mocks before each test
beforeEach(() => {
  localStorageMock.getItem.mockClear();
  localStorageMock.setItem.mockClear();
  localStorageMock.removeItem.mockClear();
  localStorageMock.clear.mockClear();
});