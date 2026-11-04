import { EvaluationResult, RubricScores, InterviewQuestion } from '@/types';
import { getQuestionById } from './questions';

const FILLER_WORDS = [
  'basically',
  'actually',
  'like',
  'umm',
  'um',
  'uh',
  'er',
  'you know',
  'matlab',
  'sort of',
  'kind of',
  'i mean',
  'so yeah',
  'anyway',
  'aur kya',
];

const DECISIVE_PHRASES = [
  'i led',
  'i took ownership',
  'i decided',
  'i implemented',
  'i designed',
  'i solved',
  'i learned',
  'i optimized',
  'i coordinated',
  'specifically',
  'for example',
  'the outcome was',
  'the result was',
  'i am confident',
  'we achieved',
  'the impact was',
  'i spearheaded',
  'my responsibility was',
];

const HESITANT_PHRASES = [
  'i guess',
  'maybe',
  'i don’t know',
  'i dont know',
  'probably',
  'not really sure',
  'sort of',
  'kind of like',
  'i think maybe',
  'something like that',
  'kuch aisa',
  'i forgot',
];

const STAR_MARKERS = {
  situation: ['during', 'when i was', 'in my', 'at my', 'college', 'project', 'situation', 'semester', 'team', 'hackathon'],
  task: ['my task', 'goal', 'responsibility', 'responsible for', 'objective', 'challenge', 'needed to', 'had to', 'requirement'],
  action: ['i built', 'i implemented', 'i created', 'i designed', 'i developed', 'i researched', 'i approached', 'i refactored', 'i organized', 'i coded', 'i investigated'],
  result: ['result', 'outcome', 'improved', 'increased', 'reduced', 'achieved', 'won', 'deployed', 'learned', 'concluded', 'delivered'],
};

// Common stop words to exclude when checking topic keyword relevance
const STOP_WORDS = new Set([
  'the', 'is', 'at', 'which', 'on', 'a', 'an', 'and', 'or', 'in', 'with', 'to', 'for', 'of', 'by',
  'what', 'how', 'why', 'can', 'you', 'please', 'explain', 'describe', 'tell', 'me', 'about',
  'your', 'our', 'my', 'we', 'they', 'this', 'that', 'these', 'those', 'from', 'as', 'into',
]);

