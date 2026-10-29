import { GoogleGenAI } from '@google/genai';

/**
 * Safely retrieve the vaulted server-side Gemini API key.
 * Strictly reads process.env.GEMINI_API_KEY.
 * Trims extraneous whitespace and surrounding quotes.
 * Strictly server-side: never exposed to browser, logs, or exports.
 */
export function getApiKey(): string {
  const rawKey = process.env.GEMINI_API_KEY || '';
  return rawKey.trim().replace(/^["']|["']$/g, '');
}

export interface SafeKeyDiagnostics {
  variable_name: 'GEMINI_API_KEY';
  is_present: boolean;
  trimmed_length: number;
  format_valid: boolean;
  format_hint: string;
}

/**
 * Safe diagnostics reporting presence and trimmed length without ever exposing the key.
 */
export function getSafeKeyDiagnostics(): SafeKeyDiagnostics {
  const apiKey = getApiKey();
  const isPresent = Boolean(apiKey);
  const trimmedLength = apiKey.length;
  const startsWithAIzaSy = apiKey.startsWith('AIzaSy');
  const formatValid = isPresent && startsWithAIzaSy && trimmedLength === 39;

  let formatHint = '';
  if (!isPresent) {
    formatHint = 'GEMINI_API_KEY is not configured in the server process. Please set GEMINI_API_KEY in Settings > Secrets.';
  } else if (!startsWithAIzaSy) {
    formatHint = `Target variable process.env.GEMINI_API_KEY is present (${trimmedLength} chars), but does not start with 'AIzaSy'. Official Google AI Studio Gemini API keys begin with 'AIzaSy' and are 39 characters.`;
  } else if (trimmedLength !== 39) {
    formatHint = `Target variable starts with 'AIzaSy' but has length ${trimmedLength} (expected exactly 39 characters).`;
  } else {
    formatHint = 'Key structure valid (starts with AIzaSy, exactly 39 characters).';
  }

  return {
    variable_name: 'GEMINI_API_KEY',
    is_present: isPresent,
    trimmed_length: trimmedLength,
    format_valid: formatValid,
    format_hint: formatHint
  };
}

/**
 * Lazily instantiate the GoogleGenAI client with the current server environment key
 * and required AI Studio telemetry headers.
 */
export function getGeminiClient(): GoogleGenAI {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured on the server environment. Please configure GEMINI_API_KEY in Settings > Secrets.');
  }

  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

export interface GenerationOptions {
  model?: string;
  temperature?: number;
  systemInstruction?: string;
}

export interface GenerationResult {
  text: string;
  model: string;
  latency_ms: number;
  usage?: {
    promptTokens?: number;
    responseTokens?: number;
    totalTokens?: number;
  };
}

/**
 * Classify Gemini API errors into secure, human-readable messages
 * without leaking raw keys, auth headers, or dumping unparsed JSON payloads.
 */
export function classifyGeminiError(error: any): string {
  if (!error) return 'Unknown error';

  const rawMessage = typeof error === 'string' ? error : (error.message || '');
  let detailMessage = rawMessage;

  // Attempt to parse JSON error structure if present in message
  try {
    const jsonMatch = rawMessage.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      if (parsed?.error?.message) {
        detailMessage = parsed.error.message;
      }
    }
  } catch {
    // Keep rawMessage as fallback
  }

  const combined = `${rawMessage} ${detailMessage}`;
  const apiKey = getApiKey();
  const formatNote = apiKey && !apiKey.startsWith('AIzaSy')
    ? ` Note: process.env.GEMINI_API_KEY currently has ${apiKey.length} characters with non-standard prefix (standard Google Gemini keys start with 'AIzaSy' and are 39 characters).`
    : '';

  if (
    combined.includes('API_KEY_INVALID') ||
    combined.includes('API key not valid') ||
    combined.includes('INVALID_ARGUMENT') && combined.includes('API key') ||
    error.status === 400 && combined.includes('API key') ||
    error.status === 401
  ) {
    return `Google Gemini API key is invalid or unrecognized (API_KEY_INVALID). Please configure a valid Gemini API key in Settings > Secrets.${formatNote}`;
  }

  if (error.status === 403 || combined.includes('PERMISSION_DENIED') || combined.includes('403')) {
    return 'Google Gemini API permission error: Free tier is unavailable for this project or billing upgrade required (403 PERMISSION_DENIED).';
  }

  if (error.status === 429 || combined.includes('RESOURCE_EXHAUSTED') || combined.includes('429')) {
    return 'Google Gemini rate limit reached (429 RESOURCE_EXHAUSTED). Quota exceeded; operator authorization required for alternative model.';
  }

  if (error.status === 503 || combined.includes('503') || combined.includes('UNAVAILABLE')) {
    return 'Google Gemini service is temporarily unavailable (503 UNAVAILABLE). Please retry in a few moments.';
  }

  return detailMessage || 'Google Gemini connection test failed.';
}

/**
 * Execute AI generation via Google Gemini SDK (@google/genai)
 * Strictly enforces server-side vaulting and error classification per 07_AI_PROVIDER_MODEL_MANAGER.md
 */
export async function executeGeminiGeneration(
  prompt: string,
  options: GenerationOptions = {}
): Promise<GenerationResult> {
  const model = options.model || 'gemini-3.8-flash';
  const startTime = Date.now();

  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured on the server. Please set GEMINI_API_KEY in Settings > Secrets.');
  }

  let attempts = 0;
  const maxAttempts = 2;

  while (attempts < maxAttempts) {
    attempts++;
    try {
      const client = getGeminiClient();
      const response = await client.models.generateContent({
        model,
        contents: prompt,
        config: {
          temperature: options.temperature ?? 0.7,
          systemInstruction: options.systemInstruction
        }
      });

      const text = response.text || '';
      const usageMetadata = response.usageMetadata;
      const latency_ms = Date.now() - startTime;

      return {
        text,
        model,
        latency_ms,
        usage: {
          promptTokens: usageMetadata?.promptTokenCount,
          responseTokens: usageMetadata?.candidatesTokenCount,
          totalTokens: usageMetadata?.totalTokenCount
        }
      };
    } catch (error: any) {
      console.error(`[Gemini Service] Attempt ${attempts} failed:`, error.message);

      // If 503 (high demand) or 5xx, retry if attempts remain
      if ((error.status === 503 || error.message?.includes('503') || error.message?.includes('UNAVAILABLE')) && attempts < maxAttempts) {
        await new Promise(res => setTimeout(res, 2000));
        continue;
      }

      throw new Error(classifyGeminiError(error));
    }
  }

  throw new Error('Google Gemini service unavailable after retries. Please retry in a few moments.');
}

