# Gnani AI Integration Specification

This document details the exact, authentic API contracts implemented in AwaazPath for **Gnani AI Prisma (STT)** and **Gnani AI Timbre (TTS)**.

---

## 1. Speech-to-Text: Gnani Prisma v3.0

### Official Documentation Reference
- Documentation: `https://docs.gnani.ai/api/STT/speech-to-text`
- Endpoint: `POST https://api.vachana.ai/stt/v3`
- Method: `POST`
- Content-Type: `multipart/form-data`

### Authentication Header
```http
X-API-Key-ID: <GNANI_API_KEY>
```
*Note: Gnani AI does not use standard `Authorization: Bearer` headers. It requires `X-API-Key-ID`.*

### Request Parameters (Form Data)
| Field | Type | Description | Values / Example |
| :--- | :--- | :--- | :--- |
| `audio_file` | File / Binary Blob | Raw audio recording (WAV, WebM, MP3) | `recording.wav` (max 15MB, up to 30s) |
| `model` | string | Speech recognition model identifier | `prisma-v3.0` |
| `language_code` | string | Indian language code | `indic-auto` (default auto-detection), `hi-IN` (Hindi), `en-IN` (Indian English) |
| `format` | string | Output transcription formatting | `codemix` (code-mixed Hinglish in Latin script), `transliterate`, `transcribe`, `verbatim` |

### cURL Example
```bash
curl -X POST https://api.vachana.ai/stt/v3 \
  -H "X-API-Key-ID: YOUR_GNANI_API_KEY" \
  -F "audio_file=@/path/to/interview_answer.wav" \
  -F "model=prisma-v3.0" \
  -F "language_code=indic-auto" \
  -F "format=codemix"
```

### Official JSON Response
```json
{
  "success": true,
  "request_id": "5c1f0a52-6d62-4e0b-9a38-2f2b8a8f7a10",
  "transcript": "Sir humara final year project KisanDirect portal tha. Basically farmers aur local mandi ko connect karne ke liye banaya tha.",
  "model": "prisma-v3.0",
  "detected_language_code": "hi-IN",
  "processing_time": 0.58,
  "end_to_end_latency": 0.66
}
```

---

## 2. Text-to-Speech: Gnani Timbre v3.0

### Official Documentation Reference
- Documentation: `https://docs.gnani.ai/api/TTS`
- Endpoint: `POST https://api.vachana.ai/api/v1/tts/inference`
- Method: `POST`
- Content-Type: `application/json`

### Authentication Header
```http
X-API-Key-ID: <GNANI_API_KEY>
Content-Type: application/json
```

### Request Payload (JSON)
```json
{
  "text": "For our capstone project, our team built KisanDirect, a digital marketplace connecting smallholder farmers with regional restaurants.",
  "voice": "Nalini",
  "model": "timbre-v3.0",
  "language": "hi-IN",
  "speed": 1.0,
  "audio_config": {
    "encoding": "linear_pcm",
    "container": "wav",
    "num_channels": 1,
    "sample_rate": 24000,
    "sample_width": 2
  }
}
```

### Response
- **Status:** `200 OK`
- **Content-Type:** `audio/wav`
- **Body:** Raw binary WAV audio data with complete RIFF headers, played directly in the browser via an HTML5 `Blob` URL.

---

## 3. Server-Side Integration Handler in AwaazPath

In AwaazPath, frontend requests call internal routes `/api/gnani/stt` and `/api/gnani/tts`, ensuring the `GNANI_API_KEY` never leaves the secure server environment:

```typescript
// Location: src/lib/gnani.ts
export async function callGnaniPrismaSTT(params: PrismaSTTParams): Promise<PrismaSTTResponse> { ... }
export async function callGnaniTimbreTTS(params: TimbreTTSParams): Promise<{ audioBuffer: Buffer; contentType: string }> { ... }
```

---

## 4. Error Codes & User Handling

| HTTP Status | Gnani Meaning | AwaazPath User-Friendly Handling |
| :--- | :--- | :--- |
| `400 Bad Request` | Missing text/audio or invalid payload | Shows specific field error without technical crash |
| `401 / 403` | Invalid or missing `X-API-Key-ID` | Informs user to verify key in `.env`; offers seamless Demo Mode |
| `402 / 429` | Programme credits or quota exhausted | Alerts user that 5,000 credit limit was reached; switches to demo sandbox |
| `413 Payload Too Large` | Audio exceeds size/duration | Recommends speaking within the 30-second limit |
| `504 Timeout` | Gateway or network latency | 25-second abort controller prevents hanging interface |

