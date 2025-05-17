
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const BuilderDashboard = () => {
  // Mock data for demo purposes
  const stats = {
    level: 1,
    xp: 0,
    activeChallengesTotalCount: 5,
    submissionsCount: 0
  };

  const recentSubmissions = [
    // Empty array for now, will be populated from API later
  ];

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
          <CardDescription>Find interesting AI challenges to participate in</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Discover and join open challenges from top AI companies.</p>
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link to="/challenges">
              Explore Active Challenges <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
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
