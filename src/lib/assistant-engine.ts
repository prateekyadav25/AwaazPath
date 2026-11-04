export interface AssistantResponse {
  content: string;
  hindiText?: string;
  category: 'explanation' | 'hinglish-conversion' | 'vocabulary' | 'structure' | 'general';
  suggestedFollowUps?: string[];
}

const HINDI_VOCABULARY_MAP: Record<string, { hindi: string; meaning: string; example: string }> = {
  bandwidth: {
    hindi: 'कार्यक्षमता / समय की उपलब्धता (Capacity/Time)',
    meaning: 'In corporate terms, "bandwidth" means having the time or mental capacity to take on new tasks.',
    example: '"I currently do not have the bandwidth for another project this week."',
  },
  idempotent: {
    hindi: 'समान परिणाम देने वाली प्रक्रिया (Idempotency)',
    meaning: 'An API operation that produces the same server state whether executed once or many times (e.g. GET or PUT).',
    example: '"The payment retry endpoint must be idempotent to prevent double billing."',
  },
  scalability: {
    hindi: 'पैमाने पर बढ़ने की क्षमता (Scalability)',
    meaning: 'The ability of a system to handle increasing amounts of traffic or data smoothly.',
    example: '"We chose PostgreSQL because of its high transaction scalability."',
  },
  bottleneck: {
    hindi: 'रुकावट या अवरोध (Constraint / Slow point)',
    meaning: 'A component or process that limits the overall throughput or speed of a system.',
    example: '"Database query latency was the primary bottleneck in our application."',
  },
  leverage: {
    hindi: 'फायदा उठाना या प्रभावी उपयोग करना (To utilize to maximum advantage)',
    meaning: 'To use something to maximum advantage.',
    example: '"We can leverage Gnani AI Prisma STT to transcribe regional accents accurately."',
  },
  deliverable: {
    hindi: 'सौंपे जाने योग्य कार्य (Final outcome or product)',
    meaning: 'A tangible work product or milestone due for delivery.',
    example: '"Our primary deliverable for sprint 4 is the authentication microservice."',
  },
  stakeholder: {
    hindi: 'हितधारक / संबंधित पक्ष (Interested party)',
    meaning: 'Anyone who has an interest or stake in the success of a project (clients, managers, users).',
    example: '"We presented the weekly progress report to project stakeholders."',
  },
  tradeoff: {
    hindi: 'सौदा / एक लाभ के लिए दूसरे का त्याग (Compromise / Balancing)',
    meaning: 'A situation that involves losing one quality or aspect of something in return for gaining another.',
    example: '"Choosing NoSQL was a tradeoff between schema flexibility and ACID consistency."',
  },
};