export interface ModelCatalogEntry {
  id: string;
  name: string;
  provider: 'Google Gemini';
  tier: 'Fast' | 'Reasoning';
  status: 'Supported' | 'Candidate';
  capabilities: {
    multimodal: boolean;
    structured_json: boolean;
    max_output_tokens: number;
    recommended_use: string;
  };
}

export const MODEL_CATALOG: ModelCatalogEntry[] = [
  {
    id: 'gemini-3.8-flash',
    name: 'Gemini 3.8 Flash',
    provider: 'Google Gemini',
    tier: 'Fast',
    status: 'Supported',
    capabilities: {
      multimodal: true,
      structured_json: true,
      max_output_tokens: 8192,
      recommended_use: 'Default production model for Story-to-Script, Video Prompts, Thumbnails & SEO'
    }
  },
  {
    id: 'gemini-4-argon',
    name: 'Gemini 4 Argon',
    provider: 'Google Gemini',
    tier: 'Reasoning',
    status: 'Supported',
    capabilities: {
      multimodal: true,
      structured_json: true,
      max_output_tokens: 16384,
      recommended_use: 'High-reasoning alternative model for intricate multi-narrative analysis'
    }
  }
];

export interface ConnectionTestResult {
  success: boolean;
  latency_ms: number;
  model: string;
  error?: string;
  diagnostics: SafeKeyDiagnostics;
}

/**
 * Live connection diagnostic test for Google Gemini
 */
export async function testGeminiConnection(): Promise<ConnectionTestResult> {
  const startTime = Date.now();
  const apiKey = getApiKey();
  const diagnostics = getSafeKeyDiagnostics();

  if (!apiKey) {
    return {
      success: false,
      latency_ms: 0,
      model: 'gemini-3.8-flash',
      error: 'GEMINI_API_KEY is not configured on the server environment. Please configure GEMINI_API_KEY in Settings > Secrets.',
      diagnostics
    };
  }

  try {
    const client = getGeminiClient();
    const response = await client.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: 'Ping',
      config: {
        maxOutputTokens: 5
      }
    });

    const latency_ms = Date.now() - startTime;
    return {
      success: Boolean(response && response.text),
      latency_ms,
      model: 'gemini-3.8-flash',
      diagnostics
    };
  } catch (err: any) {
    const latency_ms = Date.now() - startTime;
    return {
      success: false,
      latency_ms,
      model: 'gemini-3.8-flash',
      error: classifyGeminiError(err),
      diagnostics
    };
  }
}
