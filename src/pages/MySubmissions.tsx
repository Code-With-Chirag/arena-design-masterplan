
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const MySubmissions = () => {
  // Mock data for demo purposes
  const submissions = [
    // Empty array for now - will be populated from API later
  ];

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Submissions</h1>
        <Button asChild variant="outline" size="sm">
          <Link to="/builder-dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      {submissions.length > 0 ? (
        <div className="space-y-4">
          {/* Submission items would be mapped here */}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No Submissions Yet</CardTitle>
          </CardHeader>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground mb-6">
              You haven't made any submissions yet. Find an interesting challenge and showcase your skills!
            </p>
            <Button asChild>
              <Link to="/challenges">Explore Challenges to Get Started</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MySubmissions;
