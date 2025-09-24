import { Question, QuizSettings } from '@/types/question';

// AI-powered question generation - generates questions for ANY subject
const generateAIQuestions = (settings: QuizSettings): Question[] => {
  const { subject, difficulty, questionType, questionCount } = settings;
  
  // This simulates AI-generated questions - in a real app, you'd call an AI API
  const questions: Question[] = [];
  
  for (let i = 0; i < questionCount; i++) {
    const questionData = generateQuestionByType(subject, difficulty, questionType, i);
    
    questions.push({
      id: `${subject.replace(/\s+/g, '-').toLowerCase()}-${difficulty}-${questionType}-${i}`,
      type: questionType,
      difficulty,
      subject,
      question: questionData.question,
      options: 'options' in questionData ? questionData.options : undefined,
      correctAnswer: questionData.correctAnswer,
      explanation: questionData.explanation
    });
  }
  
  return questions;
};

// Generate questions based on type and subject
const generateQuestionByType = (subject: string, difficulty: string, type: string, index: number) => {
  const subjectKey = subject.toLowerCase().replace(/\s+/g, '-');
  
  switch (type) {
    case 'multiple-choice':
      return generateMultipleChoiceQuestion(subject, difficulty, index);
    case 'true-false':
      return generateTrueFalseQuestion(subject, difficulty, index);
    case 'fill-blank':
      return generateFillBlankQuestion(subject, difficulty, index);
    case 'short-answer':
      return generateShortAnswerQuestion(subject, difficulty, index);
    default:
      return generateMultipleChoiceQuestion(subject, difficulty, index);
  }
};

// Generate multiple choice questions for any subject
const generateMultipleChoiceQuestion = (subject: string, difficulty: string, index: number) => {
  const questionTemplates = getQuestionTemplates(subject, difficulty, 'multiple-choice');
  const template = questionTemplates[index % questionTemplates.length];
  return template;
};

// Generate true/false questions for any subject
const generateTrueFalseQuestion = (subject: string, difficulty: string, index: number) => {
  const questionTemplates = getQuestionTemplates(subject, difficulty, 'true-false');
  const template = questionTemplates[index % questionTemplates.length];
  return template;
};

// Generate fill-in-the-blank questions for any subject
const generateFillBlankQuestion = (subject: string, difficulty: string, index: number) => {
  const questionTemplates = getQuestionTemplates(subject, difficulty, 'fill-blank');
  const template = questionTemplates[index % questionTemplates.length];
  return template;
};

// Generate short answer questions for any subject
const generateShortAnswerQuestion = (subject: string, difficulty: string, index: number) => {
  const questionTemplates = getQuestionTemplates(subject, difficulty, 'short-answer');
  const template = questionTemplates[index % questionTemplates.length];
  return template;
};

