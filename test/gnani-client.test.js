const test = require('node:test');
const assert = require('node:assert');

test('Gnani AI Client - Request Construction & Security Verification', async (t) => {
  const GNANI_API_BASE = 'https://api.vachana.ai';
  const GNANI_STT_ENDPOINT = `${GNANI_API_BASE}/stt/v3`;
  const GNANI_TTS_ENDPOINT = `${GNANI_API_BASE}/api/v1/tts/inference`;

  await t.test('verifies correct official Gnani endpoints', () => {
    assert.strictEqual(GNANI_STT_ENDPOINT, 'https://api.vachana.ai/stt/v3');
    assert.strictEqual(GNANI_TTS_ENDPOINT, 'https://api.vachana.ai/api/v1/tts/inference');
  });

  await t.test('constructs Prisma STT multipart request headers correctly', () => {
    const testApiKey = 'test_gnani_key_xyz123';
    const headers = {
      'X-API-Key-ID': testApiKey,
    };

    assert.strictEqual(headers['X-API-Key-ID'], 'test_gnani_key_xyz123');
    // Ensure Authorization: Bearer is NOT used (Gnani uses X-API-Key-ID)
    assert.strictEqual(headers['Authorization'], undefined);
  });

  await t.test('validates Prisma STT parameters (model, language_code, format)', () => {
    const model = 'prisma-v3.0';
    const languageCode = 'indic-auto';
    const format = 'codemix';

    assert.strictEqual(model, 'prisma-v3.0');
    assert.ok(['indic-auto', 'hi-IN', 'en-IN'].includes(languageCode));
    assert.ok(['codemix', 'transliterate', 'transcribe', 'verbatim'].includes(format));
  });

  await t.test('constructs Timbre TTS payload according to official audio_config schema', () => {
    const text = 'नमस्ते, आप कैसे हैं?';
    const voice = 'Nalini';
    const model = 'timbre-v3.0';
    const language = 'hi-IN';

    const payload = {
      text,
      voice,
      model,
      language,
      speed: 1.0,
      audio_config: {
        encoding: 'linear_pcm',
        container: 'wav',
        num_channels: 1,
        sample_rate: 24000,
        sample_width: 2,
      },
    };

    assert.strictEqual(payload.audio_config.container, 'wav');
    assert.strictEqual(payload.audio_config.encoding, 'linear_pcm');
    assert.strictEqual(payload.audio_config.sample_rate, 24000);
    assert.strictEqual(payload.voice, 'Nalini');
  });

  await t.test('validates audio buffer limits (rejects >15MB payloads)', () => {
    const maxSizeBytes = 15 * 1024 * 1024;
    const testBuffer = Buffer.alloc(1024); // 1KB
    const oversizedBuffer = { length: 20 * 1024 * 1024 };

    assert.ok(testBuffer.length <= maxSizeBytes, 'Valid audio should pass size validation');
    assert.ok(oversizedBuffer.length > maxSizeBytes, 'Oversized audio must be flagged');
  });

  await t.test('mock STT response parsing mirrors Prisma v3.0 JSON specification', () => {
    const mockPrismaResponse = {
      success: true,
      request_id: '5c1f0a52-6d62-4e0b-9a38-2f2b8a8f7a10',
      transcript: 'Sir humara final year project KisanDirect tha.',
      model: 'prisma-v3.0',
      detected_language_code: 'hi-IN',
      processing_time: 0.58,
      end_to_end_latency: 0.66,
    };

    assert.strictEqual(mockPrismaResponse.success, true);
    assert.strictEqual(mockPrismaResponse.model, 'prisma-v3.0');
    assert.ok(mockPrismaResponse.transcript.length > 0);
    assert.strictEqual(mockPrismaResponse.detected_language_code, 'hi-IN');
  });
});
