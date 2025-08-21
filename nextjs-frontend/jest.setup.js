// Polyfill for TextEncoder/TextDecoder - MUST be first
const { TextEncoder, TextDecoder } = require('util')
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

require('whatwg-fetch')

// Additional polyfills for MSW
global.ReadableStream = global.ReadableStream || class ReadableStream {
  constructor() {}
}

global.WritableStream = global.WritableStream || class WritableStream {
  constructor() {}
}

global.TransformStream = global.TransformStream || class TransformStream {
  constructor() {
    this.readable = new ReadableStream()
    this.writable = new WritableStream()
  }
}

// Polyfill for Response
global.Response = Response

// Polyfill for BroadcastChannel (needed by MSW)
global.BroadcastChannel = class BroadcastChannel {
  constructor(name) {
    this.name = name
  }
  postMessage() {}
  close() {}
  addEventListener() {}
  removeEventListener() {}
}

// Set environment variables for testing
process.env.NEXT_PUBLIC_API_BASE_URL = 'https://runner.fly.dev/api/v1'

// Mock fetch globally
global.fetch = jest.fn()

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.localStorage = localStorageMock

// MSW setup will be done in individual test files that need it

// Add timeout for tests
jest.setTimeout(10000)