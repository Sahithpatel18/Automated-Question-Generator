import React from 'react';
import { QuizSettings } from '@/types/question';
import { Loader2, Brain, Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  settings: QuizSettings;
}

const loadingMessages = [
  "Analyzing your preferences...",
  "Generating personalized questions...",
  "Tailoring difficulty level...",
  "Preparing your learning experience...",
  "Almost ready to challenge you!",
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ settings }) => {
  const [currentMessage, setCurrentMessage] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % loadingMessages.length);
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="text-center max-w-2xl mx-auto px-4">
        {/* Animated Brain Icon */}
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto bg-gradient-hero rounded-full flex items-center justify-center shadow-strong animate-pulse">
            <Brain className="h-16 w-16 text-white" />
          </div>
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-accent rounded-full flex items-center justify-center animate-bounce">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-success rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
        </div>

        {/* Loading Title */}
        <h1 className="text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
          Creating Your Questions
        </h1>

        {/* Settings Summary */}
        <div className="bg-card rounded-2xl p-6 shadow-medium mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Subject</div>
              <div className="font-semibold capitalize text-primary">{settings.subject}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Difficulty</div>
              <div className="font-semibold capitalize text-accent">{settings.difficulty}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Type</div>
              <div className="font-semibold capitalize text-success">{settings.questionType.replace('-', ' ')}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Questions</div>
              <div className="font-semibold text-foreground">{settings.questionCount}</div>
            </div>
          </div>
        </div>

        {/* Loading Animation */}
        <div className="mb-6">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <div className="h-2 bg-secondary rounded-full overflow-hidden max-w-md mx-auto">
            <div 
              className="h-full bg-gradient-primary rounded-full transition-all duration-300 animate-pulse"
              style={{ width: `${((currentMessage + 1) / loadingMessages.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Loading Message */}
        <p className="text-lg text-muted-foreground mb-8 min-h-[28px]">
          {loadingMessages[currentMessage]}
        </p>

        {/* Fun Facts */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-4">
          <p className="text-sm text-muted-foreground">
            💡 <strong>Did you know?</strong> Spaced repetition and active recall are two of the most effective learning techniques!
          </p>
        </div>
      </div>
    </div>
  );
};