// Comprehensive question templates for any subject
const getQuestionTemplates = (subject: string, difficulty: string, type: string) => {
  const subjectLower = subject.toLowerCase();
  
  // Dynamic question generation based on subject and difficulty
  if (type === 'multiple-choice') {
    const easyQuestions = [
      {
        question: `What is a fundamental concept in ${subject}?`,
        options: [
          getSubjectConcept(subject, 0),
          getSubjectConcept(subject, 1),
          getSubjectConcept(subject, 2),
          getSubjectConcept(subject, 3)
        ],
        correctAnswer: getSubjectConcept(subject, 0),
        explanation: `${getSubjectConcept(subject, 0)} is indeed a fundamental concept in ${subject}.`
      },
      {
        question: `Which of the following is most associated with ${subject}?`,
        options: [
          getSubjectTerm(subject, 0),
          getSubjectTerm(subject, 1),
          getSubjectTerm(subject, 2),
          getSubjectTerm(subject, 3)
        ],
        correctAnswer: getSubjectTerm(subject, 0),
        explanation: `${getSubjectTerm(subject, 0)} is closely associated with ${subject}.`
      },
      {
        question: `In ${subject}, what is the primary focus of study?`,
        options: [
          getSubjectFocus(subject, 0),
          getSubjectFocus(subject, 1),
          getSubjectFocus(subject, 2),
          getSubjectFocus(subject, 3)
        ],
        correctAnswer: getSubjectFocus(subject, 0),
        explanation: `${getSubjectFocus(subject, 0)} is the primary focus in ${subject}.`
      }
    ];

    const mediumQuestions = [
      {
        question: `Which principle is essential for understanding ${subject}?`,
        options: [
          getSubjectPrinciple(subject, 0),
          getSubjectPrinciple(subject, 1),
          getSubjectPrinciple(subject, 2),
          getSubjectPrinciple(subject, 3)
        ],
        correctAnswer: getSubjectPrinciple(subject, 0),
        explanation: `${getSubjectPrinciple(subject, 0)} is an essential principle in ${subject}.`
      },
      {
        question: `What method is commonly used in ${subject} research?`,
        options: [
          getSubjectMethod(subject, 0),
          getSubjectMethod(subject, 1),
          getSubjectMethod(subject, 2),
          getSubjectMethod(subject, 3)
        ],
        correctAnswer: getSubjectMethod(subject, 0),
        explanation: `${getSubjectMethod(subject, 0)} is commonly used in ${subject} research.`
      }
    ];

    const hardQuestions = [
      {
        question: `What is an advanced theory or concept in ${subject}?`,
        options: [
          getAdvancedConcept(subject, 0),
          getAdvancedConcept(subject, 1),
          getAdvancedConcept(subject, 2),
          getAdvancedConcept(subject, 3)
        ],
        correctAnswer: getAdvancedConcept(subject, 0),
        explanation: `${getAdvancedConcept(subject, 0)} represents advanced understanding in ${subject}.`
      }
    ];

    if (difficulty === 'easy') return easyQuestions;
    if (difficulty === 'medium') return mediumQuestions;
    return hardQuestions;
  }

  if (type === 'true-false') {
    return [
      {
        question: `${subject} involves the study of complex theoretical frameworks.`,
        correctAnswer: "true",
        explanation: `Yes, ${subject} typically involves complex theoretical frameworks.`
      },
      {
        question: `${subject} has no practical applications in the real world.`,
        correctAnswer: "false",
        explanation: `This is false - ${subject} has many practical applications.`
      },
      {
        question: `Research in ${subject} follows scientific methodologies.`,
        correctAnswer: "true",
        explanation: `Most fields including ${subject} use scientific research methodologies.`
      }
    ];
  }

  if (type === 'fill-blank') {
    return [
      {
        question: `The study of ${subject} focuses on ________.`,
        correctAnswer: getSubjectFocus(subject, 0),
        explanation: `The study of ${subject} focuses on ${getSubjectFocus(subject, 0)}.`
      },
      {
        question: `A key concept in ${subject} is ________.`,
        correctAnswer: getSubjectConcept(subject, 0),
        explanation: `${getSubjectConcept(subject, 0)} is indeed a key concept in ${subject}.`
      }
    ];
  }

  if (type === 'short-answer') {
    return [
      {
        question: `Explain the main principles of ${subject} in 2-3 sentences.`,
        correctAnswer: `${subject} is a field of study that focuses on ${getSubjectFocus(subject, 0)}. It involves understanding ${getSubjectConcept(subject, 0)} and applying ${getSubjectMethod(subject, 0)} to solve problems and advance knowledge.`,
        explanation: "This answer covers the main principles and applications of the subject."
      },
      {
        question: `What are the key applications of ${subject} in modern society?`,
        correctAnswer: `${subject} has numerous applications including research, problem-solving, and practical implementations that benefit society through ${getSubjectApplication(subject)}.`,
        explanation: "This highlights the practical relevance and societal impact of the subject."
      }
    ];
  }

  return [];
};

// Helper functions to generate subject-specific content
const getSubjectConcept = (subject: string, index: number) => {
  const concepts = [
    `Core ${subject} Theory`,
    `Fundamental ${subject} Principles`,
    `Basic ${subject} Concepts`,
    `Elementary ${subject} Ideas`
  ];
  return concepts[index] || concepts[0];
};

const getSubjectTerm = (subject: string, index: number) => {
  const terms = [
    `${subject} Terminology`,
    `${subject} Vocabulary`,
    `${subject} Definitions`,
    `${subject} Language`
  ];
  return terms[index] || terms[0];
};

const getSubjectFocus = (subject: string, index: number) => {
  const focuses = [
    `Understanding core principles and theories`,
    `Analyzing patterns and relationships`,
    `Solving complex problems`,
    `Exploring theoretical frameworks`
  ];
  return focuses[index] || focuses[0];
};

const getSubjectPrinciple = (subject: string, index: number) => {
  const principles = [
    `Systematic Analysis`,
    `Evidence-Based Reasoning`,
    `Theoretical Framework`,
    `Methodological Approach`
  ];
  return principles[index] || principles[0];
};

const getSubjectMethod = (subject: string, index: number) => {
  const methods = [
    `Empirical Research`,
    `Theoretical Analysis`,
    `Comparative Study`,
    `Experimental Design`
  ];
  return methods[index] || methods[0];
};

const getAdvancedConcept = (subject: string, index: number) => {
  const concepts = [
    `Advanced ${subject} Theory`,
    `Complex ${subject} Models`,
    `Interdisciplinary ${subject} Approaches`,
    `Cutting-edge ${subject} Research`
  ];
  return concepts[index] || concepts[0];
};

const getSubjectApplication = (subject: string) => {
  return `advancing our understanding of ${subject} and its practical implementations`;
};

export function generateQuestions(settings: QuizSettings): Question[] {
  // Use AI-powered generation for any subject
  return generateAIQuestions(settings);
}