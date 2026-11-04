const test = require('node:test');
const assert = require('node:assert');

// Test the evaluation scoring rules and rubric
test('AI Answer Evaluation Engine - Rubric Integrity & Scoring', async (t) => {
  // Mock questions and evaluation logic
  const FILLER_WORDS = ['basically', 'actually', 'like', 'umm', 'you know', 'matlab'];
  const DECISIVE_PHRASES = ['i led', 'i took ownership', 'i decided', 'i implemented'];
  const HESITANT_PHRASES = ['i guess', 'maybe', 'probably', 'not really sure'];

  function evaluate(transcript, keyPoints = []) {
    const cleanText = (transcript || '').trim();
    const lower = cleanText.toLowerCase();
    const words = cleanText.split(/\s+/).filter(Boolean);

    // 1. Relevance (max 25)
    let relevance = 15;
    let matches = 0;
    keyPoints.forEach((kp) => {
      if (lower.includes(kp.toLowerCase())) matches++;
    });
    if (keyPoints.length > 0) {
      relevance = Math.round(14 + (matches / keyPoints.length) * 11);
    }

    // 2. Clarity (max 20)
    let clarity = 16;
    let fillersFound = 0;
    FILLER_WORDS.forEach((f) => {
      if (lower.includes(f)) fillersFound++;
    });
    clarity -= fillersFound * 2;
    clarity = Math.max(5, Math.min(20, clarity));

    // 3. Communication (max 20)
    let comm = 16;

    // 4. Structure (max 20)
    let structure = 14;
    if (lower.includes('result') || lower.includes('outcome')) structure += 4;

    // 5. Confidence (max 15)
    let confidence = 10;
    DECISIVE_PHRASES.forEach((p) => {
      if (lower.includes(p)) confidence += 2;
    });
    HESITANT_PHRASES.forEach((p) => {
      if (lower.includes(p)) confidence -= 2;
    });
    confidence = Math.max(3, Math.min(15, confidence));

    const total = relevance + clarity + comm + structure + confidence;
    return {
      scores: { relevance, clarity, communication: comm, structure, confidence, total },
      overallScore: total,
      fillerCount: fillersFound,
    };
  }

  await t.test('detects filler words and lowers clarity score', () => {
    const raw = 'Basically I worked on this project and like you know it was basically good.';
    const res = evaluate(raw);
    assert.ok(res.fillerCount >= 2, 'Should detect multiple filler words');
    assert.ok(res.scores.clarity < 16, 'Clarity score should be penalized for fillers');
  });

  await t.test('rewards decisive phrases and penalizes hesitant language', () => {
    const strongAns = 'I took ownership of database optimization and the result was 40% lower latency.';
    const weakAns = 'Maybe I worked on it, I guess someone else did too, not really sure.';

    const strongRes = evaluate(strongAns);
    const weakRes = evaluate(weakAns);

    assert.ok(
      strongRes.scores.confidence > weakRes.scores.confidence,
      'Decisive phrasing must score higher confidence than hesitant phrasing'
    );
  });

  await t.test('evaluates maximum 100 points boundary accurately', () => {
    const ans = 'In my final project I took ownership of backend development and the result was great.';
    const res = evaluate(ans, ['backend', 'project']);
    assert.ok(res.overallScore <= 100, 'Score must not exceed 100');
    assert.ok(res.overallScore >= 0, 'Score must be non-negative');
  });

  await t.test('penalizes off-topic responses appropriately', () => {
    const offTopicAns = 'I like to play cricket and watch movies every weekend.';
    const res = evaluate(offTopicAns, ['database', 'architecture', 'postgresql']);
    assert.ok(res.scores.relevance <= 15, 'Relevance should not be high for off-topic responses');
  });
});

