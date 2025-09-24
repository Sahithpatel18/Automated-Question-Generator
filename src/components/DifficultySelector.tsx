import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DifficultyLevel, Subject } from '@/types/question';
import { ArrowLeft, Brain, Zap, Target } from 'lucide-react';

interface DifficultySelectorProps {
  onSelect: (difficulty: DifficultyLevel) => void;
  onBack: () => void;
  selectedSubject: Subject;
}

const difficulties = [
  { 
    id: 'easy' as DifficultyLevel, 
    name: 'Easy', 
    icon: Brain,
    color: 'bg-gradient-success',
    description: 'Perfect for beginners and basic concept review',
    features: ['Fundamental concepts', 'Clear explanations', 'Basic problem solving']
  },
  { 
    id: 'medium' as DifficultyLevel, 
    name: 'Medium', 
    icon: Zap,
    color: 'bg-gradient-accent', 
    description: 'Intermediate level for skill building',
    features: ['Applied knowledge', 'Multi-step problems', 'Critical thinking']
  },
  { 
    id: 'hard' as DifficultyLevel, 
    name: 'Hard', 
    icon: Target,
    color: 'bg-gradient-primary',
    description: 'Advanced challenges for expert-level practice',
    features: ['Complex scenarios', 'Advanced concepts', 'Problem synthesis']
  },
];

const subjectTitles: Record<Subject, string> = {
  mathematics: 'Mathematics',
  science: 'Science',
  history: 'History',
  english: 'English',
  geography: 'Geography',
};

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({ 
  onSelect, 
  onBack, 
  selectedSubject 
}) => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Subjects
          </Button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Choose Difficulty Level
          </h1>
          <p className="text-xl text-muted-foreground">
            Select the appropriate difficulty for your <span className="font-semibold text-primary">{subjectTitles[selectedSubject]}</span> questions
          </p>
        </div>

        {/* Difficulty Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {difficulties.map((difficulty) => (
            <Card 
              key={difficulty.id} 
              className="cursor-pointer hover:shadow-strong transition-all duration-300 hover:-translate-y-2 border-0 shadow-medium relative overflow-hidden group"
              onClick={() => onSelect(difficulty.id)}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                <div className={`w-full h-full ${difficulty.color.replace('bg-gradient-', 'bg-gradient-to-br from-')} to-transparent`}></div>
              </div>
              
              <CardHeader className="text-center pb-4 relative z-10">
                <div className={`mx-auto mb-4 p-4 rounded-full ${difficulty.color} w-16 h-16 flex items-center justify-center shadow-soft`}>
                  <difficulty.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold">{difficulty.name}</CardTitle>
              </CardHeader>
              
              <CardContent className="text-center relative z-10">
                <p className="text-muted-foreground mb-6">{difficulty.description}</p>
                
                <div className="space-y-2 mb-6">
                  {difficulty.features.map((feature, index) => (
                    <div key={index} className="flex items-center justify-center text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                      {feature}
                    </div>
                  ))}
                </div>
                
                <Button variant="gradient" className="w-full">
                  Select {difficulty.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mt-12">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <div className="w-8 h-1 bg-primary rounded-full"></div>
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <div className="w-8 h-1 bg-muted rounded-full"></div>
            <div className="w-3 h-3 bg-muted rounded-full"></div>
            <div className="w-8 h-1 bg-muted rounded-full"></div>
            <div className="w-3 h-3 bg-muted rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};