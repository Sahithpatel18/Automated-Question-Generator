import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Subject } from '@/types/question';
import { Calculator, Beaker, Clock, BookOpen, Globe } from 'lucide-react';
import heroEducationImage from '@/assets/hero-education.jpg';

interface SubjectSelectorProps {
  onSelect: (subject: Subject) => void;
}

const subjects = [
  { id: 'mathematics' as Subject, name: 'Mathematics', icon: Calculator, color: 'text-blue-600', description: 'Algebra, Geometry, Calculus' },
  { id: 'science' as Subject, name: 'Science', icon: Beaker, color: 'text-green-600', description: 'Physics, Chemistry, Biology' },
  { id: 'history' as Subject, name: 'History', icon: Clock, color: 'text-amber-600', description: 'World History, Ancient Civilizations' },
  { id: 'english' as Subject, name: 'English', icon: BookOpen, color: 'text-purple-600', description: 'Literature, Grammar, Writing' },
  { id: 'geography' as Subject, name: 'Geography', icon: Globe, color: 'text-emerald-600', description: 'World Geography, Climate, Capitals' },
];

export const SubjectSelector: React.FC<SubjectSelectorProps> = ({ onSelect }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="relative mb-8">
          <img 
            src={heroEducationImage} 
            alt="Educational learning illustration" 
            className="mx-auto rounded-3xl shadow-strong max-w-2xl w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero/20 rounded-3xl"></div>
        </div>
        <h1 className="text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
          Question Generator
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Create personalized educational questions tailored to your learning needs. 
          Choose your subject and let AI generate questions at your preferred difficulty level.
        </p>
      </div>

      {/* Subject Selection */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-8">Select Your Subject</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <Card 
              key={subject.id} 
              className="cursor-pointer hover:shadow-medium transition-all duration-300 hover:-translate-y-2 border-0 shadow-soft"
              onClick={() => onSelect(subject.id)}
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 rounded-full bg-gradient-primary w-16 h-16 flex items-center justify-center shadow-soft">
                  <subject.icon className={`h-8 w-8 text-white`} />
                </div>
                <CardTitle className="text-xl">{subject.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-6">{subject.description}</p>
                <Button variant="gradient" className="w-full">
                  Choose {subject.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-16 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="w-12 h-12 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white font-bold text-xl">3</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Difficulty Levels</h3>
            <p className="text-muted-foreground">Easy, Medium, and Hard questions adapted to your skill level</p>
          </div>
          <div className="p-6">
            <div className="w-12 h-12 bg-gradient-accent rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white font-bold text-xl">4</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Question Types</h3>
            <p className="text-muted-foreground">Multiple choice, true/false, fill-in-the-blank, and short answer</p>
          </div>
          <div className="p-6">
            <div className="w-12 h-12 bg-gradient-success rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white font-bold text-xl">∞</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Unlimited Practice</h3>
            <p className="text-muted-foreground">Generate as many questions as you need for effective learning</p>
          </div>
        </div>
      </div>
    </div>
  );
};