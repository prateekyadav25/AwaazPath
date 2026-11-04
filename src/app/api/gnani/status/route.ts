import { NextResponse } from 'next/server';
import { getGnaniConfig } from '@/lib/gnani';

export const dynamic = 'force-dynamic';

export async function GET() {
  const config = getGnaniConfig();

  return NextResponse.json({
    status: 'ok',
    timestamp: Date.now(),
    gnani: {
      isConfigured: config.isConfigured,
      apiKeyPresent: config.apiKeyPresent,
      sttModel: config.sttModel,
      ttsModel: config.ttsModel,
      endpoints: config.endpoints,
      creditConservationMode: true,
      creditNote:
        'Official Gnani programme credits (5,000 credit limit) are protected. Audio generation and transcription require explicit user confirmation.',
    },
  });
}

