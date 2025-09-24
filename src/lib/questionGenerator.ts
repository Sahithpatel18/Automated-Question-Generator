import { Question, QuizSettings } from '@/types/question';

// Sample question bank - in a real app, this would come from an API or database
const questionBank = {
  mathematics: {
    easy: {
      'multiple-choice': [
        {
          question: "What is 5 + 3?",
          options: ["6", "7", "8", "9"],
          correctAnswer: "8",
          explanation: "5 + 3 = 8. This is basic addition."
        },
        {
          question: "Which number is larger: 15 or 12?",
          options: ["15", "12", "They are equal", "Cannot determine"],
          correctAnswer: "15",
          explanation: "15 is greater than 12."
        },
        {
          question: "What is 4 × 2?",
          options: ["6", "8", "10", "12"],
          correctAnswer: "8",
          explanation: "4 × 2 = 8. This is basic multiplication."
        }
      ],
      'true-false': [
        {
          question: "7 is greater than 5.",
          correctAnswer: "true",
          explanation: "Yes, 7 is indeed greater than 5."
        },
        {
          question: "2 + 2 equals 5.",
          correctAnswer: "false",
          explanation: "2 + 2 equals 4, not 5."
        }
      ],
      'fill-blank': [
        {
          question: "3 + 4 = ____",
          correctAnswer: "7",
          explanation: "3 + 4 = 7"
        },
        {
          question: "10 - 6 = ____",
          correctAnswer: "4",
          explanation: "10 - 6 = 4"
        }
      ]
    },
    medium: {
      'multiple-choice': [
        {
          question: "What is the value of x in the equation 2x + 5 = 15?",
          options: ["3", "5", "7", "10"],
          correctAnswer: "5",
          explanation: "2x + 5 = 15, so 2x = 10, therefore x = 5"
        },
        {
          question: "What is the area of a rectangle with length 8 and width 6?",
          options: ["14", "28", "48", "56"],
          correctAnswer: "48",
          explanation: "Area = length × width = 8 × 6 = 48"
        }
      ]
    },
    hard: {
      'multiple-choice': [
        {
          question: "What is the derivative of x² + 3x - 2?",
          options: ["2x + 3", "x² + 3", "2x - 2", "x + 3"],
          correctAnswer: "2x + 3",
          explanation: "The derivative of x² is 2x, the derivative of 3x is 3, and the derivative of a constant is 0."
        }
      ]
    }
  },
  science: {
    easy: {
      'multiple-choice': [
        {
          question: "What gas do plants produce during photosynthesis?",
          options: ["Carbon Dioxide", "Oxygen", "Nitrogen", "Hydrogen"],
          correctAnswer: "Oxygen",
          explanation: "During photosynthesis, plants convert carbon dioxide and water into glucose and oxygen using sunlight."
        },
        {
          question: "How many legs does a spider have?",
          options: ["6", "8", "10", "12"],
          correctAnswer: "8",
          explanation: "Spiders are arachnids and have 8 legs."
        }
      ],
      'true-false': [
        {
          question: "The Sun is a star.",
          correctAnswer: "true",
          explanation: "The Sun is indeed a star - it's the closest star to Earth."
        }
      ]
    }
  },
  history: {
    easy: {
      'multiple-choice': [
        {
          question: "In which year did World War II end?",
          options: ["1943", "1944", "1945", "1946"],
          correctAnswer: "1945",
          explanation: "World War II ended in 1945 with the surrender of Japan."
        }
      ]
    }
  },
  english: {
    easy: {
      'multiple-choice': [
        {
          question: "What is the plural form of 'child'?",
          options: ["childs", "childes", "children", "child"],
          correctAnswer: "children",
          explanation: "The plural of 'child' is 'children' - an irregular plural form."
        }
      ]
    }
  },
  geography: {
    easy: {
      'multiple-choice': [
        {
          question: "What is the capital of France?",
          options: ["London", "Berlin", "Paris", "Madrid"],
          correctAnswer: "Paris",
          explanation: "Paris is the capital and largest city of France."
        }
      ]
    }
  }
};

export function generateQuestions(settings: QuizSettings): Question[] {
  const { subject, difficulty, questionType, questionCount } = settings;
  
  // Get questions from the question bank
  const subjectQuestions = questionBank[subject];
  if (!subjectQuestions) return [];
  
  const difficultyQuestions = subjectQuestions[difficulty];
  if (!difficultyQuestions) return [];
  
  const typeQuestions = difficultyQuestions[questionType];
  if (!typeQuestions) return [];
  
  // Generate the requested number of questions
  const questions: Question[] = [];
  
  for (let i = 0; i < Math.min(questionCount, typeQuestions.length); i++) {
    const questionData = typeQuestions[i];
    
    questions.push({
      id: `${subject}-${difficulty}-${questionType}-${i}`,
      type: questionType,
      difficulty,
      subject,
      question: questionData.question,
      options: questionData.options || undefined,
      correctAnswer: questionData.correctAnswer,
      explanation: questionData.explanation
    });
  }
  
  // If we need more questions than available, repeat some
  while (questions.length < questionCount) {
    const randomIndex = Math.floor(Math.random() * typeQuestions.length);
    const questionData = typeQuestions[randomIndex];
    
    questions.push({
      id: `${subject}-${difficulty}-${questionType}-${questions.length}`,
      type: questionType,
      difficulty,
      subject,
      question: questionData.question,
      options: questionData.options || undefined,
      correctAnswer: questionData.correctAnswer,
      explanation: questionData.explanation
    });
  }
  
  return questions;
}