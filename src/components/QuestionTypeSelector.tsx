import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QuestionType } from '@/types/question';
import { ArrowLeft, CheckCircle, HelpCircle, Edit3, FileText } from 'lucide-react';

interface QuestionTypeSelectorProps {
  onSelect: (type: QuestionType) => void;
  onBack: () => void;
  settings: { subject: string; difficulty: string };
}

const questionTypes = [
  {
    id: 'multiple-choice' as QuestionType,
    name: 'Multiple Choice',
    icon: CheckCircle,
    description: 'Choose the correct answer from multiple options',
    example: 'What is 2 + 2?\nA) 3  B) 4  C) 5  D) 6',
    color: 'bg-gradient-primary',
  },
  {
    id: 'true-false' as QuestionType,
    name: 'True / False',
    icon: HelpCircle,
    description: 'Determine if statements are true or false',
    example: 'The Earth revolves around the Sun.\nTrue or False?',
    color: 'bg-gradient-accent',
  },
  {
    id: 'fill-blank' as QuestionType,
    name: 'Fill in the Blank',
    icon: Edit3,
    description: 'Complete sentences by filling in missing words',
    example: 'The capital of France is ______.',
    color: 'bg-gradient-success',
  },
  {
    id: 'short-answer' as QuestionType,
    name: 'Short Answer',
    icon: FileText,
    description: 'Provide brief written responses to questions',
    example: 'Explain the water cycle in 2-3 sentences.',
    color: 'bg-gradient-primary',
  },
];

export const QuestionTypeSelector: React.FC<QuestionTypeSelectorProps> = ({
  onSelect,
  onBack,
  settings,
}) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Difficulty
          </Button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Question Format</h1>
          <p className="text-xl text-muted-foreground mb-2">
            Choose your preferred question type for{' '}
            <span className="font-semibold text-primary capitalize">{settings.difficulty}</span>{' '}
            <span className="font-semibold text-primary">{settings.subject.split('-').map(word => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ')}</span>{' '}
            questions
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-secondary rounded-full text-sm text-muted-foreground">
            Each quiz will contain 5 questions of your selected type
          </div>
        </div>

        {/* Question Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {questionTypes.map((type) => (
            <Card
              key={type.id}
              className="cursor-pointer hover:shadow-strong transition-all duration-300 hover:-translate-y-2 border-0 shadow-medium relative overflow-hidden group"
              onClick={() => onSelect(type.id)}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                <div className={`w-full h-full ${type.color.replace('bg-gradient-', 'bg-gradient-to-br from-')} to-transparent`}></div>
              </div>

              <CardHeader className="pb-4 relative z-10">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-xl ${type.color} shadow-soft flex-shrink-0`}>
                    <type.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl font-bold mb-2">{type.name}</CardTitle>
                    <p className="text-muted-foreground text-sm">{type.description}</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="relative z-10">
                <div className="bg-secondary/50 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2 uppercase tracking-wide">
                    Example:
                  </h4>
                  <p className="text-sm font-mono whitespace-pre-line">{type.example}</p>
                </div>

                <Button variant="gradient" className="w-full">
                  Generate {type.name} Questions
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
            <div className="w-8 h-1 bg-primary rounded-full"></div>
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <div className="w-8 h-1 bg-muted rounded-full"></div>
            <div className="w-3 h-3 bg-muted rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};