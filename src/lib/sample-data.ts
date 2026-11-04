import { InterviewSession, EvaluationResult } from '@/types';

export interface DemoSample {
  id: string;
  title: string;
  category: 'hr' | 'fresher' | 'internship' | 'technical' | 'behavioral' | 'communication';
  questionId: string;
  questionText: string;
  spokenHinglishInput: string;
  prismaTranscriptOutput: string;
  detectedLanguage: string;
  audioDurationSeconds: number;
  evaluation: EvaluationResult;
}

export const DEMO_SAMPLES: DemoSample[] = [
  {
    id: 'demo-hinglish-1',
    title: 'Hinglish Final Year Project Defense',
    category: 'fresher',
    questionId: 'fresher-1',
    questionText: 'Could you explain your major college project, your individual contribution, and the technology choices you made?',
    spokenHinglishInput:
      'Sir humara final year project KisanDirect portal tha. Basically farmers aur local mandi ko connect karne ke liye banaya tha. Mera role backend me Node js aur PostgreSQL handle karna tha. Starting me network issue hota tha gaon me, toh maine offline sync add kiya IndexedDB use karke.',
    prismaTranscriptOutput:
      'Sir humara final year project KisanDirect portal tha. Basically farmers aur local mandi ko connect karne ke liye banaya tha. Mera role backend me Node js aur PostgreSQL handle karna tha. Starting me network issue hota tha gaon me, toh maine offline sync add kiya IndexedDB use karke.',
    detectedLanguage: 'hi-IN (Code-mixed Hinglish)',
    audioDurationSeconds: 14.5,
    evaluation: {
      scores: {
        relevance: 22,
        clarity: 16,
        communication: 15,
        structure: 17,
        confidence: 12,
        total: 82,
      },
      overallScore: 82,
      grade: 'Good',
      strengths: [
        'Identified the core problem statement clearly (farmer-to-mandi digital connection).',
        'Demonstrated strong technical problem-solving by implementing offline-first sync with IndexedDB.',
        'Clear ownership of backend REST architecture and database management.',
      ],
      weaknesses: [
        'Used conversational Hinglish and filler words ("Basically", "Starting me").',
        'Could transition into fluent professional English to make a stronger impression on corporate interviewers.',
      ],
      missingPoints: [
        'Quantifiable impact (e.g. how many farmers or local buyers tested the portal).',
        'Testing methodologies or deployment infrastructure details.',
      ],
      suggestedImprovements: [
        'Replace "Basically farmers aur local mandi ko..." with "Our primary objective was establishing direct digital linkage between smallholder farmers and local mandis."',
        'Quantify results: mention test load, transaction volume, or response times.',
        'Use the STAR structure smoothly in English.',
      ],
      betterSampleAnswer:
        'For our capstone project, our team built "KisanDirect", a digital marketplace connecting regional farmers directly with local restaurant buyers. I served as the backend engineer, designing RESTful endpoints and schema in Node.js and PostgreSQL. Because rural sellers frequently face 2G/3G connectivity drops, I engineered an offline-first caching layer using service workers and IndexedDB, allowing farmers to queue listings offline until connectivity was restored. In testing with 40 local sellers, the platform cut middleman commission by 18%.',
      simpleFresherAnswer:
        'Our project was "KisanDirect", connecting farmers with restaurants. I handled the backend using Node.js and PostgreSQL. When we saw poor rural internet, I added offline sync using IndexedDB so data saved automatically. It was a great learning experience in real-world engineering.',
      hindiExplanation:
        'आपका तकनीकी समाधान बहुत प्रभावशाली था (IndexedDB का उपयोग)! बस साक्षात्कार के दौरान हिंग्लिश के स्थान पर सीधे अंग्रेजी वाक्यों का प्रयोग करें। अपनी भूमिका को "Mera role tha" के बजाय "I spearheaded the backend architecture" कहें।',
      actionableTip: 'Speak your improved answer out loud to build muscle memory for English technical phrasing.',
      fillerWordsFound: ['basically (1x)'],
      wordCount: 46,
      confidencePhrases: ['mera role backend me', 'maine offline sync add kiya'],
      hesitationPhrases: [],
    },
  },
  {
    id: 'demo-hinglish-2',
    title: 'Hinglish Behavioral: Overcoming a Blocker',
    category: 'behavioral',
    questionId: 'behav-1',
    questionText: 'Tell me about a time you failed or made a mistake on a project. Walk me through using Situation, Task, Action, and Result.',
    spokenHinglishInput:
      'College ke hackathon me maine bina testing ke production branch par merge push kar diya. Result ye hua ki demo ke time login page crash ho gaya. Phir maine turant git revert kiya aur rollback procedure document kiya.',
    prismaTranscriptOutput:
      'College ke hackathon me maine bina testing ke production branch par merge push kar diya. Result ye hua ki demo ke time login page crash ho gaya. Phir maine turant git revert kiya aur rollback procedure document kiya.',
    detectedLanguage: 'hi-IN (Hinglish)',
    audioDurationSeconds: 12.0,
    evaluation: {
      scores: {
        relevance: 23,
        clarity: 18,
        communication: 16,
        structure: 19,
        confidence: 13,
        total: 89,
      },
      overallScore: 89,
      grade: 'Excellent',
      strengths: [
        'Exemplary accountability: acknowledged the mistake candidly without blaming peers or circumstances.',
        'Followed the STAR method naturally from Situation (hackathon) to Result (documenting rollback procedures).',
        'Showed emotional composure and rapid remediation skills under pressure.',
      ],
      weaknesses: [
        'Could elaborate slightly on the automated tests or branch protections added to prevent future occurrences.',
      ],
      missingPoints: [
        'Specific branch protection rule or CI/CD check introduced.',
      ],
      suggestedImprovements: [
        'Mention adding GitHub branch protection rules requiring at least 1 pull request review before merging to main.',
        'State the recovery duration (e.g. "We rolled back in under 4 minutes").',
      ],
      betterSampleAnswer:
        'During our university hackathon finals, under deadline pressure, I pushed an unverified merge directly into our staging branch, which caused an authentication failure right before the judge’s demo. Instead of panicking or making excuses, I immediately took ownership, executed a clean git revert in under 3 minutes, and restored the service. Afterward, I configured branch protection rules requiring passing CI unit tests before any PR can merge. That experience taught me that speed must never compromise verification.',
      simpleFresherAnswer:
        'In a hackathon, I accidentally merged code without testing, which crashed the login screen. I immediately used git revert to restore the working version, and then set up a checklist so it wouldn’t happen again. I learned to always double-check before deploying.',
      hindiExplanation:
        'यह उत्तर बहुत शानदार है क्योंकि आपने अपनी गलती को बिना किसी बहाने के स्वीकार किया और समाधान पेश किया। साक्षात्कारकर्ता ऐसे ही जिम्मेदार इंजीनियरों को पसंद करते हैं।',
      actionableTip: 'Conclude with what you learned: "That mistake made me a much more disciplined engineer."',
      fillerWordsFound: [],
      wordCount: 35,
      confidencePhrases: ['maine turant git revert kiya', 'rollback procedure document kiya'],
      hesitationPhrases: [],
    },
  },
];

export const MOCK_PAST_SESSIONS: InterviewSession[] = [
  {
    id: 'session-demo-001',
    timestamp: Date.now() - 86400000 * 4, // 4 days ago
    category: 'fresher',
    questionId: 'fresher-1',
    questionText: 'Could you explain your major college project, your individual contribution, and the technology choices you made?',
    transcript: DEMO_SAMPLES[0].prismaTranscriptOutput,
    detectedLanguage: 'hi-IN (Hinglish)',
    evaluation: DEMO_SAMPLES[0].evaluation,
    isDemo: true,
  },
  {
    id: 'session-demo-002',
    timestamp: Date.now() - 86400000 * 2, // 2 days ago
    category: 'behavioral',
    questionId: 'behav-1',
    questionText: 'Tell me about a time you failed or made a mistake on a project. Walk me through using Situation, Task, Action, and Result.',
    transcript: DEMO_SAMPLES[1].prismaTranscriptOutput,
    detectedLanguage: 'hi-IN (Hinglish)',
    evaluation: DEMO_SAMPLES[1].evaluation,
    isDemo: true,
  },
];
