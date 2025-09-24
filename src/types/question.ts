export type QuestionType = 'multiple-choice' | 'true-false' | 'fill-blank' | 'short-answer';
export type DifficultyLevel = 'easy' | 'medium' | 'hard';
export type Subject = string; // Allow any subject/theory

export interface Question {
  id: string;
  type: QuestionType;
  difficulty: DifficultyLevel;
  subject: Subject;
  question: string;
  options?: string[]; // For multiple choice
  correctAnswer: string | string[]; // Can be array for multiple correct answers
  explanation?: string;
}

export interface QuizSettings {
  subject: Subject;
  difficulty: DifficultyLevel;
  questionType: QuestionType;
  questionCount: number;
}

export interface QuizState {
  currentQuestion: number;
  score: number;
  answers: Record<string, string>;
  timeSpent: number;
  isComplete: boolean;
}