export function evaluateAnswer(
  transcript: string,
  questionOrId: InterviewQuestion | string
): EvaluationResult {
  const question: InterviewQuestion | undefined =
    typeof questionOrId === 'string' ? getQuestionById(questionOrId) : questionOrId;

  const cleanText = (transcript || '').trim();
  const lowerText = cleanText.toLowerCase();
  const words = cleanText ? cleanText.split(/\s+/).filter(Boolean) : [];
  const wordCount = words.length;

  // Very short response (< 5 words)
  if (wordCount < 5) {
    return {
      scores: {
        relevance: 2,
        clarity: 4,
        communication: 4,
        structure: 2,
        confidence: 3,
        total: 15,
      },
      overallScore: 15,
      grade: 'Critical Focus',
      strengths: ['Microphone recording was captured.'],
      weaknesses: [
        'Answer is far too brief (under 5 words).',
        'Did not answer the question asked.',
        'Did not provide enough context for evaluation.',
      ],
      missingPoints: question ? question.keyPoints : ['Sufficient context and explanation'],
      suggestedImprovements: [
        'Speak for at least 30-60 seconds to provide an adequate explanation.',
        'Address the core topic of the question directly.',
      ],
      betterSampleAnswer: question ? question.sampleGoodAnswer : 'Please provide a more detailed response.',
      simpleFresherAnswer:
        'Start with a direct answer, add one supporting example from your college coursework, and summarize what you learned.',
      hindiExplanation:
        'आपका उत्तर बहुत छोटा था (5 शब्दों से कम)। कृपया प्रश्न को ध्यान से सुनकर कम से कम 30 सेकंड तक उत्तर दें।',
      actionableTip: 'Speak for at least 30 to 45 seconds by sharing a specific situation from your college or project journey.',
      fillerWordsFound: [],
      wordCount,
      confidencePhrases: [],
      hesitationPhrases: [],
    };
  }

  // 1. FILLER WORDS ANALYSIS
  const foundFillers: string[] = [];
  FILLER_WORDS.forEach((filler) => {
    const regex = new RegExp(`\\b${filler}\\b`, 'gi');
    const matches = cleanText.match(regex);
    if (matches && matches.length > 0) {
      foundFillers.push(`${filler} (${matches.length}x)`);
    }
  });

  // 2. CONFIDENCE & HESITATION INDICATORS
  const foundConfidencePhrases: string[] = [];
  DECISIVE_PHRASES.forEach((phrase) => {
    if (lowerText.includes(phrase)) {
      foundConfidencePhrases.push(phrase);
    }
  });

  const foundHesitationPhrases: string[] = [];
  HESITANT_PHRASES.forEach((phrase) => {
    if (lowerText.includes(phrase)) {
      foundHesitationPhrases.push(phrase);
    }
  });

  // 3. RELEVANCE SCORING (Max 25)
  // Must evaluate whether the candidate actually addressed the question's specific topic!
  let relevanceScore = 3;
  const missingPoints: string[] = [];
  let isOffTopic = false;

  if (question) {
    // A. Check topic keyword matches from question text & title
    const questionTokens = `${question.title} ${question.questionText}`
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter((w) => w.length > 3 && !STOP_WORDS.has(w));

    let topicMatches = 0;
    questionTokens.forEach((token) => {
      if (lowerText.includes(token)) {
        topicMatches++;
      }
    });

    const topicCoverage = questionTokens.length > 0 ? topicMatches / questionTokens.length : 0;

    // B. Check key points alignment
    let matchedKeyPoints = 0;
    if (question.keyPoints && question.keyPoints.length > 0) {
      question.keyPoints.forEach((point) => {
        const pointWords = point
          .toLowerCase()
          .replace(/[^\w\s]/g, '')
          .split(/\s+/)
          .filter((w) => w.length > 3 && !STOP_WORDS.has(w));

        const hasMatch = pointWords.some((w) => lowerText.includes(w));
        if (hasMatch) {
          matchedKeyPoints++;
        } else {
          missingPoints.push(point);
        }
      });
    }

    const keyPointsRatio = question.keyPoints?.length ? matchedKeyPoints / question.keyPoints.length : 0;

    // Calculate genuine relevance
    if (topicMatches === 0 && keyPointsRatio === 0) {
      // Completely off-topic or irrelevant answer
      relevanceScore = Math.min(5, Math.max(2, Math.round(wordCount > 30 ? 4 : 2)));
      isOffTopic = true;
    } else {
      // Scaled relevance based on actual topic alignment
      const combinedRelevanceRatio = topicCoverage * 0.4 + keyPointsRatio * 0.6;
      relevanceScore = Math.round(5 + combinedRelevanceRatio * 20);
    }
  } else {
    relevanceScore = wordCount >= 40 ? 15 : 8;
  }
  relevanceScore = Math.min(25, Math.max(2, relevanceScore));

  // 4. CLARITY SCORING (Max 20)
  // Base clarity starts from length & coherence, deducted heavily by fillers
  let clarityScore = 6;
  if (wordCount >= 30 && wordCount <= 200) {
    clarityScore += 8; // Good length
  } else if (wordCount >= 15 && wordCount < 30) {
    clarityScore += 4; // Rather short
  } else if (wordCount > 250) {
    clarityScore += 3; // Rambling
  }

  // Deduct for fillers
  const fillerCount = foundFillers.length;
  if (fillerCount === 0) {
    clarityScore += 5; // Clean speech
  } else if (fillerCount === 1) {
    clarityScore += 2;
  } else {
    clarityScore -= Math.min(6, (fillerCount - 1) * 2);
  }

  clarityScore = Math.min(20, Math.max(3, clarityScore));

  // 5. COMMUNICATION SCORING (Max 20)
  let commScore = 5;
  const uniqueWords = new Set(words.map((w) => w.toLowerCase())).size;
  const vocabularyRatio = wordCount > 0 ? uniqueWords / wordCount : 0;

  if (vocabularyRatio > 0.6 && wordCount >= 25) commScore += 6;
  else if (vocabularyRatio > 0.45 && wordCount >= 15) commScore += 3;

  const professionalConnectors = ['because', 'therefore', 'furthermore', 'specifically', 'additionally', 'however', 'consequently', 'for example'];
  const hasConnectors = professionalConnectors.some((c) => lowerText.includes(c));
  if (hasConnectors) commScore += 4;

  const professionalVerbs = ['developed', 'implemented', 'managed', 'designed', 'built', 'resolved', 'analyzed', 'collaborated', 'optimized'];
  const hasProfVerbs = professionalVerbs.some((v) => lowerText.includes(v));
  if (hasProfVerbs) commScore += 4;

  commScore = Math.min(20, Math.max(3, commScore));

  // 6. STRUCTURE SCORING (Max 20)
  // STAR methodology check
  let structureScore = 4; // Baseline structure (not 12!)
  const starHits = {
    situation: STAR_MARKERS.situation.some((m) => lowerText.includes(m)),
    task: STAR_MARKERS.task.some((m) => lowerText.includes(m)),
    action: STAR_MARKERS.action.some((m) => lowerText.includes(m)),
    result: STAR_MARKERS.result.some((m) => lowerText.includes(m)),
  };

  const starCount = Object.values(starHits).filter(Boolean).length;
  structureScore += starCount * 4; // +4, +8, +12, +16
  structureScore = Math.min(20, Math.max(3, structureScore));

  // 7. CONFIDENCE INDICATORS (Max 15)
  let confScore = 5; // Baseline confidence (not 10!)
  confScore += Math.min(6, foundConfidencePhrases.length * 2);
  confScore -= Math.min(4, foundHesitationPhrases.length * 2);
  confScore = Math.min(15, Math.max(2, Math.round(confScore)));

  // RAW TOTAL SCORE
  let totalScore = relevanceScore + clarityScore + commScore + structureScore + confScore;

  // CRITICAL REALISM GUARDRAILS:
  // If an answer is off-topic (Relevance < 10), it CANNOT pass or be marked Good!
  if (isOffTopic || relevanceScore < 10) {
    totalScore = Math.min(42, totalScore);
    clarityScore = Math.min(12, clarityScore);
    structureScore = Math.min(8, structureScore);
    commScore = Math.min(10, commScore);
  }

  // If answer is very brief (< 20 words), cap at 48
  if (wordCount < 20) {
    totalScore = Math.min(48, totalScore);
  }

  const scores: RubricScores = {
    relevance: relevanceScore,
    clarity: clarityScore,
    communication: commScore,
    structure: structureScore,
    confidence: confScore,
    total: totalScore,
  };

  // Grade classification based on strict standards
  let grade: EvaluationResult['grade'] = 'Needs Improvement';
  if (totalScore >= 85 && relevanceScore >= 18) {
    grade = 'Excellent';
  } else if (totalScore >= 70 && relevanceScore >= 14) {
    grade = 'Good';
  } else if (totalScore >= 45) {
    grade = 'Needs Improvement';
  } else {
    grade = 'Critical Focus';
  }

  // Strengths
  const strengths: string[] = [];
  if (relevanceScore >= 18) {
    strengths.push('Directly addressed the core themes of the question.');
  }
  if (clarityScore >= 14 && foundFillers.length === 0) {
    strengths.push('Spoke clearly with no distracting filler words.');
  }
  if (commScore >= 14) {
    strengths.push('Used good professional vocabulary and transitional connectors.');
  }
  if (starCount >= 3) {
    strengths.push('Followed the STAR method (Situation, Task, Action, Result).');
  }
  if (foundConfidencePhrases.length > 0) {
    strengths.push(`Used decisive ownership phrasing ("${foundConfidencePhrases[0]}").`);
  }
  if (strengths.length === 0) {
    strengths.push('Spoke in complete sentences.');
  }

  // Weaknesses
  const weaknesses: string[] = [];
  if (isOffTopic || relevanceScore < 10) {
    weaknesses.push('Off-topic or incomplete answer: Did not directly address the core question asked.');
  }
  if (foundFillers.length > 0) {
    weaknesses.push(`Frequent filler words detected: ${foundFillers.join(', ')}.`);
  }
  if (starCount < 2) {
    weaknesses.push('Missing STAR structure: Failed to clearly state the action you took and the measurable result.');
  }
  if (foundHesitationPhrases.length > 0) {
    weaknesses.push(`Tentative expressions used (${foundHesitationPhrases.join(', ')}), weakening assertiveness.`);
  }
  if (wordCount < 30) {
    weaknesses.push('Answer was too brief; corporate interviewers expect at least 45 to 90 seconds of detail.');
  }

  // Suggested improvements
  const suggestedImprovements: string[] = [];
  if (isOffTopic || relevanceScore < 10) {
    suggestedImprovements.push('Carefully align your response with the question prompt and key points.');
  }
  if (foundFillers.length > 0) {
    suggestedImprovements.push('Replace filler words like "basically" or "actually" with a silent 1-second pause.');
  }
  suggestedImprovements.push('Follow the STAR structure: Situation, Task, Action you took, and final Result.');
  suggestedImprovements.push('Quantify your results with specific numbers, percentages, or time saved.');

  // Better sample answer & fresher answer
  const betterSampleAnswer = question ? question.sampleGoodAnswer : 'Here is an improved structure focusing on STAR.';
  const simpleFresherAnswer = question
    ? `In my project, I worked on ${question.title.toLowerCase()}. I was responsible for the core implementation, faced real challenges, and solved them step by step.`
    : 'Start with a direct answer, add one supporting example from your college coursework, and summarize what you learned.';

  // Hindi explanation
  let hindiExplanation = '';
  if (isOffTopic || relevanceScore < 10) {
    hindiExplanation =
      'आपका उत्तर पूछे गए प्रश्न से मेल नहीं खाता है। साक्षात्कारकर्ता जिस विषय पर पूछ रहा है, उसी पर केंद्रित रहें और अपने प्रोजेक्ट या अनुभव का सीधा उदाहरण दें।';
  } else if (totalScore >= 75) {
    hindiExplanation =
      'आपका उत्तर बहुत अच्छा और प्रासंगिक था! अधिक प्रभाव के लिए अपने परिणामों में आंकड़े (जैसे percentages या numbers) जोड़ें।';
  } else {
    hindiExplanation =
      'आपके उत्तर की दिशा सही थी, लेकिन इसे अधिक व्यवस्थित (structured) बनाने की आवश्यकता है। STAR विधि (Situation, Task, Action, Result) का उपयोग करें और "basically" जैसे शब्दों से बचें।';
  }

  // Actionable tip
  let actionableTip = 'Always start by directly answering the question in your first sentence.';
  if (isOffTopic || relevanceScore < 10) {
    actionableTip = 'Make sure your opening sentence directly repeats the core theme of the question.';
  } else if (foundFillers.length > 0) {
    actionableTip = `Practice pausing silently instead of saying "${foundFillers[0].split(' ')[0]}".`;
  } else if (starCount < 2) {
    actionableTip = 'End your answer with a concrete result: "As a result, we achieved..."';
  }

  return {
    scores,
    overallScore: totalScore,
    grade,
    strengths,
    weaknesses,
    missingPoints: missingPoints.slice(0, 3),
    suggestedImprovements,
    betterSampleAnswer,
    simpleFresherAnswer,
    hindiExplanation,
    actionableTip,
    fillerWordsFound: foundFillers,
    wordCount,
    confidencePhrases: foundConfidencePhrases,
    hesitationPhrases: foundHesitationPhrases,
  };
}
