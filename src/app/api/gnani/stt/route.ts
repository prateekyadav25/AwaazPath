import { NextRequest, NextResponse } from 'next/server';
import { callGnaniPrismaSTT, getGnaniConfig } from '@/lib/gnani';
import { LanguageCode, PrismaFormat } from '@/types';

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
            'Please add your GNANI_API_KEY in .env file or project environment variables. You can explore the application using sample data or Demo Mode in the meantime.',
        },
        { status: 400 }
      );
    }

    const formData = await req.formData();
    const audioFile = formData.get('audio') as File | null;
    const languageCode = (formData.get('language_code') as LanguageCode) || 'indic-auto';
    const format = (formData.get('format') as PrismaFormat) || 'codemix';
    const model = (formData.get('model') as string) || config.sttModel;

    if (!audioFile) {
      return NextResponse.json(
        {
          success: false,
          error: 'No audio file provided in request.',
          code: 'AUDIO_FILE_MISSING',
        },
        { status: 400 }
      );
    }

    const arrayBuffer = await audioFile.arrayBuffer();
    const audioBuffer = Buffer.from(arrayBuffer);

    if (audioBuffer.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Received empty audio buffer.',
          code: 'AUDIO_BUFFER_EMPTY',
        },
        { status: 400 }
      );
    }

    if (audioBuffer.length > 15 * 1024 * 1024) {
      return NextResponse.json(
        {
          success: false,
          error: 'Audio file exceeds 15MB limit.',
          code: 'AUDIO_TOO_LARGE',
        },
        { status: 413 }
      );
    }

    const result = await callGnaniPrismaSTT({
      audioBuffer,
      fileName: audioFile.name || 'recording.wav',
      mimeType: audioFile.type || 'audio/wav',
      languageCode,
      format,
      model,
    });

    return NextResponse.json({
      success: true,
      transcript: result.transcript,
      requestId: result.requestId,
      model: result.model,
      detectedLanguageCode: result.detectedLanguageCode,
      processingTime: result.processingTime,
      endToEndLatency: result.endToEndLatency,
      isLiveApi: true,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown server error during STT processing.';
    return NextResponse.json(
      {
        success: false,
        error: message,
        code: 'GNANI_STT_ERROR',
      },
      { status: 500 }
    );
  }
}

