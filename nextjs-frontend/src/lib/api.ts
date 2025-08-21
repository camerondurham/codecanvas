import { getApiBaseUrl } from './config';

/**
 * API request and response types
 */
export interface CodeExecutionRequest {
  source: string;
  language: string;
}

export interface CodeExecutionResponse {
  stdout: string;
  stderr: string;
  error: string;
}

export type LanguagesResponse = string[];

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: Response
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Generic fetch wrapper with error handling
 */
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new ApiError(
        `API request failed: ${response.status} ${response.statusText}`,
        response.status,
        response
      );
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Handle network errors or JSON parsing errors
    throw new ApiError(
      `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Fetch available programming languages
 */
export async function fetchLanguages(): Promise<string[]> {
  try {
    const response = await fetchApi<LanguagesResponse>('/languages');
    return response || [];
  } catch (error) {
    console.error('Failed to fetch languages:', error);
    throw error;
  }
}

/**
 * Execute code on the server
 */
export async function executeCode(
  source: string,
  language: string
): Promise<CodeExecutionResponse> {
  try {
    const request: CodeExecutionRequest = {
      source,
      language,
    };

    const response = await fetchApi<CodeExecutionResponse>(
      '/run',
      {
        method: 'POST',
        body: JSON.stringify(request),
      }
    );

    return {
      stdout: response.stdout || '',
      stderr: response.stderr || '',
      error: response.error || '',
    };
  } catch (error) {
    console.error('Failed to execute code:', error);
    throw error;
  }
}