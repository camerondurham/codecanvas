import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { fetchLanguages, executeCode, ApiError } from '../api';

// Create MSW server for this test file
const server = setupServer(
  http.get('https://runner.fly.dev/api/v1/languages', () => {
    return HttpResponse.json(['python3', 'javascript', 'go', 'rust', 'cpp', 'bash']);
  }),
  http.post('https://runner.fly.dev/api/v1/run', async ({ request }) => {
    const body = await request.json() as { source: string; language: string };
    return HttpResponse.json({
      stdout: `Hello from ${body.language}!\n`,
      stderr: '',
      error: ''
    });
  })
);

// Setup MSW
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('API Functions', () => {
  describe('fetchLanguages', () => {
    it('should fetch languages successfully', async () => {
      const languages = await fetchLanguages();
      
      expect(languages).toEqual(['python3', 'javascript', 'go', 'rust', 'cpp', 'bash']);
    });

    it('should handle server errors', async () => {
      server.use(
        http.get('https://runner.fly.dev/api/v1/languages', () => {
          return HttpResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
          );
        })
      );

      await expect(fetchLanguages()).rejects.toThrow(ApiError);
      await expect(fetchLanguages()).rejects.toThrow('API request failed: 500');
    });

    it('should handle network errors', async () => {
      server.use(
        http.get('https://runner.fly.dev/api/v1/languages', () => {
          return HttpResponse.error();
        })
      );

      await expect(fetchLanguages()).rejects.toThrow(ApiError);
      await expect(fetchLanguages()).rejects.toThrow('Network error');
    });

    it('should handle invalid JSON response', async () => {
      server.use(
        http.get('https://runner.fly.dev/api/v1/languages', () => {
          return new Response('invalid json{', {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        })
      );

      await expect(fetchLanguages()).rejects.toThrow(ApiError);
    });

    it('should handle empty languages response', async () => {
      server.use(
        http.get('https://runner.fly.dev/api/v1/languages', () => {
          return HttpResponse.json([]);
        })
      );

      const languages = await fetchLanguages();
      expect(languages).toEqual([]);
    });

    it('should handle null response', async () => {
      server.use(
        http.get('https://runner.fly.dev/api/v1/languages', () => {
          return HttpResponse.json(null);
        })
      );

      const languages = await fetchLanguages();
      expect(languages).toEqual([]);
    });
  });

  describe('executeCode', () => {
    it('should execute code successfully', async () => {
      const result = await executeCode('print("Hello World")', 'python3');
      
      expect(result).toEqual({
        stdout: 'Hello from python3!\n',
        stderr: '',
        error: ''
      });
    });

    it('should handle different languages', async () => {
      const result = await executeCode('console.log("Hello")', 'javascript');
      
      expect(result).toEqual({
        stdout: 'Hello from javascript!\n',
        stderr: '',
        error: ''
      });
    });

    it('should handle execution with stderr', async () => {
      server.use(
        http.post('https://runner.fly.dev/api/v1/run', () => {
          return HttpResponse.json({
            stdout: '',
            stderr: 'Warning: deprecated function\n',
            error: ''
          });
        })
      );

      const result = await executeCode('deprecated_function()', 'python3');
      
      expect(result).toEqual({
        stdout: '',
        stderr: 'Warning: deprecated function\n',
        error: ''
      });
    });

    it('should handle execution with error', async () => {
      server.use(
        http.post('https://runner.fly.dev/api/v1/run', () => {
          return HttpResponse.json({
            stdout: '',
            stderr: '',
            error: 'SyntaxError: invalid syntax'
          });
        })
      );

      const result = await executeCode('invalid syntax', 'python3');
      
      expect(result).toEqual({
        stdout: '',
        stderr: '',
        error: 'SyntaxError: invalid syntax'
      });
    });

    it('should handle server errors', async () => {
      server.use(
        http.post('https://runner.fly.dev/api/v1/run', () => {
          return HttpResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
          );
        })
      );

      await expect(executeCode('print("test")', 'python3')).rejects.toThrow(ApiError);
      await expect(executeCode('print("test")', 'python3')).rejects.toThrow('API request failed: 500');
    });

    it('should handle network errors', async () => {
      server.use(
        http.post('https://runner.fly.dev/api/v1/run', () => {
          return HttpResponse.error();
        })
      );

      await expect(executeCode('print("test")', 'python3')).rejects.toThrow(ApiError);
      await expect(executeCode('print("test")', 'python3')).rejects.toThrow('Network error');
    });

    it('should handle invalid JSON response', async () => {
      server.use(
        http.post('https://runner.fly.dev/api/v1/run', () => {
          return new Response('invalid json{', {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        })
      );

      await expect(executeCode('print("test")', 'python3')).rejects.toThrow(ApiError);
    });

    it('should handle missing response fields', async () => {
      server.use(
        http.post('https://runner.fly.dev/api/v1/run', () => {
          return HttpResponse.json({
            stdout: 'Hello World'
            // Missing stderr and error fields
          });
        })
      );

      const result = await executeCode('print("Hello")', 'python3');
      
      expect(result).toEqual({
        stdout: 'Hello World',
        stderr: '',
        error: ''
      });
    });

    it('should handle empty code execution', async () => {
      const result = await executeCode('', 'python3');
      
      expect(result).toEqual({
        stdout: 'Hello from python3!\n',
        stderr: '',
        error: ''
      });
    });

    it('should handle special characters in code', async () => {
      const specialCode = 'print("Hello 世界! 🌍")';
      const result = await executeCode(specialCode, 'python3');
      
      expect(result).toEqual({
        stdout: 'Hello from python3!\n',
        stderr: '',
        error: ''
      });
    });

    it('should handle very long code input', async () => {
      const longCode = 'print("Hello World")\n'.repeat(1000);
      const result = await executeCode(longCode, 'python3');
      
      expect(result).toEqual({
        stdout: 'Hello from python3!\n',
        stderr: '',
        error: ''
      });
    });
  });

  describe('ApiError', () => {
    it('should create ApiError with message only', () => {
      const error = new ApiError('Test error');
      
      expect(error.message).toBe('Test error');
      expect(error.name).toBe('ApiError');
      expect(error.status).toBeUndefined();
      expect(error.response).toBeUndefined();
    });

    it('should create ApiError with status and response', () => {
      const mockResponse = new Response();
      const error = new ApiError('Test error', 404, mockResponse);
      
      expect(error.message).toBe('Test error');
      expect(error.name).toBe('ApiError');
      expect(error.status).toBe(404);
      expect(error.response).toBe(mockResponse);
    });
  });
});