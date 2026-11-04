import { NextRequest, NextResponse } from 'next/server';
import { callGnaniTimbreTTS, getGnaniConfig } from '@/lib/gnani';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const config = getGnaniConfig();

    if (!config.isConfigured) {
      return NextResponse.json(
        {
          success: false,
          error: 'Gnani API key is not configured on the server.',
          code: 'GNANI_API_KEY_MISSING',
          instructions:
            'Please add your GNANI_API_KEY in .env file. The application operates in Demo Mode until an API key is provided.',
        },
        { status: 400 }
      );
    }

    const body = await req.json();
    const text = (body.text || '').trim();
    const voice = body.voice || 'Shivani';
    const language = body.language || 'hi-IN';
    const speed = typeof body.speed === 'number' ? body.speed : 1.0;
    const model = body.model || config.ttsModel;

    if (!text) {
      return NextResponse.json(
        {
          success: false,
          error: 'Text field is required for speech synthesis.',
          code: 'TEXT_REQUIRED',
        },
        { status: 400 }
      );
    }

    if (text.length > 2000) {
      return NextResponse.json(
        {
          success: false,
          error: 'Text length cannot exceed 2,000 characters.',
          code: 'TEXT_TOO_LONG',
        },
        { status: 400 }
      );
    }

    const { audioBuffer, contentType } = await callGnaniTimbreTTS({
      text,
      voice,
      language,
      speed,
      model,
    });

    return new Response(new Uint8Array(audioBuffer), {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': audioBuffer.length.toString(),
        'Cache-Control': 'public, max-age=3600, immutable',
        'X-Gnani-Model': model,
        'X-Gnani-Voice': voice,
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown server error during TTS synthesis.';
    return NextResponse.json(
      {
        success: false,
        error: message,
        code: 'GNANI_TTS_ERROR',
      },
      { status: 500 }
    );
  }
}
