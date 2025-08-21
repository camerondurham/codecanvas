import { http, HttpResponse } from 'msw';

export const handlers = [
  // Mock languages API
  http.get('https://runner.fly.dev/api/v1/languages', () => {
    return HttpResponse.json(['python3', 'javascript', 'go', 'rust', 'cpp', 'bash']);
  }),

  // Mock code execution API
  http.post('https://runner.fly.dev/api/v1/run', async ({ request }) => {
    const body = await request.json() as { source: string; language: string };
    
    // Simulate different responses based on code content
    if (body.source.includes('error')) {
      return HttpResponse.json(
        { error: 'Runtime error: Undefined variable', stdout: '', stderr: '' },
        { status: 400 }
      );
    }
    
    if (body.source.includes('timeout')) {
      return HttpResponse.json({
        stdout: 'Hello from timeout test!\n',
        stderr: '',
        error: ''
      }, { delay: 1000 });
    }
    
    // Default successful response
    return HttpResponse.json({
      stdout: `Hello from ${body.language}!\n`,
      stderr: '',
      error: ''
    });
  }),

  // Mock localhost endpoints for development
  http.get('http://localhost:10100/api/v1/languages', () => {
    return HttpResponse.json(['python3', 'javascript', 'go', 'rust', 'cpp', 'bash']);
  }),

  http.post('http://localhost:10100/api/v1/run', async ({ request }) => {
    const body = await request.json() as { source: string; language: string };
    
    return HttpResponse.json({
      stdout: `Hello from ${body.language}!\n`,
      stderr: '',
      error: ''
    });
  }),
];