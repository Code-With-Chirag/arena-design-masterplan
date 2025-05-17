import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useChallenges } from '../context/ChallengeContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Trophy, Edit, Trash2, PlusCircle, ArrowRight, Eye, Send, Users } from 'lucide-react';

const SponsorDashboardPage: React.FC = () => {
  const { profile, signOut } = useAuth();
  const { createdChallenges, deleteChallenge, getSubmissionsForChallenge } = useChallenges();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      // Clear local storage to ensure clean state
      localStorage.removeItem('acceptedChallenges');
      localStorage.removeItem('createdChallenges');
      localStorage.removeItem('allChallenges');
      localStorage.removeItem('submissions');
      // Navigate to login page
      navigate('/login');
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };
  
  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Handle challenge deletion
  const handleDeleteChallenge = (challengeId: string) => {
    if (window.confirm('Are you sure you want to delete this challenge? This action cannot be undone.')) {
      deleteChallenge(challengeId);
    }
  };
  
  // Get submission count for a challenge
  const getSubmissionCount = (challengeId: string) => {
    return getSubmissionsForChallenge(challengeId).length;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Sponsor Dashboard</h1>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Sign Out
            </button>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
            <h2 className="text-lg font-semibold mb-2">Welcome, {profile?.full_name}!</h2>
            <p className="text-gray-700">
              This is your sponsor dashboard where you can create challenges and review submissions.
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">{profile?.full_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{profile?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Role</p>
                  <p className="font-medium capitalize">{profile?.role}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Company Name</p>
                  <p className="font-medium">
                    {profile?.company_name ? (
                      profile.company_name
                    ) : (
                      <span className="text-gray-400">Not set</span>
                    )}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <Link 
                  to="/profile" 
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Edit Profile →
                </Link>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Your Challenges</h2>
              <Link to="/dashboard/sponsor/create-challenge">
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" /> Create Challenge
                </Button>
              </Link>
            </div>
            
            {createdChallenges.length > 0 ? (
              <div className="space-y-4">
                {createdChallenges.map(challenge => (
                  <Card key={challenge.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{challenge.title}</CardTitle>
                          <CardDescription>Created by you</CardDescription>
                        </div>
                        <Badge variant="outline" className={
                          challenge.difficulty === "Beginner" ? "bg-green-50 text-green-700" : 
                          challenge.difficulty === "Intermediate" ? "bg-amber-50 text-amber-700" : 
                          "bg-red-50 text-red-700"
                        }>
                          {challenge.difficulty}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-gray-700 mb-4 line-clamp-2">{challenge.description}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center text-gray-600">
                          <CalendarDays className="mr-1 h-4 w-4" />
                          <span>Deadline: {formatDate(challenge.deadline)}</span>
                        </div>
                        
                        <div className="flex items-center text-indigo-600 font-medium">
                          <Trophy className="mr-1 h-4 w-4" />
                          <span>Prize: {challenge.prize}</span>
                        </div>
                        
                        {challenge.category && (
                          <Badge variant="outline" className="bg-indigo-50 text-indigo-700">
                            {challenge.category}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                    
                    <CardFooter className="border-t pt-4 flex justify-between">
                      <div className="space-x-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/challenges/${challenge.id}`}>
                            <Eye className="mr-1 h-4 w-4" /> View
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="mr-1 h-4 w-4" /> Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDeleteChallenge(challenge.id)}
                        >
                          <Trash2 className="mr-1 h-4 w-4" /> Delete
                        </Button>
                      </div>
                      
                      <div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          asChild
                          className={getSubmissionCount(challenge.id) > 0 ? "text-indigo-600" : "text-gray-500"}
                        >
                          <Link to={`/challenges/${challenge.id}`} state={{ activeTab: "submissions" }}>
                            <Send className="mr-1 h-4 w-4" />
                            Submissions {getSubmissionCount(challenge.id) > 0 && (
                              <Badge variant="secondary" className="ml-1">
                                {getSubmissionCount(challenge.id)}
                              </Badge>
                            )}
                          </Link>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <p className="text-gray-500 mb-4">
                  You haven't created any challenges yet. Create your first challenge to get started.
                </p>
                <Link to="/dashboard/sponsor/create-challenge">
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> Create Your First Challenge
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorDashboardPage;