export function processAssistantQuery(query: string): AssistantResponse {
  const lower = query.toLowerCase().trim();

  // Check 1: Vocabulary explanation request (e.g. "What does bandwidth mean?", "explain tradeoff in hindi")
  for (const [term, data] of Object.entries(HINDI_VOCABULARY_MAP)) {
    if (lower.includes(term)) {
      return {
        category: 'vocabulary',
        content: `**"${term.toUpperCase()}"** in corporate software engineering means: ${data.meaning}\n\n**Example in an interview:**\n${data.example}`,
        hindiText: `**हिंदी में अर्थ:** ${data.hindi}\n\n**साक्षात्कार टिप:** इस शब्द का उपयोग करके आप अपनी पेशेवर शब्दावली (vocabulary) को मजबूत बना सकते हैं।`,
        suggestedFollowUps: [
          'Can you explain "tradeoff"?',
          'How do I use "scalability" in an interview?',
          'How do I explain my college project in English?',
        ],
      };
    }
  }

  // Check 2: Hinglish conversion request (e.g. "Convert this to English", "Maine ye banaya tha...")
  if (
    lower.startsWith('convert') ||
    lower.startsWith('translate') ||
    lower.includes('hinglish') ||
    lower.includes('maine') ||
    lower.includes('mera') ||
    lower.includes('humne') ||
    lower.includes('kaise bole')
  ) {
    const rawInput = query
      .replace(/^(convert|translate|how to say|kaise bole|in english)[:\s]*/i, '')
      .trim();

    return {
      category: 'hinglish-conversion',
      content: `Here are two polished ways to express your thought professionally in an interview:\n\n**Option 1 (Direct & Confident):**\n"During my academic project, I spearheaded the development of this module, addressing key technical bottlenecks and ensuring timely delivery."\n\n**Option 2 (STAR format):**\n"Our team was tasked with improving application speed. I focused on optimizing database queries, which directly improved response times by 35%."`,
      hindiText: `**हिंदी सलाह:** अपनी बात को सरल Subject-Verb-Object क्रम में रखें। "Maine kiya" को "I spearheaded" या "I took ownership of" के रूप में व्यक्त करना अधिक प्रभावी होता है।`,
      suggestedFollowUps: [
        'How do I explain my strengths in professional English?',
        'Convert: "Mujhe team me kaam karna accha lagta hai"',
        'How to explain why I have an academic gap?',
      ],
    };
  }

  // Check 3: STAR framework structuring
  if (lower.includes('star') || lower.includes('structure') || lower.includes('frame') || lower.includes('format')) {
    return {
      category: 'structure',
      content: `The **STAR Method** is the gold standard for behavioral and technical interviews:\n\n1. **S - Situation:** Set the scene (e.g., "During our final semester capstone project...")\n2. **T - Task:** State your specific responsibility (e.g., "I was tasked with integrating the payment gateway...")\n3. **A - Action:** Describe the specific technical or collaborative steps *you* took (e.g., "I designed idempotent webhooks and wrote unit tests...")\n4. **R - Result:** Highlight the measurable outcome and what you learned (e.g., "As a result, we processed 500 test transactions with zero dropped requests.")`,
      hindiText: `**हिंदी सारांश:** STAR विधि आपके उत्तर को व्यवस्थित (structured) रखती है ताकि साक्षात्कारकर्ता भ्रमित न हो। हमेशा 'Result' में आंकड़े या सीख अवश्य बताएं।`,
      suggestedFollowUps: [
        'Give me a STAR example for a challenging bug',
        'How to use STAR for a team conflict question?',
        'What should I say when I don’t know an answer?',
      ],
    };
  }

  // Check 4: Explaining "Tell me about yourself"
  if (lower.includes('tell me about yourself') || lower.includes('introduce') || lower.includes('intro')) {
    return {
      category: 'explanation',
      content: `Here is the winning 3-part formula for **"Tell me about yourself"** for Indian college freshers:\n\n1. **Present (30s):** Name, degree, college, and your primary technical focus (e.g., B.Tech CS, full-stack web dev).\n2. **Past (40s):** Highlight your proudest project or internship contribution with tangible metrics.\n3. **Future (20s):** Why this role and company excite you right now.\n\n*Pro-tip:* Never list your high school marks, parents' occupations, or generic hobbies unless directly asked!`,
      hindiText: `**हिंदी टिप:** हमेशा अपने प्रोजेक्ट और कौशलों से शुरुआत करें। पारिवारिक विवरण या स्कूल के अंकों पर समय व्यर्थ न करें। साक्षात्कारकर्ता केवल आपकी तकनीकी क्षमता और उत्साह देखना चाहता है।`,
      suggestedFollowUps: [
        'How do I answer: What are your weaknesses?',
        'How to explain low CGPA?',
        'How to explain my final year project?',
      ],
    };
  }

  // Default response
  return {
    category: 'general',
    content: `I am your **AwaazPath Multilingual Career Coach**! Here is how I can help you ace your interviews:\n\n- 🗣️ **Hinglish to English:** Tell me what you want to say in Hindi or Hinglish, and I will format it into crisp professional English.\n- 📖 **Vocabulary Coach:** Ask me to explain difficult corporate jargon (like *idempotent*, *bandwidth*, *scalability*) in simple Hindi.\n- 📐 **STAR Structuring:** Share a rough story and I'll structure it into Situation, Task, Action, and Result.\n- 🎙️ **Voice First:** You can use the microphone button to practice speaking naturally!`,
    hindiText: `आप मुझसे हिंदी, अंग्रेजी या हिंग्लिश में कोई भी सवाल पूछ सकते हैं। मैं आपको इंटरव्यू के लिए सबसे सटीक मार्गदर्शन दूंगा।`,
    suggestedFollowUps: [
      'Explain "bandwidth" in Hindi',
      'How to structure an answer using STAR?',
      'How do I explain my final year project?',
      'Convert: "Maine project time par submit kar diya tha"',
    ],
  };
}
