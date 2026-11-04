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
];

const STAR_MARKERS = {
  situation: ['during', 'when i was', 'in my', 'at my', 'college', 'project', 'situation', 'semester', 'team'],
  task: ['my task', 'goal', 'responsibility', 'responsible for', 'objective', 'challenge', 'needed to', 'had to'],
  action: ['i built', 'i implemented', 'i created', 'i designed', 'i developed', 'i researched', 'i approached', 'i refactored', 'i organized'],
  result: ['result', 'outcome', 'improved', 'increased', 'reduced', 'achieved', 'won', 'deployed', 'learned', 'concluded'],
};

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

  if (wordCount < 5) {
    return {
      scores: {
        relevance: 5,
        clarity: 5,
        communication: 5,
        structure: 5,
        confidence: 3,
        total: 23,
      },
      overallScore: 23,
      grade: 'Critical Focus',
      strengths: ['Attempted to speak.'],
      weaknesses: [
        'Answer is too brief (under 5 words).',
        'Did not provide enough detail for meaningful evaluation.',
      ],
      missingPoints: question ? question.keyPoints : ['Sufficient context and explanation'],
      suggestedImprovements: [
        'Elaborate your thoughts with specific college or project examples.',
        'Aim for at least 60-120 words to give the interviewer adequate detail.',
      ],
      betterSampleAnswer: question ? question.sampleGoodAnswer : 'Please provide a more detailed response.',
      simpleFresherAnswer:
        'Start with a direct answer, add one supporting example from your college coursework, and summarize what you learned.',
      hindiExplanation:
        'आपका उत्तर बहुत छोटा था। साक्षात्कारकर्ता आपके सोचने के तरीके और उदाहरणों को सुनना चाहता है। कम से कम 3-4 वाक्यों में अपना अनुभव बताएं।',
      actionableTip: 'Speak for at least 45 to 60 seconds by sharing a specific situation from your college or project journey.',
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

  // 2. CONFIDENCE & HESITATION INDICATORS (Transcript-based)
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
  let relevanceScore = 15;
  const missingPoints: string[] = [];

  if (question && question.keyPoints) {
    let matchedPoints = 0;
    question.keyPoints.forEach((point) => {
      const pointWords = point
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .filter((w) => w.length > 3);

      const hasMatch = pointWords.some((w) => lowerText.includes(w));
      if (hasMatch) {
        matchedPoints++;
      } else {
        missingPoints.push(point);
      }
    });

    const matchRatio = matchedPoints / question.keyPoints.length;
    relevanceScore = Math.round(14 + matchRatio * 11);
  } else {
    // If generic question
    relevanceScore = wordCount >= 50 ? 21 : 16;
  }
  relevanceScore = Math.min(25, Math.max(5, relevanceScore));

  // 4. CLARITY SCORING (Max 20)
  // Deduct for excess fillers, reward appropriate length and punctuation
  let clarityScore = 16;
  const fillerCount = foundFillers.length;
  if (fillerCount === 0) clarityScore += 3;
  else if (fillerCount === 1) clarityScore += 1;
  else if (fillerCount > 3) clarityScore -= Math.min(6, (fillerCount - 2) * 2);

  if (wordCount >= 40 && wordCount <= 220) {
    clarityScore += 1; // ideal length for typical interview question
  } else if (wordCount > 300) {
    clarityScore -= 2; // too rambling
  }
  clarityScore = Math.min(20, Math.max(5, clarityScore));

  // 5. COMMUNICATION SCORING (Max 20)
  // Evaluates professional phrasing, vocabulary variety, sentence flow
  let commScore = 14;
  const uniqueWords = new Set(words.map((w) => w.toLowerCase())).size;
  const vocabularyRatio = uniqueWords / wordCount;

  if (vocabularyRatio > 0.65) commScore += 3;
  else if (vocabularyRatio > 0.5) commScore += 2;

  // Check for professional connectors (furthermore, however, specifically, therefore)
  const professionalConnectors = ['because', 'therefore', 'furthermore', 'specifically', 'additionally', 'however', 'consequently'];
  const hasConnectors = professionalConnectors.some((c) => lowerText.includes(c));
  if (hasConnectors) commScore += 3;

  commScore = Math.min(20, Math.max(5, commScore));

  // 6. STRUCTURE SCORING (Max 20)
  // STAR markers check: Situation, Task, Action, Result
  let structureScore = 12;
  const starHits = {
    situation: STAR_MARKERS.situation.some((m) => lowerText.includes(m)),
    task: STAR_MARKERS.task.some((m) => lowerText.includes(m)),
    action: STAR_MARKERS.action.some((m) => lowerText.includes(m)),
    result: STAR_MARKERS.result.some((m) => lowerText.includes(m)),
  };

  const starCount = Object.values(starHits).filter(Boolean).length;
  structureScore += starCount * 2; // +2 to +8
  structureScore = Math.min(20, Math.max(5, structureScore));

  // 7. CONFIDENCE INDICATORS (Max 15)
  // Based strictly on decisive vs hesitant language in the transcript
  let confScore = 10;
  confScore += Math.min(4, foundConfidencePhrases.length * 1.5);
  confScore -= Math.min(4, foundHesitationPhrases.length * 1.5);
  confScore = Math.min(15, Math.max(3, Math.round(confScore)));

  // TOTAL SCORE
  const totalScore = relevanceScore + clarityScore + commScore + structureScore + confScore;

  const scores: RubricScores = {
    relevance: relevanceScore,
    clarity: clarityScore,
    communication: commScore,
    structure: structureScore,
    confidence: confScore,
    total: totalScore,
  };

  let grade: EvaluationResult['grade'] = 'Needs Improvement';
  if (totalScore >= 85) grade = 'Excellent';
  else if (totalScore >= 70) grade = 'Good';
  else if (totalScore >= 50) grade = 'Needs Improvement';
  else grade = 'Critical Focus';

  // Strengths
  const strengths: string[] = [];
  if (relevanceScore >= 20) strengths.push('Directly addressed the core themes of the interview question.');
  if (clarityScore >= 16) strengths.push('Clear articulation with minimal distracting filler words.');
  if (commScore >= 16) strengths.push('Professional vocabulary with coherent sentence transitions.');
  if (starCount >= 3) strengths.push('Well-structured narrative following the STAR (Situation-Task-Action-Result) pattern.');
  if (foundConfidencePhrases.length > 0) strengths.push(`Used decisive ownership phrasing ("${foundConfidencePhrases[0]}").`);
  if (strengths.length === 0) strengths.push('Demonstrated genuine effort to share personal experience.');

  // Weaknesses
  const weaknesses: string[] = [];
  if (foundFillers.length > 0) {
    weaknesses.push(`Frequent filler word usage detected: ${foundFillers.join(', ')}.`);
  }
  if (starCount < 2) {
    weaknesses.push('Lacked clear narrative structure; did not distinctly separate the Action taken from the Result.');
  }
  if (foundHesitationPhrases.length > 0) {
    weaknesses.push(`Tentative expressions used (${foundHesitationPhrases.join(', ')}), which weaken professional assertiveness.`);
  }
  if (wordCount < 40) {
    weaknesses.push('Response was somewhat brief; could provide richer technical or procedural context.');
  }
  if (weaknesses.length === 0) {
    weaknesses.push('Could further quantify results with specific percentages or timelines to make the impact unforgettable.');
  }

  // Suggested Improvements
  const suggestedImprovements: string[] = [
    'Replace conversational filler words with deliberate 1-second pauses.',
    'Quantify the outcome (e.g., "reduced latency by 30%", "managed a team of 4").',
    'Follow the STAR method: State the Situation, explain your exact Task, detail the Action you took, and conclude with the Result.',
  ];

  // Better sample answer & fresher answer
  const betterSampleAnswer = question ? question.sampleGoodAnswer : 'Here is an improved structure focusing on STAR.';
  const simpleFresherAnswer =
    'Start with: "In my college project/internship, I was responsible for [specific module]. I faced [specific problem], solved it by [specific action], and the outcome was [measurable result]." Keep sentences short and confident.';

  // Hindi explanation
  const hindiExplanation =
    totalScore >= 75
      ? 'आपका उत्तर बहुत अच्छा और पेशेवर था। आपने स्थिति को स्पष्ट रूप से समझाया। अधिक प्रभाव के लिए परिणामों में आंकड़े (numbers/percentages) जोड़ें।'
      : 'आपके उत्तर में मुख्य बात सही थी, लेकिन संरचना (structure) को बेहतर बनाया जा सकता है। "Basically" या "Like" जैसे शब्दों के बजाय शांत विराम लें और STAR तरीके का पालन करें।';

  // Actionable tip
  let actionableTip = 'Pause for 1 second before answering instead of using "Basically" or "Actually".';
  if (foundFillers.length > 0) {
    actionableTip = `Practice speaking without "${foundFillers[0].split(' ')[0]}". Use a deliberate silent breath instead.`;
  } else if (starCount < 2) {
    actionableTip = 'Always state the tangible outcome: end your answer with "As a result, we achieved..."';
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

