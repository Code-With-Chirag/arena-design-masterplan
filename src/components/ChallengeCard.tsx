
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, ArrowRight } from 'lucide-react';
import { cn } from "@/lib/utils";

type Challenge = {
  id: string;
  title: string;
  sponsor: string;
  description: string;
  deadline: string;
  status: string;
  difficulty: string;
  logo: string;
  prize: string;
  category?: string;
};

interface ChallengeCardProps {
  challenge: Challenge;
  className?: string;
}

const ChallengeCard = ({ challenge, className }: ChallengeCardProps) => {
  // Format the deadline date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Calculate days remaining until deadline
  const getDaysRemaining = (deadlineString: string) => {
    const today = new Date();
    const deadline = new Date(deadlineString);
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  const daysRemaining = getDaysRemaining(challenge.deadline);
  
  // Determine if the challenge is ending soon (within 7 days)
  const isEndingSoon = daysRemaining > 0 && daysRemaining <= 7;
  
  // Badge styles based on difficulty
  const difficultyStyles = {
    Beginner: "bg-green-50 text-green-700 hover:bg-green-50",
    Intermediate: "bg-amber-50 text-amber-700 hover:bg-amber-50",
    Advanced: "bg-red-50 text-red-700 hover:bg-red-50"
  };
  
  return (
    <Card className={cn("overflow-hidden transition-shadow hover:shadow-md", className)}>
      <CardContent className="p-0">
        {/* Card Header */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 border-b">
          <div className="flex items-start gap-3">
            <div className="bg-white p-1.5 rounded border">
              <img 
                src={challenge.logo} 
                alt={`${challenge.sponsor} logo`} 
                className="w-8 h-8 object-contain" 
              />
            </div>
            <div>
              <p className="text-sm text-gray-500">{challenge.sponsor}</p>
              <h3 className="font-semibold text-lg line-clamp-2">{challenge.title}</h3>
            </div>
          </div>
        </div>
        
        {/* Card Body */}
        <div className="p-4">
          <p className="text-gray-600 text-sm line-clamp-3 mb-4">
            {challenge.description}
          </p>
          
          {/* Tags/Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {challenge.difficulty && (
              <Badge variant="outline" className={difficultyStyles[challenge.difficulty] || ""}>
                {challenge.difficulty}
              </Badge>
            )}
            
            {challenge.category && (
              <Badge variant="outline" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-50">
                {challenge.category}
              </Badge>
            )}
            
            {/* Conditionally show "Ending Soon" badge */}
            {isEndingSoon && (
              <Badge variant="outline" className="bg-rose-50 text-rose-700 hover:bg-rose-50">
                Ending Soon
              </Badge>
            )}
          </div>
          
          {/* Prize & Deadline */}
          <div className="flex justify-between items-center">
            <div className="text-indigo-700 font-semibold">
              {challenge.prize}
            </div>
            
            <div className="flex items-center text-gray-500 text-sm">
              <CalendarDays className="w-3.5 h-3.5 mr-1" /> 
              {formatDate(challenge.deadline)}
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="bg-gray-50 border-t p-3">
        <Link 
          to={`/challenge/${challenge.id}`} 
          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium w-full flex justify-between items-center"
        >
          View Challenge
          <ArrowRight className="w-4 h-4" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ChallengeCard;
