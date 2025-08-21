import { API_BASE_URL, API_ENDPOINTS } from './constants';

/**
 * API Request/Response Types
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

export interface LanguagesResponse {
  languages?: string[];
}

/**
 * API Error Class
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
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
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
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Network or parsing errors
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
    const response = await apiRequest<LanguagesResponse>(API_ENDPOINTS.LANGUAGES);
    return response.languages || [];
  } catch (error) {
    console.error('Failed to fetch languages:', error);
    throw error;
  }
}

/**
 * Execute code on the server
 */
export async function executeCode(
  code: string,
  language: string
): Promise<CodeExecutionResponse> {
  try {
    const request: CodeExecutionRequest = {
      source: code,
      language,
    };

    const response = await apiRequest<CodeExecutionResponse>(
      API_ENDPOINTS.RUN,
      {
        method: 'POST',
        body: JSON.stringify(request),
      }
    );

    return response;
  } catch (error) {
    console.error('Failed to execute code:', error);
    throw error;
  }
}