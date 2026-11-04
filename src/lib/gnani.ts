import { LanguageCode, PrismaFormat } from '@/types';

export const GNANI_API_BASE = 'https://api.vachana.ai';
export const GNANI_STT_ENDPOINT = `${GNANI_API_BASE}/stt/v3`;
export const GNANI_TTS_ENDPOINT = `${GNANI_API_BASE}/api/v1/tts/inference`;

export interface PrismaSTTParams {
  audioBuffer: Buffer;
  fileName?: string;
  mimeType?: string;
  languageCode?: LanguageCode;
  format?: PrismaFormat;
  model?: string;
}

export interface PrismaSTTResponse {
  success: boolean;
  transcript: string;
  requestId?: string;
  model?: string;
  detectedLanguageCode?: string;
  processingTime?: number;
  endToEndLatency?: number;
  raw?: unknown;
}

export interface TimbreTTSParams {
  text: string;
  voice?: string;
  language?: 'hi-IN' | 'en-IN' | string;
  speed?: number;
  model?: string;
}

export interface GnaniConfigStatus {
  isConfigured: boolean;
  sttModel: string;
  ttsModel: string;
  apiKeyPresent: boolean;
  endpoints: {
    stt: string;
    tts: string;
  };
}

export function getGnaniConfig(): GnaniConfigStatus {
  const apiKey = process.env.GNANI_API_KEY || '';
  const isConfigured = Boolean(apiKey && apiKey.trim().length > 0 && apiKey !== 'your_gnani_api_key_here');
  return {
    isConfigured,
    apiKeyPresent: Boolean(apiKey),
    sttModel: process.env.GNANI_STT_MODEL || 'prisma-v3.0',
    ttsModel: process.env.GNANI_TTS_MODEL || 'timbre-v3.0',
    endpoints: {
      stt: GNANI_STT_ENDPOINT,
      tts: GNANI_TTS_ENDPOINT,
    },
  };
}

/**
 * Calls Gnani AI Prisma Speech-to-Text API
 * Follows official documentation: POST https://api.vachana.ai/stt/v3
 */
export async function callGnaniPrismaSTT(
  params: PrismaSTTParams
): Promise<PrismaSTTResponse> {
  const apiKey = process.env.GNANI_API_KEY;
  if (!apiKey || apiKey.trim() === '' || apiKey === 'your_gnani_api_key_here') {
    throw new Error(
      'GNANI_API_KEY is not configured on the server. Please set your API key in environment variables.'
    );
  }

  // Audio size validation: max 15MB
  if (params.audioBuffer.length > 15 * 1024 * 1024) {
    throw new Error('Audio payload exceeds maximum supported size (15MB).');
  }

  if (params.audioBuffer.length === 0) {
    throw new Error('Empty audio recording received.');
  }

  const model = params.model || process.env.GNANI_STT_MODEL || 'prisma-v3.0';
  const languageCode = params.languageCode || 'indic-auto';
  const format = params.format || 'codemix';
  const fileName = params.fileName || 'recording.wav';
  const mimeType = params.mimeType || 'audio/wav';

  // Build FormData for multipart request
  const formData = new FormData();
  const audioBlob = new Blob([new Uint8Array(params.audioBuffer)], { type: mimeType });
  formData.append('audio_file', audioBlob, fileName);
  formData.append('model', model);
  formData.append('language_code', languageCode);
  formData.append('format', format);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 25000); // 25s timeout

  try {
    const startTime = Date.now();
    const response = await fetch(GNANI_STT_ENDPOINT, {
      method: 'POST',
      headers: {
        'X-API-Key-ID': apiKey.trim(),
      },
      body: formData,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorDetails = '';
      try {
        const errorJson = await response.json();
        errorDetails = errorJson.message || errorJson.error || JSON.stringify(errorJson);
      } catch {
        errorDetails = await response.text();
      }

      if (response.status === 401 || response.status === 403) {
        throw new Error(
          `Gnani API Authentication Failed (HTTP ${response.status}). Please verify your X-API-Key-ID in .env: ${errorDetails}`
        );
      } else if (response.status === 402 || response.status === 429) {
        throw new Error(
          `Gnani API Credits/Quota Exceeded (HTTP ${response.status}): ${errorDetails}`
        );
      } else if (response.status === 413) {
        throw new Error(
          `Audio recording too large for Prisma STT (HTTP 413): ${errorDetails}`
        );
      } else {
        throw new Error(
          `Gnani Prisma STT service error (HTTP ${response.status}): ${errorDetails || response.statusText}`
        );
      }
    }

    const data = await response.json();
    const latency = (Date.now() - startTime) / 1000;

    return {
      success: Boolean(data.success ?? true),
      transcript: data.transcript || '',
      requestId: data.request_id,
      model: data.model || model,
      detectedLanguageCode: data.detected_language_code,
      processingTime: data.processing_time,
      endToEndLatency: data.end_to_end_latency || latency,
      raw: data,
    };
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    if (err instanceof Error) {
      if (err.name === 'AbortError') {
        throw new Error('Gnani Prisma STT request timed out after 25 seconds. Please try a shorter recording.');
      }
      throw err;
    }
    throw new Error('Unknown error while calling Gnani Prisma STT.');
  }
}

