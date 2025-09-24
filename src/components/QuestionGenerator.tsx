import React, { useState } from 'react';
import { SubjectSelector } from './SubjectSelector';
import { DifficultySelector } from './DifficultySelector';
import { QuestionTypeSelector } from './QuestionTypeSelector';
import { QuestionDisplay } from './QuestionDisplay';
import { LoadingScreen } from './LoadingScreen';
import { ResultsScreen } from './ResultsScreen';
import { QuizSettings, Question, QuizState } from '@/types/question';
import { generateQuestions } from '@/lib/questionGenerator';

type Screen = 'subject' | 'difficulty' | 'type' | 'loading' | 'question' | 'results';

const QuestionGenerator = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('subject');
  const [quizSettings, setQuizSettings] = useState<Partial<QuizSettings>>({});
  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    score: 0,
    answers: {},
    timeSpent: 0,
    isComplete: false,
  });

  const handleSubjectSelect = (subject: QuizSettings['subject']) => {
    setQuizSettings(prev => ({ ...prev, subject }));
    setCurrentScreen('difficulty');
  };

  const handleDifficultySelect = (difficulty: QuizSettings['difficulty']) => {
    setQuizSettings(prev => ({ ...prev, difficulty }));
    setCurrentScreen('type');
  };

  const handleQuestionTypeSelect = (questionType: QuizSettings['questionType']) => {
    const finalSettings = { ...quizSettings, questionType, questionCount: 5 } as QuizSettings;
    setQuizSettings(finalSettings);
    setCurrentScreen('loading');
    
    // Simulate loading and generate questions
    setTimeout(() => {
      const generatedQuestions = generateQuestions(finalSettings);
      setQuestions(generatedQuestions);
      setCurrentScreen('question');
    }, 2000);
  };

  const handleAnswerSubmit = (questionId: string, answer: string) => {
    const question = questions[quizState.currentQuestion];
    const isCorrect = Array.isArray(question.correctAnswer) 
      ? question.correctAnswer.includes(answer)
      : question.correctAnswer === answer;

    setQuizState(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: answer },
      score: isCorrect ? prev.score + 1 : prev.score,
    }));

    if (quizState.currentQuestion + 1 < questions.length) {
      setQuizState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
      }));
    } else {
      setQuizState(prev => ({ ...prev, isComplete: true }));
      setCurrentScreen('results');
    }
  };

  const resetQuiz = () => {
    setCurrentScreen('subject');
    setQuizSettings({});
    setQuestions([]);
    setQuizState({
      currentQuestion: 0,
      score: 0,
      answers: {},
      timeSpent: 0,
      isComplete: false,
    });
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'subject':
        return <SubjectSelector onSelect={handleSubjectSelect} />;
      case 'difficulty':
        return (
          <DifficultySelector 
            onSelect={handleDifficultySelect}
            onBack={() => setCurrentScreen('subject')}
            selectedSubject={quizSettings.subject!}
          />
        );
      case 'type':
        return (
          <QuestionTypeSelector 
            onSelect={handleQuestionTypeSelect}
            onBack={() => setCurrentScreen('difficulty')}
            settings={quizSettings as { subject: string; difficulty: string }}
          />
        );
      case 'loading':
        return <LoadingScreen settings={quizSettings as QuizSettings} />;
      case 'question':
        return (
          <QuestionDisplay
            question={questions[quizState.currentQuestion]}
            questionNumber={quizState.currentQuestion + 1}
            totalQuestions={questions.length}
            onAnswerSubmit={handleAnswerSubmit}
          />
        );
      case 'results':
        return (
          <ResultsScreen
            score={quizState.score}
            totalQuestions={questions.length}
            answers={quizState.answers}
            questions={questions}
            onRestart={resetQuiz}
          />
        );
      default:
        return <SubjectSelector onSelect={handleSubjectSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      {renderCurrentScreen()}
    </div>
  );
};

export default QuestionGenerator;