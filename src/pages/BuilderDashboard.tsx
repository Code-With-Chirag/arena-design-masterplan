
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Trophy, Tag } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useChallenges } from "@/context/ChallengeContext";
import { Badge } from "@/components/ui/badge";

const BuilderDashboard = () => {
  const { user, profile } = useAuth();
  const { acceptedChallenges } = useChallenges();
  
  // Stats data
  const stats = {
    level: 1,
    xp: 0,
    activeChallengesTotalCount: acceptedChallenges.length,
    submissionsCount: 0
  };

  const recentSubmissions = [
    // Empty array for now, will be populated from API later
  ];
  
  // Format date function
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

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Welcome back, Builder!</h1>
      
      {/* Overview Panel / Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Current Level</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.level}</p>
            <p className="text-sm text-muted-foreground">{stats.xp} XP</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Challenges</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.activeChallengesTotalCount}</p>
            <p className="text-sm text-muted-foreground">Available to join</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.submissionsCount}</p>
            <p className="text-sm text-muted-foreground">All time</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Challenges Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Active Challenges</CardTitle>
          <CardDescription>Challenges you've accepted</CardDescription>
        </CardHeader>
        <CardContent>
          {acceptedChallenges.length > 0 ? (
            <div className="space-y-4">
              {acceptedChallenges.map(challenge => (
                <div key={challenge.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <div className="bg-white p-1.5 rounded border">
                        <img 
                          src={challenge.logo} 
                          alt={`${challenge.sponsor} logo`} 
                          className="w-8 h-8 object-contain" 
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{challenge.title}</h3>
                        <p className="text-sm text-gray-500">{challenge.sponsor}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={challenge.difficulty === "Beginner" ? "bg-green-50 text-green-700" : 
                                                     challenge.difficulty === "Intermediate" ? "bg-amber-50 text-amber-700" : 
                                                     "bg-red-50 text-red-700"}>
                      {challenge.difficulty}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{challenge.description}</p>
                  
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center text-indigo-600 font-medium">
                      <Trophy className="w-4 h-4 mr-1" /> {challenge.prize}
                    </div>
                    
                    <div className="flex items-center text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" /> 
                      <span>Deadline: {formatDate(challenge.deadline)}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <Button asChild variant="outline" size="sm">
                      <Link to={`/challenges/${challenge.id}`}>
                        View Details <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">You haven't accepted any challenges yet.</p>
              <Button asChild>
                <Link to="/challenges">
                  Explore Active Challenges <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
        {acceptedChallenges.length > 0 && (
          <CardFooter>
            <Button asChild variant="outline">
              <Link to="/challenges">
                Explore More Challenges <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        )}
      </Card>

      {/* Recent Submissions Section */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Submissions</CardTitle>
          <CardDescription>Track your recent challenge submissions</CardDescription>
        </CardHeader>
        <CardContent>
          {recentSubmissions.length > 0 ? (
            <div className="space-y-4">
              {/* Submission items would go here */}
              <p>Your recent submissions will appear here.</p>
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-muted-foreground mb-4">You haven't made any submissions yet.</p>
              <Button asChild variant="outline">
                <Link to="/challenges">Find a Challenge to Solve</Link>
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button asChild variant="outline">
            <Link to="/my-submissions">
              View All Submissions <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BuilderDashboard;