/**
 * Calls Gnani AI Timbre Text-to-Speech API
 * Follows official documentation: POST https://api.vachana.ai/api/v1/tts/inference
 * Returns binary WAV audio buffer.
 */
export async function callGnaniTimbreTTS(
  params: TimbreTTSParams
): Promise<{ audioBuffer: Buffer; contentType: string }> {
  const apiKey = process.env.GNANI_API_KEY;
  if (!apiKey || apiKey.trim() === '' || apiKey === 'your_gnani_api_key_here') {
    throw new Error(
      'GNANI_API_KEY is not configured on the server. Please set your API key in environment variables.'
    );
  }

  const cleanText = (params.text || '').trim();
  if (!cleanText) {
    throw new Error('Cannot synthesize speech: text is empty.');
  }

  // Text length safety check: max 2,000 characters per inference
  if (cleanText.length > 2000) {
    throw new Error('Text exceeds maximum supported synthesis limit (2,000 characters).');
  }

  const model = params.model || process.env.GNANI_TTS_MODEL || 'timbre-v3.0';
  const voice = params.voice || 'Nalini';
  const language = params.language || 'hi-IN';
  const speed = params.speed || 1.0;

  const payload = {
    text: cleanText,
    voice,
    model,
    language,
    speed,
    audio_config: {
      encoding: 'linear_pcm',
      container: 'wav',
      num_channels: 1,
      sample_rate: 24000,
      sample_width: 2,
    },
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 25000); // 25s timeout

  try {
    const response = await fetch(GNANI_TTS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key-ID': apiKey.trim(),
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorDetails = '';
      try {
        const errorJson = await response.json();
        errorDetails = errorJson.message || errorJson.error || JSON.stringify(errorJson);
      } catch {
        errorDetails = await response.text();
      }

      if (response.status === 401 || response.status === 403) {
        throw new Error(
          `Gnani API Authentication Failed (HTTP ${response.status}). Check X-API-Key-ID: ${errorDetails}`
        );
      } else if (response.status === 402 || response.status === 429) {
        throw new Error(
          `Gnani API Credits/Quota Exceeded (HTTP ${response.status}): ${errorDetails}`
        );
      } else {
        throw new Error(
          `Gnani Timbre TTS service error (HTTP ${response.status}): ${errorDetails || response.statusText}`
        );
      }
    }

    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = Buffer.from(arrayBuffer);
    const contentType = response.headers.get('content-type') || 'audio/wav';

    return {
      audioBuffer,
      contentType,
    };
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    if (err instanceof Error) {
      if (err.name === 'AbortError') {
        throw new Error('Gnani Timbre TTS request timed out after 25 seconds.');
      }
      throw err;
    }
    throw new Error('Unknown error while calling Gnani Timbre TTS.');
  }
}
