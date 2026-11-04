import { InterviewQuestion } from '@/types';

export const QUESTIONS: InterviewQuestion[] = [
  // ==========================================
  // HR INTERVIEW (10 Questions)
  // ==========================================
  {
    id: 'hr-1',
    category: 'hr',
    title: 'Tell me about yourself',
    questionText: 'Can you please introduce yourself and walk me through your background and journey?',
    questionHindi: 'कृपया अपना परिचय दें और अपनी शैक्षणिक पृष्ठभूमि और रुचियों के बारे में बताएं।',
    context: 'The most common opening question in Indian campus and HR interviews. Sets the tone for the entire interview.',
    difficulty: 'Beginner',
    keyPoints: [
      'Brief academic background and college details',
      'Key technical or professional interests and projects',
      'Achievements or leadership experiences',
      'Why you are passionate about this specific role',
    ],
    sampleGoodAnswer:
      'Good morning. My name is Rahul Sharma, and I am currently completing my B.Tech in Computer Science from Government Engineering College, Jabalpur. Throughout college, I developed a strong interest in full-stack web development and problem solving. For my final year project, I built an automated attendance tracking platform using React and Node.js that is currently used by two departments in our college. Beyond academics, I was the technical coordinator for our annual college fest, where I managed a team of 15 student volunteers. I am eager to start my career with a forward-thinking company where I can apply my development skills and continue learning from senior engineers.',
    sampleWeakAnswer:
      'Myself Rahul from Jabalpur. My father is a teacher and mother is a housewife. I completed schooling from MP board with 85% and now doing BTech. My hobbies are playing cricket and listening to music. I want this job because I need experience.',
  },
  {
    id: 'hr-2',
    category: 'hr',
    title: 'Greatest Strengths & Weakness',
    questionText: 'What do you consider your greatest strength, and what is one area you are actively working to improve?',
    questionHindi: 'आपकी सबसे बड़ी ताकत क्या है और ऐसी कौन सी कमजोरी है जिसे आप सुधारने का प्रयास कर रहे हैं?',
    context: 'Tests self-awareness, authenticity, and whether you take proactive steps toward personal growth.',
    difficulty: 'Beginner',
    keyPoints: [
      'A strength supported by a real college or project example',
      'A genuine weakness that is not a disguised virtue',
      'Specific steps taken to overcome the weakness',
      'Demonstrated improvement and self-discipline',
    ],
    sampleGoodAnswer:
      'My greatest strength is my persistence in debugging and learning new tools independently. When building my internship project, we faced critical latency issues with our database queries. I spent three days researching indexing techniques and reduced query time by 40%. On the other hand, an area I am actively improving is public speaking and presenting in English. Coming from a Hindi-medium school, I initially felt self-conscious speaking in front of large crowds. Over the past year, I joined our college debate club, gave four technical seminars, and actively practice daily. I now feel much more confident expressing my ideas in team discussions.',
    sampleWeakAnswer:
      'My strength is that I am a perfectionist and work too hard. My weakness is that I trust people too easily and cannot say no to anyone.',
  },
  {
    id: 'hr-3',
    category: 'hr',
    title: 'Why do you want to join our company?',
    questionText: 'Why are you specifically interested in working with our organization rather than other companies?',
    questionHindi: 'आप अन्य कंपनियों की तुलना में हमारे संगठन में काम करने के लिए विशेष रूप से क्यों इच्छुक हैं?',
    context: 'Checks whether the candidate researched the company or is applying blindly to campus drives.',
    difficulty: 'Intermediate',
    keyPoints: [
      'Knowledge of company products, engineering culture, or recent achievements',
      'Alignment of company mission with personal career goals',
      'Specific skills you want to contribute to their team',
    ],
    sampleGoodAnswer:
      'I have followed your company’s engineering blog, particularly your recent work on high-scale distributed systems and multilingual AI services. As a fresher, what attracts me most is your culture of mentorship and the opportunity to work directly on products used by millions of Indian users. My background in JavaScript and backend APIs aligns well with your platform stack, and I want to contribute to scalable solutions while learning best engineering practices.',
    sampleWeakAnswer:
      'Your company is very reputed MNC and gives good salary package and job security. My friends and seniors also told me to apply here.',
  },
  {
    id: 'hr-4',
    category: 'hr',
    title: 'Where do you see yourself in 3 to 5 years?',
    questionText: 'Where do you see your career progressing over the next 3 to 5 years?',
    questionHindi: 'अगले 3 से 5 वर्षों में आप अपने करियर को किस दिशा में आगे बढ़ते हुए देखते हैं?',
    context: 'Measures career commitment, ambition, and realistic goal setting.',
    difficulty: 'Intermediate',
    keyPoints: [
      'Mastery of core technical skills in first 1-2 years',
      'Taking ownership of modules or customer-facing features',
      'Mentoring junior team members and contributing to architecture',
    ],
    sampleGoodAnswer:
      'In the first 1 to 2 years, my goal is to master the company’s tech stack, deliver reliable code, and understand the business domain thoroughly. Over the 3 to 5 year horizon, I aim to take end-to-end ownership of complex product modules, participate in system design decisions, and mentor incoming freshers just as senior engineers will mentor me when I join.',
    sampleWeakAnswer:
      'In 5 years I want to become a project manager or CEO of a startup, or maybe go abroad for MS if I get good GRE score.',
  },
  {
    id: 'hr-5',
    category: 'hr',
    title: 'Handling Tight Deadlines',
    questionText: 'Describe a situation during your college or internship when you had multiple pressing deadlines. How did you manage?',
    questionHindi: 'कॉलेज या प्रोजेक्ट के दौरान जब आपके पास एक साथ कई समय-सीमाएं (deadlines) थीं, तो आपने उन्हें कैसे प्रबंधित किया?',
    context: 'Tests time management, prioritization, and composure under pressure.',
    difficulty: 'Intermediate',
    keyPoints: [
      'Situation with competing priorities (e.g., exams and project submission)',
      'Methodology used (task breakdown, prioritization, communication)',
      'Final positive outcome achieved',
    ],
    sampleGoodAnswer:
      'During my 6th semester, our university mid-term exams overlapped directly with the hackathon submission deadline where our team had reached the finals. To handle this without burnout, I created a priority matrix. I allocated morning hours strictly to exam revision and scheduled 3-hour evening sprints for hackathon coding. We also divided the hackathon tasks clearly among the four team members. As a result, I scored an 8.6 GPA in my exams and our team secured 2nd place in the hackathon.',
    sampleWeakAnswer:
      'It was very stressful and I did not sleep for two days. Somehow we managed at the last minute and submitted 5 minutes before deadline.',
  },
  {
    id: 'hr-6',
    category: 'hr',
    title: 'Handling Disagreements with Team Members',
    questionText: 'Have you ever had a disagreement with a project teammate? How did you resolve it?',
    questionHindi: 'क्या आपका कभी किसी प्रोजेक्ट टीम के साथी के साथ मतभेद हुआ है? आपने इसे कैसे सुलझाया?',
    context: 'Assesses interpersonal maturity, listening skills, and professional conflict resolution.',
    difficulty: 'Intermediate',
    keyPoints: [
      'Objective nature of the disagreement (technical or structural)',
      'Active listening and respectful discussion',
      'Data-driven or user-centric compromise',
    ],
    sampleGoodAnswer:
      'During our capstone project, my teammate wanted to use MongoDB while I advocated for PostgreSQL because our schema had strict relational constraints between students, courses, and fee records. Instead of arguing opinion against opinion, we created a small benchmark test with 1,000 mock transactional records. Seeing the referential integrity requirements and query benchmarks, we mutually agreed PostgreSQL was the safer choice. We completed the project ahead of schedule and our relationship remained collaborative and friendly.',
    sampleWeakAnswer:
      'My teammate was stubborn and not listening to me. So I complained to our project guide professor who told him to follow my instructions.',
  },
  {
    id: 'hr-7',
    category: 'hr',
    title: 'Willingness to Relocate / Shift Hours',
    questionText: 'Are you open to relocating to cities like Bangalore, Pune, or Hyderabad, and are you comfortable with flexible working hours?',
    questionHindi: 'क्या आप बेंगलुरु, पुणे या हैदराबाद जैसे शहरों में स्थानांतरित होने के लिए तैयार हैं, और क्या आप लचीले समय के साथ सहज हैं?',
    context: 'Standard check for mobility and workplace flexibility in Indian IT companies.',
    difficulty: 'Beginner',
    keyPoints: [
      'Clear, positive affirmation of relocation',
      'Excitement about experiencing new tech hubs',
      'Understanding of project delivery cycles',
    ],
    sampleGoodAnswer:
      'Yes, absolutely. I am fully prepared and enthusiastic about relocating to Bengaluru, Pune, Hyderabad, or whichever base location the business requires. Experiencing a vibrant tech ecosystem and working closely alongside senior colleagues is something I look forward to. I also understand that during deployment cycles or critical sprint deliveries, flexible working hours are necessary to ensure client success.',
    sampleWeakAnswer:
      'Sir actually my parents prefer if I stay near my hometown, but if no other option then I will come for some months.',
  },
  {
    id: 'hr-8',
    category: 'hr',
    title: 'What motivates you to do your best work?',
    questionText: 'What drives or inspires you to give your best effort every day?',
    questionHindi: 'हर दिन अपना सर्वश्रेष्ठ प्रदर्शन करने के लिए आपको क्या प्रेरित करता है?',
    context: 'Examines internal versus external motivation.',
    difficulty: 'Beginner',
    keyPoints: [
      'Joy of solving tangible problems',
      'Creating impact for real end users',
      'Continuous personal improvement and mastery',
    ],
    sampleGoodAnswer:
      'What motivates me most is seeing software solve real, everyday problems for people who are not tech-savvy. When we deployed our college complaint portal and our hostel staff could resolve electrical issues in 2 hours instead of 3 days, seeing their genuine relief gave me immense satisfaction. Knowing that the code I write makes someone’s day easier or more productive drives me to write clean, reliable software.',
    sampleWeakAnswer:
      'Good appraisal, high salary, and getting on-site opportunity to go to USA or Europe motivates me.',
  },
  {
    id: 'hr-9',
    category: 'hr',
    title: 'Dealing with Negative Feedback',
    questionText: 'Tell me about a time you received critical feedback on your work. How did you react?',
    questionHindi: 'उस समय के बारे में बताएं जब आपको अपने काम पर आलोचनात्मक प्रतिक्रिया मिली थी। आपने क्या प्रतिक्रिया दी?',
    context: 'Measures receptiveness to coaching, emotional resilience, and growth mindset.',
    difficulty: 'Intermediate',
    keyPoints: [
      'Listening without defensive reaction',
      'Validating the feedback objectively',
      'Concrete corrective action taken',
    ],
    sampleGoodAnswer:
      'During my 3rd year code review, my mentor pointed out that although my frontend logic worked, my components were tightly coupled, making them unreadable and difficult to test. Initially, I felt a bit disappointed, but I quickly realized his critique was spot on. I requested him for recommended reading, studied clean component design patterns, and spent the weekend refactoring the entire module. In the next review, he complimented the cleaner modular structure.',
    sampleWeakAnswer:
      'I don’t usually get negative feedback because I double check everything. Once a teacher gave low marks unfairly so I had to explain that my answer was actually correct.',
  },
  {
    id: 'hr-10',
    category: 'hr',
    title: 'Do you have any questions for us?',
    questionText: 'That covers most of our questions. Do you have any questions for me about the role or company?',
    questionHindi: 'यह हमारे अधिकांश प्रश्नों को पूरा करता है। क्या आपके पास भूमिका या कंपनी के बारे में मेरे लिए कोई प्रश्न है?',
    context: 'A golden opportunity to show genuine intellectual curiosity and engagement.',
    difficulty: 'Beginner',
    keyPoints: [
      'Inquiring about engineering onboarding and mentorship for freshers',
      'Asking about upcoming technical initiatives in the team',
      'Demonstrating genuine interest in the team culture',
    ],
    sampleGoodAnswer:
      'Thank you for asking! I would love to learn more about how your team supports fresh graduates during their first 90 days. For instance, is there a formal buddy mentorship system? Additionally, what technical challenges or architectural migrations is the team currently most excited about tackling this year?',
    sampleWeakAnswer:
      'No sir, everything is clear. What will be the exact in-hand salary and how many casual leaves do freshers get?',
  },

  // ==========================================
  // FRESHER PLACEMENT INTERVIEW (10 Questions)
  // ==========================================
  {
    id: 'fresher-1',
    category: 'fresher',
    title: 'Walk me through your Final Year Project',
    questionText: 'Could you explain your major college project, your individual contribution, and the technology choices you made?',
    questionHindi: 'क्या आप अपने कॉलेज के प्रमुख प्रोजेक्ट, अपने व्यक्तिगत योगदान और आपके द्वारा चुनी गई तकनीकों को समझा सकते हैं?',
    context: 'The centerpiece of every campus placement interview for engineering students in India.',
    difficulty: 'Intermediate',
    keyPoints: [
      'Problem statement and who benefits',
      'Architecture overview and tech stack rationale',
      'Your exact individual contribution vs team contribution',
      'Key technical hurdles faced and resolved',
    ],
    sampleGoodAnswer:
      'For our major project, our four-member team built "KisanDirect", a digital marketplace connecting smallholder vegetable farmers in Madhya Pradesh directly with local restaurants. I was responsible for the backend REST APIs and database schema using Node.js, Express, and PostgreSQL. One major challenge was poor network connectivity in rural mandis. To address this, I implemented an offline-first sync mechanism using service workers and IndexedDB on the client side, which synced pending listings whenever a 3G/4G connection was restored. This taught me how to design resilient architectures for real Indian infrastructure conditions.',
    sampleWeakAnswer:
      'Our project was an e-commerce website using Python and MySQL. My team members did the frontend and I helped in testing and documentation. It was a very good project and college gave us A grade.',
  },
  {
    id: 'fresher-2',
    category: 'fresher',
    title: 'Transition from College to Corporate',
    questionText: 'How are you preparing yourself for the transition from an academic college environment to a professional software engineering workplace?',
    questionHindi: 'आप एक शैक्षणिक कॉलेज परिवेश से एक पेशेवर सॉफ्टवेयर इंजीनियरिंग कार्यस्थल में संक्रमण के लिए खुद को कैसे तैयार कर रहे हैं?',
    context: 'Assesses professional maturity and understanding of workplace standards.',
    difficulty: 'Beginner',
    keyPoints: [
      'Understanding differences: deadlines, code reviews, collaboration, accountability',
      'Independent habits built (Git workflows, clean code, unit testing)',
      'Enthusiasm for team communication and ownership',
    ],
    sampleGoodAnswer:
      'In college, a program is considered complete once it passes the test cases in an assignment. But in industry, code quality, readability, security, automated tests, and documentation are equally vital. To prepare, I started adopting industry workflows early: writing meaningful Git commit messages, using pull requests even on personal projects, and following linting rules. I also focus on proactive communication—asking structured questions early rather than waiting until deadlines.',
    sampleWeakAnswer:
      'I am ready to work hard. In college we used to study only during exam times, but in corporate I know we have to work 8 hours daily from 9 to 6.',
  },
  {
    id: 'fresher-3',
    category: 'fresher',
    title: 'Explain OOP Concepts to a Non-Technical Person',
    questionText: 'How would you explain the four pillars of Object-Oriented Programming (OOP) to a non-technical person?',
    questionHindi: 'आप ऑब्जेक्ट-ओरिएंटेड प्रोग्रामिंग (OOP) के चार स्तंभों को किसी गैर-तकनीकी व्यक्ति को कैसे समझाएंगे?',
    context: 'Tests deep conceptual grasp and ability to articulate complex tech simply.',
    difficulty: 'Intermediate',
    keyPoints: [
      'Encapsulation (e.g., medicine capsule hiding internal chemicals)',
      'Abstraction (e.g., driving a car with steering/pedals without knowing engine mechanics)',
      'Inheritance (e.g., child inheriting physical traits from parents)',
      'Polymorphism (e.g., a person behaving as a son at home, a student in college, a passenger in a bus)',
    ],
    sampleGoodAnswer:
      'I love using real-life analogies for OOP. Think of driving a car: Abstraction is the steering wheel and brake pedal; you drive comfortably without needing to know internal fuel combustion. Encapsulation is the engine cover and dashboard that keeps fragile wiring safe from unauthorized tampering. Inheritance is how an Electric Car inherits fundamental vehicle properties like wheels and brakes from a base Vehicle blueprint while adding battery features. And Polymorphism is like pressing a generic start button: on a petrol car it cranks the motor, but on an electric car it silently activates the battery circuit.',
    sampleWeakAnswer:
      'OOP has four pillars: Encapsulation is wrapping data and methods. Abstraction is hiding details. Inheritance is parent child class. Polymorphism is many forms like method overloading and overriding.',
  },
  {
    id: 'fresher-4',
    category: 'fresher',
    title: 'How do you keep up with changing technology?',
    questionText: 'The tech industry evolves rapidly. What specific habits or resources do you use to learn new technologies outside your syllabus?',
    questionHindi: 'तकनीकी उद्योग तेजी से विकसित हो रहा है। आप अपने पाठ्यक्रम से बाहर नई तकनीकों को सीखने के लिए किन संसाधनों का उपयोग करते हैं?',
    context: 'Distinguishes proactive lifelong learners from syllabus-bound students.',
    difficulty: 'Beginner',
    keyPoints: [
      'Reputable dev publications, blogs, and podcasts',
      'Building hands-on side projects rather than just watching tutorials',
      'Open-source exploration or GitHub following',
    ],
    sampleGoodAnswer:
      'I rely on a habit of "learn by building". Whenever a new concept catches my attention, like serverless functions or Next.js App Router, I don’t just watch video tutorials. I immediately build a weekend micro-project with it. Additionally, I read official documentation, follow engineering blogs like Uber and Netflix Tech Blogs, and subscribe to newsletters like ByteByteGo for system design concepts.',
    sampleWeakAnswer:
      'I watch YouTube videos when exams are near, and sometimes I scroll LinkedIn and Instagram tech reels to see what is trending.',
  },
  {
    id: 'fresher-5',
    category: 'fresher',
    title: 'Academic Gap or Low CGPA Explanation',
    questionText: 'If asked about a drop year, semester backlog, or average CGPA, how would you address it honestly and constructively?',
    questionHindi: 'यदि आपसे किसी ड्रॉप वर्ष, बैकलॉग या औसत सीजीपीए के बारे में पूछा जाए, तो आप इसे ईमानदारी से कैसे संबोधित करेंगे?',
    context: 'Crucial for Tier 2/3 students who often face CGPA hurdles or drop years during JEE preparation.',
    difficulty: 'Intermediate',
    keyPoints: [
      'Honest acceptance without blaming professors or circumstances',
      'What you learned from the experience',
      'How you rebounded with strong practical projects or improved grades',
    ],
    sampleGoodAnswer:
      'In my first year, I struggled to adapt to university-level mathematics and scored a 6.8 CGPA. I realized my high school study habits were passive. I restructured my schedule, formed peer study groups, and started applying theoretical concepts directly to coding problems. From the third semester onwards, my semester GPA stayed consistently above 8.2, and I built two production-grade applications. That initial setback taught me resilience and discipline.',
    sampleWeakAnswer:
      'The university evaluation in our state is very strict and professors give marks based on handwriting. That is why my CGPA is low.',
  },
  {
    id: 'fresher-6',
    category: 'fresher',
    title: 'Favorite Subject and Why',
    questionText: 'Which computer science subject did you enjoy the most during your degree, and what real-world concept fascinated you?',
    questionHindi: 'अपनी डिग्री के दौरान आपको कंप्यूटर साइंस का कौन सा विषय सबसे अधिक पसंद आया, और किस अवधारणा ने आपको आकर्षित किया?',
    context: 'Evaluates academic passion and depth of understanding beyond rote memorization.',
    difficulty: 'Beginner',
    keyPoints: [
      'Clear subject selection (e.g., DBMS, Operating Systems, Computer Networks)',
      'Deep conceptual topic (e.g., ACID properties, indexing, process scheduling)',
      'Connection to real-world software architecture',
    ],
    sampleGoodAnswer:
      'My favorite subject was Database Management Systems. What fascinated me most were ACID properties and B-Tree indexing. Learning how relational databases guarantee transactional consistency even in the event of sudden server power failure made me appreciate the incredible engineering behind modern banking systems. It inspired me to dive deeper into indexing strategies when optimizing my own web project.',
    sampleWeakAnswer:
      'I liked web technologies because it is easy and we can see colorful design on screen without complex mathematical algorithms.',
  },
  {
    id: 'fresher-7',
    category: 'fresher',
    title: 'Overcoming Resource Constraints in College',
    questionText: 'Students from regional colleges often face limited campus lab facilities or training. How did you overcome these challenges to build your skills?',
    questionHindi: 'क्षेत्रीय कॉलेजों के छात्रों को अक्सर सीमित लैब सुविधाओं का सामना करना पड़ता है। अपने कौशल को विकसित करने के लिए आपने इन चुनौतियों को कैसे पार किया?',
    context: 'Directly tailored to empower Tier 2 & Tier 3 students to showcase resourcefulness.',
    difficulty: 'Intermediate',
    keyPoints: [
      'Resourcefulness in utilizing open-source software and free cloud tiers',
      'Self-driven community learning (virtual hackathons, Discord communities)',
      'Turning constraints into strengths of grit and adaptability',
    ],
    sampleGoodAnswer:
      'While our college lab had older hardware and limited software licenses, I viewed it as an opportunity to be resourceful. I installed Linux on my personal laptop, utilized free developer tiers on platforms like GitHub, Vercel, and Supabase, and studied high-quality open-access courseware from MIT OpenCourseWare and NPTEL. I also participated in virtual national hackathons, which connected me with peers across India and raised my coding standards to industry levels.',
    sampleWeakAnswer:
      'Our college did not provide good teachers or campus training, so we could not learn advanced things until final year.',
  },
  {
    id: 'fresher-8',
    category: 'fresher',
    title: 'Importance of Unit Testing & Clean Code',
    questionText: 'Why is writing unit tests and following clean code principles important, even for small applications?',
    questionHindi: 'छोटे प्रोजेक्ट्स के लिए भी यूनिट टेस्ट लिखना और साफ-सुथरा कोड लिखना क्यों महत्वपूर्ण है?',
    context: 'Assesses whether the candidate thinks like an engineer or a casual student script-writer.',
    difficulty: 'Intermediate',
    keyPoints: [
      'Prevention of regressions when refactoring',
      'Self-documenting nature of clean code and meaningful variable names',
      'Long-term maintenance savings vs short-term typing shortcuts',
    ],
    sampleGoodAnswer:
      'Clean code is written for humans to read first, and machines to execute second. As Uncle Bob Martin noted, we spend 10 times more time reading existing code than writing new code. Meaningful naming and modular functions reduce cognitive load. Unit tests act as an executable safety net; they allow us to refactor algorithms or upgrade dependencies with confidence that existing business logic will not break unexpectedly in production.',
    sampleWeakAnswer:
      'Unit testing takes too much time and in college we test by manually clicking buttons in the browser. If output is coming correct, testing is done.',
  },
  {
    id: 'fresher-9',
    category: 'fresher',
    title: 'Handling a Task You Have Never Done Before',
    questionText: 'Suppose your manager assigns you a feature in a framework you have never worked with. How would you approach your first 48 hours?',
    questionHindi: 'मान लीजिए कि आपके मैनेजर ने आपको ऐसे फ्रेमवर्क में टास्क दिया है जिस पर आपने पहले कभी काम नहीं किया। आप अपने पहले 48 घंटों में कैसे आगे बढ़ेंगे?',
    context: 'Measures learning agility, problem decomposition, and systematic problem solving.',
    difficulty: 'Intermediate',
    keyPoints: [
      'Reading quickstart docs and building a minimal proof-of-concept',
      'Inspecting existing repository codebase for patterns and conventions',
      'Setting milestone checkpoints and asking structured questions when stuck',
    ],
    sampleGoodAnswer:
      'In the first few hours, I would start with the framework’s official documentation "Getting Started" guide to understand its mental model, lifecycle, and terminology. Next, I would examine existing pull requests in our company repository to see how senior developers structure their code and handle errors in this framework. Then, I would build a tiny throwaway prototype validating the assigned feature. If blocked for more than 45 minutes on a specific hurdle, I would prepare a concise question detailing what I tried and consult a senior colleague.',
    sampleWeakAnswer:
      'I will search for ready-made source code on GitHub or ask ChatGPT to generate the entire code and paste it into our project.',
  },
  {
    id: 'fresher-10',
    category: 'fresher',
    title: 'Campus Leadership or Extracurricular Impact',
    questionText: 'Can you share an experience outside the classroom where you took initiative or led a project or event?',
    questionHindi: 'क्या आप कक्षा से बाहर का कोई अनुभव साझा कर सकते हैं जहाँ आपने पहल की हो या किसी कार्यक्रम का नेतृत्व किया हो?',
    context: 'Evaluates leadership, teamwork, initiative, and social competence.',
    difficulty: 'Beginner',
    keyPoints: [
      'Event or initiative organized (technical club, blood donation camp, sports, coding workshop)',
      'Operational challenges faced (budget, attendance, team conflicts)',
      'Measurable outcome and personal growth',
    ],
    sampleGoodAnswer:
      'In my pre-final year, I noticed that junior students were intimidated by Git and version control. I organized a hands-on weekend workshop titled "Git From Scratch". I designed interactive 2-hour exercises, coordinated with the department for lab access, and mentored 45 first-year students. By the end of the workshop, every participant had created a GitHub repository and submitted their first pull request. It strengthened my communication skills and taught me how rewarding mentorship can be.',
    sampleWeakAnswer:
      'I was a member of our college cultural committee. I helped in decorating the stage and distributing food packets during the annual function.',
  },

  // ==========================================
  // INTERNSHIP INTERVIEW (10 Questions)
  // ==========================================
  {
    id: 'intern-1',
    category: 'internship',
    title: 'Why are you seeking an internship right now?',
    questionText: 'What are your primary goals for this internship, and what kind of real-world exposure are you hoping to gain?',
    questionHindi: 'इस इंटर्नशिप के लिए आपके मुख्य लक्ष्य क्या हैं, और आप किस प्रकार का वास्तविक अनुभव प्राप्त करने की उम्मीद कर रहे हैं?',
    context: 'Checks intentionality, curiosity, and eagerness to contribute beyond academic credits.',
    difficulty: 'Beginner',
    keyPoints: [
      'Bridging classroom theory with production engineering practices',
      'Learning collaborative workflows like PR reviews and CI/CD pipelines',
      'Desire to add measurable value to an active sprint team',
    ],
    sampleGoodAnswer:
      'My goal for this internship is to bridge the gap between building isolated academic projects and delivering production software in a collaborative engineering team. I want to experience how real software is reviewed, tested, deployed, and monitored under scale. I am looking forward to receiving direct code review feedback from seasoned engineers, which I believe is the fastest catalyst for technical growth.',
    sampleWeakAnswer:
      'My college semester requires compulsory 8-week internship certificate for degree completion, and I also want to earn stipend.',
  },
  {
    id: 'intern-2',
    category: 'internship',
    title: 'Describe a challenging bug you debugged',
    questionText: 'Tell me about the most stubborn bug you encountered in any of your personal or academic projects. How did you diagnose and solve it?',
    questionHindi: 'अपने किसी प्रोजेक्ट के दौरान सामने आए सबसे कठिन बग के बारे में बताएं। आपने इसका निदान और समाधान कैसे किया?',
    context: 'Reveals analytical debugging methodology and persistence.',
    difficulty: 'Intermediate',
    keyPoints: [
      'Symptom of the bug (e.g., race condition, memory leak, state inconsistency)',
      'Systematic isolation using logs, debugger, or binary search debugging',
      'Root cause discovery and long-term fix with regression prevention',
    ],
    sampleGoodAnswer:
      'While building a real-time collaborative quiz app, users reported that their score sometimes reset to zero after refreshing the page, but only on intermittent occasions. Instead of guessing, I reproduced the bug in a local test script. Inspecting network logs, I discovered a race condition: the component was requesting user profile state before the authentication JWT was verified in local storage, causing an unauthenticated default state to overwrite the database record. I fixed it by enforcing a loading boundary and making the score sync API idempotent. That experience taught me the critical importance of lifecycle synchronization in asynchronous web apps.',
    sampleWeakAnswer:
      'There was an error in my code and screen became blank. I spent the whole night searching Google, then I copied a stack overflow solution and restarted the server and it worked.',
  },
  {
    id: 'intern-3',
    category: 'internship',
    title: 'How do you prioritize when feeling overwhelmed?',
    questionText: 'As an intern, you might receive multiple tasks from mentors simultaneously. How do you handle feeling overwhelmed?',
    questionHindi: 'एक इंटर्न के रूप में, आपको एक साथ कई कार्य मिल सकते हैं। जब आप अभिभूत महसूस करते हैं तो आप प्राथमिकताओं को कैसे तय करते हैं?',
    context: 'Tests communication transparency and proactive priority alignment.',
    difficulty: 'Beginner',
    keyPoints: [
      'Documenting and listing all open tasks explicitly',
      'Communicating transparently with mentors before deadlines slip',
      'Focusing on completing one high-impact task at a time',
    ],
    sampleGoodAnswer:
      'When juggling multiple tasks, I first write them down with their estimated completion times and deadlines. If two senior teammates assign conflicting urgent requests, I don’t silently panic or overpromise. Instead, I reach out transparently: "I am currently working on Task A which finishes by 2 PM. Task B will take 3 hours. Which one has higher priority for today’s sprint?" This ensures alignment without compromising quality.',
    sampleWeakAnswer:
      'I will try to do everything at once and work late night without telling anyone.',
  },
  {
    id: 'intern-4',
    category: 'internship',
    title: 'Understanding API & HTTP Status Codes',
    questionText: 'Can you explain the difference between HTTP 401 Unauthorized, 403 Forbidden, and 404 Not Found?',
    questionHindi: 'क्या आप HTTP 401 अनधिकृत, 403 प्रतिबंधित, और 404 नहीं मिला के बीच अंतर समझा सकते हैं?',
    context: 'Essential web development fundamentals check for software engineering interns.',
    difficulty: 'Beginner',
    keyPoints: [
      '401 Unauthorized: Missing or invalid authentication credentials (who are you?)',
      '403 Forbidden: Identity is known, but lacks permission to access the resource (you cannot enter here)',
      '404 Not Found: The requested endpoint or URL does not exist on the server',
    ],
    sampleGoodAnswer:
      'HTTP 401 means "Unauthenticated": the server does not know who you are because credentials or JWT tokens are missing or expired. HTTP 403 means "Forbidden": the server knows who you are, but you lack authorization privileges to access that resource—like a normal user trying to access an admin dashboard. HTTP 404 means the requested URI resource does not exist on the server.',
    sampleWeakAnswer:
      'All 400 errors are client side errors. 404 is page not found, and 401 and 403 are both access denied errors with little difference.',
  },
  {
    id: 'intern-5',
    category: 'internship',
    title: 'Learning from Code Reviews',
    questionText: 'If a senior developer reviews your code and leaves 15 critical comments on your pull request, how do you handle it?',
    questionHindi: 'यदि कोई वरिष्ठ डेवलपर आपके कोड की समीक्षा करता है और 15 महत्वपूर्ण टिप्पणियां छोड़ता है, तो आप इसे कैसे लेते हैं?',
    context: 'Evaluates humility, ego management, and eagerness to absorb engineering standards.',
    difficulty: 'Beginner',
    keyPoints: [
      'Recognizing code reviews are about code quality, not personal attacks',
      'Categorizing feedback (style, logic, performance, edge cases)',
      'Thanking the reviewer and clarifying ambiguous points politely',
    ],
    sampleGoodAnswer:
      'I would actually view 15 detailed comments as a generous investment of that senior developer’s valuable time. I would go through each comment systematically, group them into logic, formatting, and edge cases, and address the straightforward fixes first. If there is a comment where I don’t fully understand the underlying design pattern suggested, I would politely ask for a 5-minute explanation. Then I would push the updates and summarize what I changed. That is how interns turn into great engineers.',
    sampleWeakAnswer:
      'I would feel bad because I worked hard on that code. I would argue with the senior if my code is already working.',
  },
  {
    id: 'intern-6',
    category: 'internship',
    title: 'Version Control (Git) in a Team',
    questionText: 'What is a merge conflict in Git, and what steps do you take to resolve it safely without losing team members’ work?',
    questionHindi: 'गिट में मर्ज कॉन्फ्लिक्ट क्या है, और आप टीम के काम को नुकसान पहुंचाए बिना इसे सुरक्षित रूप से कैसे हल करते हैं?',
    context: 'Practical Git hygiene and team collaboration check.',
    difficulty: 'Intermediate',
    keyPoints: [
      'Why conflicts occur (concurrent edits to identical lines in different branches)',
      'Pulling the latest main branch and rebasing or merging locally',
      'Communicating with the other author if intent is ambiguous before committing',
    ],
    sampleGoodAnswer:
      'A merge conflict occurs when two branches modify the same line of a file differently or one branch deletes a file that another modified. To resolve it safely, I checkout my feature branch, pull the latest changes from main, and open the conflict markers in VS Code. I compare the changes carefully. If the intent of the conflicting lines is ambiguous, I speak with the colleague who wrote those lines before deciding which logic to retain. Once tested locally, I stage and commit the resolution.',
    sampleWeakAnswer:
      'Merge conflict means code is corrupted. Usually people force push with -f or delete the repo and clone again.',
  },
  {
    id: 'intern-7',
    category: 'internship',
    title: 'Explaining a Concept You Recently Learned',
    questionText: 'Tell me about a technical concept, library, or tool you learned in the past 30 days that excited you.',
    questionHindi: 'पिछले 30 दिनों में सीखी गई किसी ऐसी तकनीकी अवधारणा या टूल के बारे में बताएं जिसने आपको उत्साहित किया।',
    context: 'Assesses intellectual curiosity and continuous self-learning drive.',
    difficulty: 'Beginner',
    keyPoints: [
      'Specific modern tool or concept (e.g., WebSockets, Docker containerization, Vector search, Prisma ORM)',
      'Why it is useful compared to older alternatives',
      'How you experimented with it',
    ],
    sampleGoodAnswer:
      'Recently, I explored Server-Sent Events (SSE) compared to WebSockets. I was fascinated to learn that for unidirectional server-to-client streaming—such as live LLM token output or notification feeds—SSE is significantly lighter than WebSockets because it operates over standard HTTP, has automatic reconnection built into the browser EventSource API, and handles corporate firewalls easily without protocol switching.',
    sampleWeakAnswer:
      'I learned Python last month because everyone says AI is doing everything with Python.',
  },
  {
    id: 'intern-8',
    category: 'internship',
    title: 'Demonstrating Reliability as a Remote Intern',
    questionText: 'If this internship is remote or hybrid, how do you ensure your mentors know you are reliable, active, and on track?',
    questionHindi: 'यदि यह इंटर्नशिप रिमोट या हाइब्रिड है, तो आप यह कैसे सुनिश्चित करते हैं कि आपके मेंटर्स को पता रहे कि आप विश्वसनीय और सही रास्ते पर हैं?',
    context: 'Crucial for remote working discipline and communication cadence.',
    difficulty: 'Beginner',
    keyPoints: [
      'Daily standup updates (what I completed, what I am doing today, blockers)',
      'Clear status on Slack/Teams and prompt responsiveness',
      'Over-communicating progress rather than going silent for days',
    ],
    sampleGoodAnswer:
      'In a remote setup, visibility comes from proactive written communication. I practice sending a concise morning note outlining my two main goals for the day, and an end-of-day summary detailing PRs created, tests run, and any blockers encountered. If I get stuck on a roadblock, I never go silent for hours; I flag it early with details of what I already investigated. Reliability is proven by consistent transparency.',
    sampleWeakAnswer:
      'I will be online on WhatsApp and whenever mentor calls me I will answer immediately.',
  },
  {
    id: 'intern-9',
    category: 'internship',
    title: 'Balancing College Studies and Internship Hours',
    questionText: 'How do you plan to balance your college exam schedule or lecture commitments with internship responsibilities?',
    questionHindi: 'आप कॉलेज परीक्षा या व्याख्यान के साथ इंटर्नशिप की जिम्मेदारियों को कैसे संतुलित करेंगे?',
    context: 'Checks realism and integrity regarding availability commitments.',
    difficulty: 'Beginner',
    keyPoints: [
      'Explicit awareness of college schedule and NOC status',
      'Proactive calendar planning and notifying team weeks in advance of exams',
      'Disciplined daily time allocation',
    ],
    sampleGoodAnswer:
      'Our college allows final-semester students to pursue full-time internships with an official No Objection Certificate (NOC), as our coursework is project-focused. For scheduled university exams, I have the semester timetable in advance and will inform my manager at least three weeks prior. During normal working hours, my focus is 100% dedicated to the internship.',
    sampleWeakAnswer:
      'Sir I will manage somehow. Sometimes I might have to skip office meetings for college attendance, but I will do work at night.',
  },
  {
    id: 'intern-10',
    category: 'internship',
    title: 'Why choose our domain/industry?',
    questionText: 'Why are you interested in our industry (e.g., Fintech, AI/SaaS, E-commerce, EdTech) specifically?',
    questionHindi: 'आप विशेष रूप से हमारे उद्योग (जैसे फिनटेक, एआई/सास, ई-कॉमर्स) में रुचि क्यों रखते हैं?',
    context: 'Checks industry alignment and interest beyond generic programming.',
    difficulty: 'Intermediate',
    keyPoints: [
      'Specific understanding of the industry dynamics in India',
      'Technical challenges unique to this domain (e.g., real-time transactions, low latency, multilingual support)',
      'Personal connection or passion for this sector',
    ],
    sampleGoodAnswer:
      'I am particularly drawn to Voice AI and Conversational Technology because language is the biggest barrier in India for digital adoption. Over 500 million citizens speak regional languages and find text interfaces difficult. Building voice solutions that enable rural citizens or students from smaller towns to interact naturally with services is both technically challenging—due to diverse accents and dialects—and deeply meaningful.',
    sampleWeakAnswer:
      'This industry is booming right now and there are many job openings and startups getting funding here.',
  },

  // ==========================================
  // TECHNICAL INTERVIEW (10 Questions)
  // ==========================================
  {
    id: 'tech-1',
    category: 'technical',
    title: 'What happens when you type a URL into a browser?',
    questionText: 'Explain step-by-step what happens under the hood when a user types "https://google.com" into the browser and presses Enter.',
    questionHindi: 'विस्तार से बताएं कि जब कोई उपयोगकर्ता ब्राउज़र में "https://google.com" टाइप करके एंटर दबाता है तो बैकग्राउंड में क्या होता है?',
    context: 'The classic full-stack architecture interview question that tests networking, DNS, TCP, TLS, and browser rendering.',
    difficulty: 'Intermediate',
    keyPoints: [
      'DNS resolution (browser cache, OS cache, recursive resolver, root/TLD/authoritative servers)',
      'TCP 3-way handshake (SYN, SYN-ACK, ACK) and TLS cryptographic handshake',
      'HTTP GET request sent and HTTP response received',
      'Critical Rendering Path (DOM tree, CSSOM tree, Render tree, Layout, Painting)',
    ],
    sampleGoodAnswer:
      'First, the browser checks its local DNS cache, OS host cache, and DNS resolver to convert "google.com" into an IP address. Next, it establishes a reliable TCP connection via a three-way handshake (SYN, SYN-ACK, ACK) and initiates a TLS handshake for HTTPS encryption. Once connected, the browser sends an HTTP GET request. The server processes it and sends back an HTML response with status 200 OK. Finally, the browser executes the Critical Rendering Path: it parses HTML into a DOM tree, parses CSS into a CSSOM tree, combines them into a Render Tree, calculates dimensions in the Layout stage, and paints pixels onto the screen.',
    sampleWeakAnswer:
      'Browser sends request to Google server through internet wires, then Google sends back HTML and CSS, and browser shows the webpage to user.',
  },
  {
    id: 'tech-2',
    category: 'technical',
    title: 'Synchronous vs Asynchronous JavaScript & Event Loop',
    questionText: 'How does JavaScript handle asynchronous operations despite being single-threaded? Explain the Event Loop, Call Stack, and Task Queue.',
    questionHindi: 'जावास्क्रिप्ट सिंगल-थ्रेडेड होने के बावजूद एसिंक्रोनस कार्यों को कैसे संभालता है? इवेंट लूप, कॉल स्टैक और टास्क कतार को समझाएं।',
    context: 'Essential JavaScript runtime mental model test.',
    difficulty: 'Intermediate',
    keyPoints: [
      'Call Stack execution of synchronous code',
      'Browser Web APIs offloading timers, network fetch, and I/O',
      'Microtask Queue (Promises) vs Macrotask Queue (setTimeout, setInterval)',
      'Event Loop continuously pushing queued callbacks onto an empty Call Stack',
    ],
    sampleGoodAnswer:
      'JavaScript runs on a single thread with a single Call Stack. When an asynchronous operation like fetch() or setTimeout() is called, the JavaScript engine offloads it to the browser Web APIs background thread. The Call Stack continues executing subsequent synchronous code without blocking. When the async operation completes, its callback is placed in either the Microtask Queue (for Promises and mutation observers) or the Macrotask Queue (for setTimeout). The Event Loop constantly monitors the Call Stack; as soon as the stack is completely empty, it pushes pending microtasks first, followed by macrotasks, onto the stack for execution.',
    sampleWeakAnswer:
      'JavaScript has multiple threads in the background. Asynchronous means it runs simultaneously and doesn’t wait for previous code to finish.',
  },
  {
    id: 'tech-3',
    category: 'technical',
    title: 'SQL vs NoSQL Databases: When to choose which?',
    questionText: 'Compare SQL (Relational) and NoSQL (Document/Key-Value) databases. Under what architectural requirements would you pick one over the other?',
    questionHindi: 'एसक्यूएल (रिलेशनल) और नोएसक्यूएल डेटाबेस की तुलना करें। किन आवश्यकताओं में आप किसे चुनेंगे?',
    context: 'Assesses backend data modeling decision skills.',
    difficulty: 'Intermediate',
    keyPoints: [
      'SQL (ACID compliance, structured schema, normalized relationships, complex JOINs)',
      'NoSQL (Horizontal scalability, flexible schema, high write throughput, hierarchical documents)',
      'Practical examples (Banking/e-commerce inventory -> SQL; Real-time chat/analytics logs -> NoSQL)',
    ],
    sampleGoodAnswer:
      'SQL databases like PostgreSQL and MySQL excel when data has clear relations, strict integrity constraints, and requires ACID compliance—for example, in financial ledgers or order inventory where partial updates cannot be tolerated. They utilize structured tables and normalized schemas with JOIN queries. Conversely, NoSQL databases like MongoDB or Cassandra are suited for unstructured or rapidly evolving schemas, high write velocity, or horizontal partitioning across clusters—such as user activity logs, IoT streams, or content management systems where reads and writes scale independently.',
    sampleWeakAnswer:
      'SQL is old technology using tables. NoSQL is new modern technology using JSON and it is faster than SQL for everything.',
  },
  {
    id: 'tech-4',
    category: 'technical',
    title: 'RESTful API Design Principles',
    questionText: 'What makes an API truly "RESTful"? What are the standard HTTP methods and their idempotency characteristics?',
    questionHindi: 'किसी एपीआई को वास्तव में "आरईएसटीफुल" क्या बनाता है? मानक एचटीटीपी विधियां और उनकी विशेषताएं क्या हैं?',
    context: 'Core backend engineering standards question.',
    difficulty: 'Intermediate',
    keyPoints: [
      'Statelessness, resource-oriented URIs using nouns not verbs',
      'GET (read, idempotent & safe)',
      'POST (create, non-idempotent)',
      'PUT (replace entire resource, idempotent) vs PATCH (partial update, idempotent/conditional)',
      'DELETE (remove resource, idempotent)',
    ],
    sampleGoodAnswer:
      'A RESTful API is stateless and organizes interactions around resources identified by nouns, like /api/v1/users/123 rather than actions like /getUser. The standard methods include GET for retrieving resources (safe and idempotent), POST for creating resources (non-idempotent), PUT for completely replacing a resource (idempotent), PATCH for partial updates, and DELETE for removing resources (idempotent). Idempotency means executing the exact same request multiple times produces the identical server state as executing it once.',
    sampleWeakAnswer:
      'REST API uses JSON and URLs. We can use POST for everything because POST is more secure than GET and can send passwords.',
  },
  {
    id: 'tech-5',
    category: 'technical',
    title: 'Time & Space Complexity (Big O Notation)',
    questionText: 'Why is Big O notation important, and what is the time complexity difference between searching in an unsorted array, a sorted array, and a hash map?',
    questionHindi: 'बिग ओ नोटेशन क्यों महत्वपूर्ण है, और अनसॉर्टेड ऐरे, सॉर्टेड ऐरे और हैश मैप में खोजने की समय जटिलता में क्या अंतर है?',
    context: 'Fundamental Data Structures & Algorithms (DSA) efficiency check.',
    difficulty: 'Intermediate',
    keyPoints: [
      'Big O represents asymptotic worst-case growth rate as input size N grows',
      'Unsorted array search: O(N) linear search',
      'Sorted array search: O(log N) binary search',
      'Hash map lookup: Average O(1) constant time, worst-case O(N) during collision collapse',
    ],
    sampleGoodAnswer:
      'Big O notation measures how the execution time or memory footprint of an algorithm scales asymptotically as the input size N increases towards infinity. For searching an element: in an unsorted array, we must inspect each element linearly, giving O(N) time. In a sorted array, we can use Binary Search to halve the search space on each step, yielding O(log N) time. In a hash map, computing the hash function allows direct bucket indexing in O(1) average time, though it can degrade to O(N) if severe hash collisions occur without proper resizing.',
    sampleWeakAnswer:
      'Big O shows how fast code runs in seconds. Hash map is O(1) which means 1 second, and array is O(N) which means N seconds.',
  },
  {
    id: 'tech-6',
    category: 'technical',
    title: 'State Management in React',
    questionText: 'How does state work in React? When would you use local component state (useState) versus global state (Context API or Redux)?',
    questionHindi: 'रिएक्ट में स्टेट कैसे काम करता है? आप लोकल कंपोनेंट स्टेट बनाम ग्लोबल स्टेट का उपयोग कब करेंगे?',
    context: 'Core modern frontend framework architectural check.',
    difficulty: 'Intermediate',
    keyPoints: [
      'State as reactive data that triggers re-render when mutated immutably',
      'Local state (useState) for isolated UI elements (toggle modal, form input)',
      'Lifting state up for sibling communication',
      'Global state (Context / Redux / Zustand) for application-wide data (auth token, user theme, cart items)',
    ],
    sampleGoodAnswer:
      'In React, state represents data that drives the UI. When state changes via its setter function, React re-renders the component and updates the virtual DOM. We use local state (useState) for UI concerns confined to a single component or its immediate children—like an open modal or form input field. When multiple deeply nested components across different trees need access to the same data—such as authenticated user credentials, dark mode theme preferences, or shopping cart items—we use global state solutions like Context API or lightweight stores like Zustand to avoid prop drilling.',
    sampleWeakAnswer:
      'State is like a variable. We should put all variables in global state so that every component can access everything without passing props.',
  },
  {
    id: 'tech-7',
    category: 'technical',
    title: 'Authentication vs Authorization & JWT Mechanics',
    questionText: 'What is the fundamental difference between Authentication and Authorization? How does a JSON Web Token (JWT) work?',
    questionHindi: 'ऑथेंटिकेशन और ऑथराइजेशन के बीच मूलभूत अंतर क्या है? JSON वेब टोकन (JWT) कैसे काम करता है?',
    context: 'Security fundamentals required for full-stack and backend roles.',
    difficulty: 'Intermediate',
    keyPoints: [
      'Authentication: verifying who the user is (login credentials)',
      'Authorization: verifying what permissions the user possesses (roles, access rules)',
      'JWT anatomy: Header (algorithm), Payload (claims), Signature (cryptographic hash with secret key)',
      'Stateless verification by the backend without querying database on every request',
    ],
    sampleGoodAnswer:
      'Authentication validates identity—answering "Who are you?" through passwords, biometric data, or OTP. Authorization determines permissions—answering "What actions are you allowed to perform?" A JSON Web Token (JWT) facilitates stateless authorization. It consists of three Base64URL-encoded parts separated by dots: Header (algorithm), Payload (user claims and expiry), and Signature. The signature is created by hashing the header and payload with a server-side secret key. When the client sends the token in the Authorization header, the server verifies the signature mathematically without needing to query a session database on every request.',
    sampleWeakAnswer:
      'Authentication and authorization are the same thing for login. JWT is an encrypted string that hides passwords so hackers cannot read it.',
  },
  {
    id: 'tech-8',
    category: 'technical',
    title: 'What is CORS and how do you resolve CORS errors?',
    questionText: 'What is Cross-Origin Resource Sharing (CORS), why does the browser enforce it, and how do you fix CORS errors on the server?',
    questionHindi: 'CORS क्या है, ब्राउज़र इसे क्यों लागू करता है, और आप सर्वर पर CORS त्रुटियों को कैसे ठीक करते हैं?',
    context: 'Every full-stack developer encounters CORS; tests real-world web platform understanding.',
    difficulty: 'Intermediate',
    keyPoints: [
      'Same-Origin Policy (SOP) security restriction enforced by browsers',
      'Definition of Origin: Protocol + Domain + Port',
      'Preflight OPTIONS request for non-simple HTTP requests',
      'Proper fix: configuring server response headers (Access-Control-Allow-Origin, Methods, Headers)',
    ],
    sampleGoodAnswer:
      'CORS is a browser security mechanism that restricts web applications running at one origin from requesting resources from a different origin (where origin is protocol, domain, and port). It prevents malicious websites from forging authenticated API requests using cookies. For non-simple requests, the browser first sends an HTTP OPTIONS preflight request. The correct fix is always on the server: configure the server to return proper headers, such as "Access-Control-Allow-Origin" specifying the allowed client domain, along with allowed methods and headers. Disabling CORS in the browser or using wildcard "*" in production with credentials is unsafe.',
    sampleWeakAnswer:
      'CORS is an annoying browser error. You can fix it by downloading a Chrome extension to disable CORS or using a proxy website.',
  },
  {
    id: 'tech-9',
    category: 'technical',
    title: 'Git Merge vs Git Rebase',
    questionText: 'What is the conceptual difference between "git merge" and "git rebase"? When should you use which?',
    questionHindi: '"git merge" और "git rebase" के बीच क्या अंतर है? आपको कब किसका उपयोग करना चाहिए?',
    context: 'Tests professional code collaboration hygiene.',
    difficulty: 'Intermediate',
    keyPoints: [
      'git merge creates a non-destructive 3-way merge commit preserving true chronological history',
      'git rebase rewrites project history by replaying commits sequentially on top of another base tip, creating a linear history',
      'Golden rule: Never rebase a public shared branch',
    ],
    sampleGoodAnswer:
      'Both commands integrate changes from one branch into another, but they handle history differently. "git merge" creates a new merge commit that ties the two branch histories together. It is non-destructive and preserves the complete chronological history, but can make the commit graph cluttered. "git rebase" rewrites commit history by moving the base of your feature branch to the latest tip of main and replaying your commits on top, creating a clean, linear commit log. The golden rule is: never rebase public shared branches because rewriting published commits causes confusion for teammates.',
    sampleWeakAnswer:
      'Merge is for combining branches. Rebase is when merge has conflicts so you delete the commits.',
  },
  {
    id: 'tech-10',
    category: 'technical',
    title: 'How does indexing speed up database queries?',
    questionText: 'How does a database index work internally, and why should we not simply add indexes to every single column in a table?',
    questionHindi: 'डेटाबेस इंडेक्स आंतरिक रूप से कैसे काम करता है, और हमें टेबल के हर कॉलम पर इंडेक्स क्यों नहीं जोड़ना चाहिए?',
    context: 'Database performance and engineering tradeoffs check.',
    difficulty: 'Intermediate',
    keyPoints: [
      'B-Tree / B+Tree data structure providing O(log N) lookup instead of O(N) full table scans',
      'Tradeoff: Indexes consume additional disk/memory storage',
      'Tradeoff: Slower WRITE operations (INSERT, UPDATE, DELETE must rebuild index nodes)',
    ],
    sampleGoodAnswer:
      'A database index is like the index at the back of a textbook. Without it, the database engine must perform a sequential Full Table Scan (O(N)) inspecting every row. Most relational indexes use B-Tree or B+Tree data structures, which keep sorted keys and pointers to rows, allowing searches, range queries, and sorts in O(log N) time. However, we should never index every column because indexes are a tradeoff: they consume additional memory and disk space, and they significantly slow down INSERT, UPDATE, and DELETE operations since every write requires the database to update both the table and all related index trees.',
    sampleWeakAnswer:
      'Index makes queries fast like Google search. We should index all columns so that any query runs instantly.',
  },

  // ==========================================
  // BEHAVIORAL INTERVIEW (10 Questions)
  // ==========================================
  {
    id: 'behav-1',
    category: 'behavioral',
    title: 'STAR Method: Overcoming a Major Failure',
    questionText: 'Tell me about a time you failed or made a mistake on a project. Walk me through using Situation, Task, Action, and Result.',
    questionHindi: 'उस समय के बारे में बताएं जब आप किसी प्रोजेक्ट में असफल हुए या गलती की। STAR पद्धति का उपयोग करके समझाएं।',
    context: 'The premier behavioral question testing emotional resilience and accountability.',
    difficulty: 'Intermediate',
    keyPoints: [
      'Situation & Task: The goal and responsibility you had',
      'Mistake acknowledged candidly without finger-pointing',
      'Action: Immediate containment and corrective measures taken',
      'Result: Concrete learning and safeguards instituted for the future',
    ],
    sampleGoodAnswer:
      'Situation: During our college web portal launch, I pushed an unverified database migration directly to our live staging environment. Task: The migration altered column types, causing our authentication API to crash right before a faculty demonstration. Action: Rather than hiding it, I immediately notified our faculty coordinator, reverted the migration using our database backup snapshot, and spent the evening writing a migration validation script with automated rollback tests. Result: We restored service in 25 minutes, and that checklist became the standard deployment protocol for our team. I learned that speed must never bypass verification.',
    sampleWeakAnswer:
      'In my project my friend forgot to connect the database and our presentation failed. The teacher got angry at both of us even though it was my friend’s fault.',
  },
  {
    id: 'behav-2',
    category: 'behavioral',
    title: 'Handling a Team Member Not Pulling Their Weight',
    questionText: 'Have you ever worked on a group project where a teammate was not contributing? How did you address the situation?',
    questionHindi: 'क्या आपने कभी किसी ऐसे ग्रुप प्रोजेक्ट पर काम किया है जहाँ कोई टीम सदस्य योगदान नहीं दे रहा था? आपने स्थिति को कैसे संभाला?',
    context: 'Assesses peer leadership, empathy, and professional assertiveness.',
    difficulty: 'Intermediate',
    keyPoints: [
      'Private, empathetic one-on-one conversation rather than public shaming',
      'Uncovering the root cause (illness, skill gap, personal issue, lack of clarity)',
      'Re-aligning smaller, manageable deliverables to bring them back on track',
    ],
    sampleGoodAnswer:
      'In our third-year robotics project, one of our four teammates missed two consecutive sprint meetings and hadn’t submitted his hardware interfacing module. Instead of confronting him in the group chat, I reached out for a private one-on-one conversation. It turned out he was struggling with microcontroller C code and felt embarrassed to ask for help in front of the others. We paired up for two evenings: I walked him through the register setup, and we broke his task into three smaller milestones. He completed all of them on time, and our robot won the departmental exhibition.',
    sampleWeakAnswer:
      'Yes, in college many people are lazy and only want their name on the report. So I just did all the work myself and put their names at the end.',
  },
  {
    id: 'behav-3',
    category: 'behavioral',
    title: 'Convincing Someone with a Different Opinion',
    questionText: 'Describe a time you had to persuade someone—such as a professor or peer—to adopt your technical approach or idea.',
    questionHindi: 'उस समय का वर्णन करें जब आपको किसी विचार या दृष्टिकोण को अपनाने के लिए किसी को राजी करना पड़ा।',
    context: 'Tests persuasive communication, preparation, and data-driven reasoning.',
    difficulty: 'Intermediate',
    keyPoints: [
      'Respectful understanding of their initial counter-argument',
      'Preparing evidence, data, or prototypes rather than aggressive debate',
      'Achieving mutual consensus and a successful outcome',
    ],
    sampleGoodAnswer:
      'Our college project guide initially insisted we build our desktop project using traditional Java Swing because that was what he had taught for years. I believed building it as a web app using React and Tailwind would make it accessible across mobile devices for students. Instead of arguing verbally, I spent one weekend creating a working 2-page prototype showing real-time mobile responsiveness and responsive data tables. When I demonstrated how students could check hostel notices directly on their mobile phones, he was impressed and fully approved our technical direction.',
    sampleWeakAnswer:
      'I argued with my friend in front of the whole group until he realized my idea was superior and agreed to follow it.',
  },
  {
    id: 'behav-4',
    category: 'behavioral',
    title: 'Adapting to an Unexpected Change in Requirements',
    questionText: 'Tell me about a time project requirements changed drastically at the last minute. How did you adapt your plan?',
    questionHindi: 'उस समय के बारे में बताएं जब अंतिम समय में प्रोजेक्ट की आवश्यकताएं काफी बदल गईं। आपने अपनी योजना को कैसे अनुकूलित किया?',
    context: 'Measures agility, calm under pressure, and flexibility.',
    difficulty: 'Intermediate',
    keyPoints: [
      'Initial shock or surprise managed constructively',
      'Assessing the impact on the existing codebase or schedule',
      'Collaborative triage and successful delivery of MVP requirements',
    ],
    sampleGoodAnswer:
      'During a 24-hour hackathon, twelve hours in, the problem sponsor introduced a surprise constraint: our solution could not use external third-party paid APIs. We had initially planned on using an expensive proprietary vision API. Rather than getting discouraged, our team held a 15-minute retrospective. We pivoted to an open-source lightweight on-device model and pruned non-essential features to focus solely on the core customer journey. We managed to train and deploy the model with four hours to spare and received special recognition for adaptability.',
    sampleWeakAnswer:
      'It was very unfair of the judges to change the rules midway. We had to delete half our code and we were very frustrated.',
  },
  {
    id: 'behav-5',
    category: 'behavioral',
    title: 'Going Above and Beyond Expectations',
    questionText: 'Give an example of a time when you went beyond what was strictly expected of you in a project or assignment.',
    questionHindi: 'एक ऐसा उदाहरण दें जब आपने किसी प्रोजेक्ट या असाइनमेंट में अपनी अपेक्षा से कहीं बढ़कर काम किया।',
    context: 'Highlights proactive ownership, craftsmanship, and intrinsic motivation.',
    difficulty: 'Intermediate',
    keyPoints: [
      'The baseline requirement vs what extra value you delivered',
      'Why you took the initiative without being asked',
      'The positive impact on users or team efficiency',
    ],
    sampleGoodAnswer:
      'Our college departmental assignment simply required submitting a working Python CLI program for calculating student grades. However, I knew our department staff spent hours manually copying those grades from Excel spreadsheets into individual PDF report cards. On my own initiative, I spent an extra day integrating an automated open-source PDF generator and email dispatcher that created customized grade reports with a single command. The department office adopted that tool and still uses it to save over 10 hours of manual data entry every semester.',
    sampleWeakAnswer:
      'I stayed awake until 4 AM before submission night to make sure my code looked pretty with comments.',
  },
  {
    id: 'behav-6',
    category: 'behavioral',
    title: 'Handling Constructive Criticism from a Senior',
    questionText: 'Tell me about a time you received difficult feedback from a teacher or mentor. How did you process it emotionally and professionally?',
    questionHindi: 'उस समय के बारे में बताएं जब आपको किसी शिक्षक या गुरु से कठिन प्रतिक्रिया मिली। आपने इसे कैसे संभाला?',
    context: 'Tests emotional maturity and lack of defensiveness.',
    difficulty: 'Beginner',
    keyPoints: [
      'Initial emotional reaction managed constructively',
      'Separating self-worth from work critique',
      'Actionable improvement and follow-up validation',
    ],
    sampleGoodAnswer:
      'In our pre-final year seminar, our head of department remarked that while my technical slides were thorough, my presentation delivery was monotonous and lacked audience engagement. While it stung at first because I had worked hard on the slides, I realized he was giving me honest advice to help me succeed in corporate interviews. I asked a friend to record my practice presentations on video, analyzed my body language and vocal inflection, and practiced using open-ended questions. In our final seminar, the same professor praised my engaging storytelling.',
    sampleWeakAnswer:
      'I felt that professor always targeted students from our batch, so I didn’t pay much attention to his comments.',
  },
  {
    id: 'behav-7',
    category: 'behavioral',
    title: 'Working with Incomplete Information',
    questionText: 'Describe a scenario where you had to make a technical decision or start building without having complete specifications.',
    questionHindi: 'एक ऐसी स्थिति का वर्णन करें जहाँ आपको पूरी जानकारी के बिना कोई तकनीकी निर्णय लेना पड़ा।',
    context: 'Assesses comfort with ambiguity and iterative problem solving.',
    difficulty: 'Intermediate',
    keyPoints: [
      'Ambiguity identified clearly',
      'Formulating reasonable assumptions and validating them early',
      'Building flexible, modular code that accommodates future clarifications',
    ],
    sampleGoodAnswer:
      'When building an event ticketing app for our cultural fest, the ticketing pricing tiers and early-bird discounts had not been finalized by the college administration, yet development could not wait. To avoid being blocked, I defined an abstract pricing strategy interface with pluggable discount calculation rules. I documented my assumptions and shared them with the organizers. When the final pricing tier logic was finally announced two days before the launch, I only had to write one 15-line strategy class without touching the core payment processing pipeline.',
    sampleWeakAnswer:
      'I just stopped working until the organizers gave the final document because writing code without full details is a waste of time.',
  },
  {
    id: 'behav-8',
    category: 'behavioral',
    title: 'Prioritizing Long-Term Quality vs Short-Term Speed',
    questionText: 'Have you ever had to choose between delivering a quick shortcut fix versus a clean, sustainable solution? How did you decide?',
    questionHindi: 'क्या आपको कभी त्वरित शॉर्टकट समाधान बनाम स्वच्छ, टिकाऊ समाधान के बीच चयन करना पड़ा है? आपने कैसे निर्णय लिया?',
    context: 'Tests understanding of technical debt and pragmatic engineering balance.',
    difficulty: 'Intermediate',
    keyPoints: [
      'The dilemma: immediate deadline vs code maintainability',
      'Evaluating business impact and risks',
      'Communicating transparently and scheduling technical debt cleanup',
    ],
    sampleGoodAnswer:
      'During campus placement registration, our student registration server began throwing memory spikes during peak hours. A quick hack was simply restarting the server every hour via a cron job. While that would have kept the site alive, I knew it risked corrupting active student form submissions. I spoke with our faculty in-charge, implemented connection pooling on our database client in 45 minutes, and tested it under simulated load. It fixed the root cause without masking the symptom with dangerous hacks.',
    sampleWeakAnswer:
      'Shortcuts are always better when deadlines are close. You can always fix the code later if anyone notices.',
  },
  {
    id: 'behav-9',
    category: 'behavioral',
    title: 'Maintaining Enthusiasm During Repetitive Tasks',
    questionText: 'Software development sometimes involves repetitive tasks like data entry, manual testing, or writing boilerplate. How do you stay motivated?',
    questionHindi: 'सॉफ्टवेयर विकास में कभी-कभी दोहराव वाले काम शामिल होते हैं। आप कैसे प्रेरित रहते हैं?',
    context: 'Evaluates patience, diligence, and automation mindset.',
    difficulty: 'Beginner',
    keyPoints: [
      'Viewing repetitive tasks as opportunities for automation or scripting',
      'Maintaining meticulous attention to detail',
      'Understanding the importance of reliability for the wider team',
    ],
    sampleGoodAnswer:
      'Whenever I encounter repetitive tasks, my engineering instinct is: "Can I automate this with a script?" When we had to clean and format 2,000 student CSV records for our alumni database, instead of manually copying rows for days, I wrote a 50-line Python pandas script that validated email formats, removed duplicates, and exported clean JSON in 30 seconds. Turning a tedious chore into an automation challenge keeps me motivated while saving time for everyone.',
    sampleWeakAnswer:
      'I put on earphones, listen to music, and finish it as fast as possible without thinking too much.',
  },
  {
    id: 'behav-10',
    category: 'behavioral',
    title: 'Admitting When You Don’t Know the Answer',
    questionText: 'If an interviewer or senior engineer asks you a technical question you genuinely have no idea how to answer, what do you do?',
    questionHindi: 'यदि कोई साक्षात्कारकर्ता आपसे ऐसा तकनीकी प्रश्न पूछता है जिसका उत्तर आप बिल्कुल नहीं जानते, तो आप क्या करते हैं?',
    context: 'Tests professional integrity, intellectual honesty, and logical deduction under uncertainty.',
    difficulty: 'Beginner',
    keyPoints: [
      'Candid admission of not knowing the exact answer',
      'Sharing logical deduction based on related foundational principles',
      'Curiosity and willingness to learn the correct approach',
    ],
    sampleGoodAnswer:
      'I believe honesty is fundamental in engineering. I would say: "I haven’t worked with this specific technology or concept yet, so I don’t know the exact answer. However, based on my understanding of related distributed systems principles, here is how I think it might work..." Then I would walk through my reasoning. Admitting what you don’t know shows integrity, and thinking out loud allows the interviewer to see how your mind tackles unfamiliar territory.',
    sampleWeakAnswer:
      'I will try to bluff or change the topic to something I know so the interviewer doesn’t realize I don’t know the answer.',
  },

  // ==========================================
  // COMMUNICATION SKILLS (10 Questions)
  // ==========================================
  {
    id: 'comm-1',
    category: 'communication',
    title: 'Explaining a Technical Blocker to a Non-Tech Manager',
    questionText: 'How would you explain to a non-technical product manager why a feature is delayed due to database technical debt?',
    questionHindi: 'आप एक गैर-तकनीकी उत्पाद प्रबंधक को कैसे समझाएंगे कि डेटाबेस की तकनीकी समस्या के कारण कोई सुविधा क्यों विलंबित है?',
    context: 'Tests bilingual empathy, business alignment, and avoidance of confusing jargon.',
    difficulty: 'Intermediate',
    keyPoints: [
      'Avoiding deep technical acronyms without explanation',
      'Using a practical real-world metaphor (e.g., foundation of a building)',
      'Highlighting business risk if rushed vs long-term stability',
      'Providing realistic timeline estimates',
    ],
    sampleGoodAnswer:
      'I would explain it using a building foundation analogy: "Imagine we want to build a third floor on a house, but the foundation was originally poured to support only one floor. If we build right now, the entire structure risks cracking when customers move in. We need two days to reinforce the foundation—in our case, reorganizing how our database stores customer records—so that not only this feature, but the next three features we launch will be fast, secure, and will not crash during festival sales." This aligns technical necessity with business goals.',
    sampleWeakAnswer:
      'I will tell them that foreign key constraints and un-indexed B-tree leaves are causing O(N squared) query latency on PostgreSQL so they have to wait.',
  },
  {
    id: 'comm-2',
    category: 'communication',
    title: 'Eliminating Fillers (Umm, Basically, Matlab, Like)',
    questionText: 'Many candidates unconsciously use filler words like "basically", "actually", "matlab", and "you know". How do you control filler words when nervous?',
    questionHindi: 'कई उम्मीदवार "basically", "matlab", "you know" जैसे भराव शब्दों का उपयोग करते हैं। घबराहट में आप इन्हें कैसे नियंत्रित करते हैं?',
    context: 'Directly addresses the primary spoken communication struggle of Indian college students.',
    difficulty: 'Beginner',
    keyPoints: [
      'Replacing filler words with deliberate, confident pauses',
      'Thinking through the sentence structure before starting to speak',
      'Practicing speaking at a controlled, measured pace',
    ],
    sampleGoodAnswer:
      'The most effective technique I learned is embracing the power of the silent pause. When we get nervous, our brain tries to fill every silence with "umm", "like", or "basically" because we fear silence seems awkward. In reality, a two-second silent pause makes a speaker appear thoughtful, composed, and deliberate. Before answering a complex question, I take a calm breath, formulate the opening sentence in my head, and speak at a steady, measured pace.',
    sampleWeakAnswer:
      'Basically I just try to speak very fast so that the interviewer doesn’t notice my filler words, you know?',
  },
  {
    id: 'comm-3',
    category: 'communication',
    title: 'Switching from Hinglish to Professional English',
    questionText: 'Many students naturally think in Hindi and speak in Hinglish. How do you convert conversational Hinglish thoughts into fluent, professional English during interviews?',
    questionHindi: 'कई छात्र स्वाभाविक रूप से हिंदी में सोचते हैं और हिंग्लिश में बोलते हैं। साक्षात्कार के दौरान आप हिंग्लिश विचारों को पेशेवर अंग्रेजी में कैसे बदलते हैं?',
    context: 'Tailored specifically for AwaazPath’s mission for Tier 2/3 students.',
    difficulty: 'Intermediate',
    keyPoints: [
      'Recognizing that thinking in mother tongue is completely natural, not a defect',
      'Building anchor vocabulary (e.g., "collaborate", "deliverable", "architecture", "resolve")',
      'Translating core intent into direct Subject-Verb-Object English sentences',
    ],
    sampleGoodAnswer:
      'First, I remind myself that thinking in Hindi is not a handicap—it is my natural language. When a thought comes in Hinglish like "Maine project me ye component sambhala aur deadline meet kari", instead of translating word-for-word, I identify the core professional action words: "I took ownership of this component and ensured we met our delivery milestone." Practicing with voice tools, reading engineering articles out loud, and speaking English with peer study partners daily helped me make this translation instinctive.',
    sampleWeakAnswer:
      'English is very difficult for Hindi students. I try to memorize ready-made English answers from YouTube and repeat them word-by-word.',
  },
  {
    id: 'comm-4',
    category: 'communication',
    title: 'Giving a 60-Second Elevator Pitch',
    questionText: 'Give a 60-second elevator pitch summarizing who you are, what you build, and what makes you a unique software engineering candidate.',
    questionHindi: '60 सेकंड का एलिवेटर पिच दें जिसमें बताया गया हो कि आप कौन हैं, आप क्या बनाते हैं और क्या आपको खास बनाता है।',
    context: 'Conciseness and high-impact verbal communication check.',
    difficulty: 'Beginner',
    keyPoints: [
      'Hook: Clear identity and core skill set',
      'Value proof: A real project or achievement with numbers',
      'Forward vision: What you bring to the company',
    ],
    sampleGoodAnswer:
      'Hi, I am Rahul, a full-stack engineer graduating from Jabalpur who loves turning complex user workflows into fast, accessible web applications. Over the past year, I built an open-source campus portal used by over 800 students, optimizing its database queries to run under 100 milliseconds even on spotty 3G mobile connections. Coming from a tier-2 city, I bring relentless grit, a habit of self-directed learning, and deep empathy for real Indian users. I am ready to bring that dedication and clean coding standard to your engineering team.',
    sampleWeakAnswer:
      'Hello, I am looking for a job in your company. I know C, C++, Java, Python, HTML, CSS, JavaScript, React, SQL, and Android. Please give me a chance.',
  },
  {
    id: 'comm-5',
    category: 'communication',
    title: 'Active Listening in Remote Teams',
    questionText: 'What does "Active Listening" mean to you, and how do you demonstrate it in virtual video calls and interviews?',
    questionHindi: '"सक्रिय रूप से सुनना" (Active Listening) आपके लिए क्या मायने रखता है, और आप इसे वर्चुअल इंटरव्यू में कैसे प्रदर्शित करते हैं?',
    context: 'Critical for modern distributed workplace communication.',
    difficulty: 'Beginner',
    keyPoints: [
      'Not interrupting while the other person is speaking',
      'Paraphrasing or confirming understanding before launching into an answer',
      'Maintaining attentive virtual presence (camera eye contact, nodding)',
    ],
    sampleGoodAnswer:
      'Active listening means listening to understand, rather than merely listening to respond. In virtual interviews or team meetings, I demonstrate this by keeping my focus directly on the speaker without multitasking. When given a complex question, I briefly summarize my understanding before answering: "If I understand correctly, you are asking how we would handle cache invalidation when user permissions change. Is that accurate?" This prevents misunderstandings and proves respect for the speaker’s intent.',
    sampleWeakAnswer:
      'Active listening means keeping your microphone unmuted and saying "yes yes yes" while the interviewer is speaking.',
  },
  {
    id: 'comm-6',
    category: 'communication',
    title: 'Explaining a Mistake to a Client or Senior',
    questionText: 'Suppose you accidentally deleted a test environment database. How do you communicate this mistake to your lead?',
    questionHindi: 'मान लीजिए कि आपने गलती से टेस्ट डेटाबेस हटा दिया। आप अपने लीड को इस गलती के बारे में कैसे बताएंगे?',
    context: 'Tests professional integrity, crisis communication, and lack of panic.',
    difficulty: 'Intermediate',
    keyPoints: [
      'Immediate disclosure without attempting cover-ups',
      'Explaining what happened objectively, what was affected, and the recovery plan',
      'Preventive measure proposed so it cannot recur',
    ],
    sampleGoodAnswer:
      'I would immediately message or call my lead directly: "Hi mentor, I need to report an incident. While cleaning test collections 10 minutes ago, I ran a script with the wrong environment variable and wiped the test staging database. No production or customer data was affected. I have already located our 2 AM automated backup snapshot and can restore it within 30 minutes. Once restored, I will add an environment confirmation prompt to the script so this cannot happen again." This replaces panic with immediate accountability and solutions.',
    sampleWeakAnswer:
      'I will quietly try to restore it myself and if anyone notices I will say the server had a crash or power cut.',
  },
  {
    id: 'comm-7',
    category: 'communication',
    title: 'Asking for Help Without Sounding Unprepared',
    questionText: 'How do you ask a senior engineer for help without appearing lazy or consuming too much of their time?',
    questionHindi: 'वरिष्ठ इंजीनियर से उनका बहुत अधिक समय लिए बिना और बिना किसी संकोच के मदद कैसे मांगें?',
    context: 'The 15-Minute Rule: highly valued in professional engineering teams.',
    difficulty: 'Beginner',
    keyPoints: [
      'Struggling independently first (timeboxing 30-45 minutes)',
      'Structuring the query: The goal, what was tried, specific hypothesis, and exact blocker',
      'Respecting their schedule asynchronously',
    ],
    sampleGoodAnswer:
      'I follow the "Timebox and Context" rule. If I am blocked, I spend 30 to 45 minutes investigating documentation, logs, and stack traces. When I reach out, I structure my message clearly: "Hi Priya, I am working on the OAuth callback. My goal is to extract the user token. I have verified the redirect URL and checked our server logs, but the token payload is returning null at line 42. Could you spare 5 minutes to point me toward the right debugging approach?" This shows initiative and respects their focus.',
    sampleWeakAnswer:
      'I will just send a Slack message saying "Hi sir, my code is not working, please check why."',
  },
  {
    id: 'comm-8',
    category: 'communication',
    title: 'Presenting Technical Project Demos with Confidence',
    questionText: 'When presenting a software demo to college professors or corporate interviewers, how do you structure your presentation?',
    questionHindi: 'जब आप प्रोफेसरों या कॉर्पोरेट साक्षात्कारकर्ताओं को सॉफ्टवेयर डेमो प्रस्तुत करते हैं, तो आप अपनी प्रस्तुति की संरचना कैसे करते हैं?',
    context: 'Presentation hygiene and user-centric storytelling.',
    difficulty: 'Intermediate',
    keyPoints: [
      'Problem and user story first (Why does this software exist?)',
      'Live demonstration of the core user journey (show, don’t just tell)',
      'Architecture walkthrough highlighting technical decisions and tradeoffs',
      'Next steps and lessons learned',
    ],
    sampleGoodAnswer:
      'I structure demos like a user journey story. First, I spend 60 seconds establishing the pain point: "Here is the exact frustration our target user faces today." Next, I walk through the live demo from the user’s perspective, demonstrating how our solution solves that pain point seamlessly. Only after the value is clear do I switch to the architecture diagram to discuss our tech stack choices, database schema, and challenges overcome. I conclude with future enhancements. This keeps both business and technical evaluators engaged.',
    sampleWeakAnswer:
      'I open the IDE directly, show all 500 lines of code line-by-line, and explain every function one after another.',
  },
  {
    id: 'comm-9',
    category: 'communication',
    title: 'Handling Unexpected or Tricky Behavioral Questions',
    questionText: 'When an interviewer asks an unexpected behavioral question that catches you off guard, what strategy do you use to answer coherently?',
    questionHindi: 'जब साक्षात्कारकर्ता कोई अप्रत्याशित प्रश्न पूछता है जो आपको चौंका देता है, तो आप स्पष्ट उत्तर देने के लिए क्या रणनीति अपनाते हैं?',
    context: 'Impromptu speaking composure and cognitive pacing.',
    difficulty: 'Intermediate',
    keyPoints: [
      'Acknowledging the thoughtful question to buy 5 seconds of thinking time',
      'Anchor on a relevant life or project anchor story',
      'Follow the STAR framework to keep thoughts structured',
    ],
    sampleGoodAnswer:
      'When faced with an unexpected question, I never rush to speak immediately. I acknowledge it gracefully: "That’s a great question. Let me take five seconds to pick the most relevant experience to share." While taking a calm breath, I identify a real college, project, or personal story that fits the question’s theme. Then I strictly apply the STAR method: Situation, Task, Action, Result. Having that structural formula prevents my mind from rambling.',
    sampleWeakAnswer:
      'I start talking immediately with whatever word comes to my tongue first, hoping my answer will make sense eventually.',
  },
  {
    id: 'comm-10',
    category: 'communication',
    title: 'Giving Constructive Feedback to a Peer',
    questionText: 'How do you deliver constructive critique to a friend or project peer without hurting their feelings or damaging the team dynamic?',
    questionHindi: 'आप किसी मित्र या प्रोजेक्ट साथी की भावनाओं को ठेस पहुँचाए बिना रचनात्मक प्रतिक्रिया कैसे देते हैं?',
    context: 'Empathetic feedback and psychological safety in teams.',
    difficulty: 'Intermediate',
    keyPoints: [
      'Focusing critique on the work/behavior, never on the person’s character',
      'Using the "Feedback Sandwich" or "I notice / I wonder" format',
      'Offering collaborative assistance to fix the issue together',
    ],
    sampleGoodAnswer:
      'I always critique the work, never the person. Instead of saying "Your UI design looks cluttered and unprofessional", I say: "I love the color palette you chose for the header. For the main dashboard, I wonder if increasing the whitespace between these metric cards would make it easier for freshers to read the charts quickly. Let’s experiment with a 16-pixel gap together and compare." This frames the critique as a collaborative experiment rather than a personal judgment.',
    sampleWeakAnswer:
      'I tell them straight to their face that their work is bad so that they learn the harsh reality of corporate life.',
  },
];

export function getQuestionsByCategory(category: string): InterviewQuestion[] {
  return QUESTIONS.filter((q) => q.category === category);
}

export function getQuestionById(id: string): InterviewQuestion | undefined {
  return QUESTIONS.find((q) => q.id === id);
}

