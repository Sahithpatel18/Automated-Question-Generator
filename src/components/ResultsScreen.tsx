import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Question } from '@/types/question';
import { Trophy, RefreshCw, CheckCircle, XCircle, Target, Clock } from 'lucide-react';

interface ResultsScreenProps {
  score: number;
  totalQuestions: number;
  answers: Record<string, string>;
  questions: Question[];
  onRestart: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  score,
  totalQuestions,
  answers,
  questions,
  onRestart,
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getScoreGrade = () => {
    if (percentage >= 90) return { grade: 'A+', color: 'text-success', message: 'Outstanding!' };
    if (percentage >= 80) return { grade: 'A', color: 'text-success', message: 'Excellent work!' };
    if (percentage >= 70) return { grade: 'B', color: 'text-warning', message: 'Good job!' };
    if (percentage >= 60) return { grade: 'C', color: 'text-warning', message: 'Keep practicing!' };
    return { grade: 'D', color: 'text-destructive', message: 'Need more study!' };
  };

  const { grade, color, message } = getScoreGrade();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Results Header */}
        <div className="text-center mb-12">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-hero rounded-full flex items-center justify-center shadow-strong">
            <Trophy className="h-16 w-16 text-white" />
          </div>
          
          <h1 className="text-5xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            Quiz Complete!
          </h1>
          
          <div className="bg-card rounded-3xl p-8 shadow-medium mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className={`text-6xl font-bold mb-2 ${color}`}>
                  {percentage}%
                </div>
                <div className="text-muted-foreground">Final Score</div>
              </div>
              
              <div>
                <div className={`text-6xl font-bold mb-2 ${color}`}>
                  {grade}
                </div>
                <div className="text-muted-foreground">Grade</div>
              </div>
              
              <div>
                <div className="text-3xl font-bold mb-2 text-foreground">
                  {score}/{totalQuestions}
                </div>
                <div className="text-muted-foreground">Questions Correct</div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-border">
              <p className={`text-xl font-semibold ${color}`}>{message}</p>
            </div>
          </div>
        </div>

        {/* Question Review */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Review Your Answers</h2>
          
          <div className="space-y-4">
            {questions.map((question, index) => {
              const userAnswer = answers[question.id];
              const isCorrect = Array.isArray(question.correctAnswer)
                ? question.correctAnswer.includes(userAnswer)
                : question.correctAnswer.toLowerCase() === userAnswer?.toLowerCase();

              return (
                <Card key={question.id} className="shadow-soft border-0">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                          isCorrect ? 'bg-success' : 'bg-destructive'
                        }`}>
                          {index + 1}
                        </div>
                        <CardTitle className="text-lg">{question.question}</CardTitle>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {isCorrect ? (
                          <div className="flex items-center space-x-1 text-success">
                            <CheckCircle className="h-4 w-4" />
                            <span className="text-sm font-medium">Correct</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-1 text-destructive">
                            <XCircle className="h-4 w-4" />
                            <span className="text-sm font-medium">Incorrect</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Your Answer:</div>
                        <div className={`font-medium ${isCorrect ? 'text-success' : 'text-destructive'}`}>
                          {userAnswer || 'No answer provided'}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Correct Answer:</div>
                        <div className="font-medium text-success">
                          {Array.isArray(question.correctAnswer) 
                            ? question.correctAnswer.join(', ')
                            : question.correctAnswer
                          }
                        </div>
                      </div>
                    </div>
                    
                    {question.explanation && (
                      <div className="mt-4 p-3 bg-secondary/50 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Explanation:</div>
                        <p className="text-sm">{question.explanation}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Performance Stats */}
        <Card className="shadow-medium border-0 mb-8">
          <CardHeader>
            <CardTitle className="text-center">Performance Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-success rounded-full flex items-center justify-center mb-3">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-success">{score}</div>
                <div className="text-sm text-muted-foreground">Correct Answers</div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-3">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-primary">{percentage}%</div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mb-3">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-accent">{totalQuestions}</div>
                <div className="text-sm text-muted-foreground">Total Questions</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="text-center">
          <Button 
            onClick={onRestart}
            variant="hero"
            size="lg"
            className="min-w-48"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Take Another Quiz
          </Button>
        </div>
      </div>
    </div>
  );
};