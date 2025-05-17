
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Trophy, ChevronLeft, FileText, CheckSquare, Database, Check, PlusCircle, ExternalLink, Send } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from "@/context/AuthContext";
import { useChallenges } from "@/context/ChallengeContext";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";



const ChallengeDetail = () => {
  const { challengeId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile } = useAuth();
  const { addChallenge, isAccepted, submitChallenge, getSubmissionsForChallenge } = useChallenges();
  
  const [submissionLink, setSubmissionLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  
  // Set active tab if coming from sponsor dashboard with state
  useEffect(() => {
    if (location.state && location.state.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);
  
  const isLoggedIn = !!user;
  const userRole = profile?.role || "guest";
  
  // Get challenge data based on challengeId
  const { getChallengeById } = useChallenges();
  const challenge = challengeId ? getChallengeById(challengeId) : null;
  
  if (!challenge) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Challenge not found</h1>
          <p className="mb-6">The challenge you're looking for doesn't exist or has been removed.</p>
          <Link to="/challenges">
            <Button>
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to Challenges
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  // Determine if user can submit (builder, logged in, challenge active)
  const canSubmit = isLoggedIn && userRole === "builder" && challenge.status === "active";
  
  // Check if the challenge is already accepted
  const challengeAccepted = isAccepted(challenge.id);
  
  // Get submissions for this challenge
  const challengeSubmissions = challengeId ? getSubmissionsForChallenge(challengeId) : [];
  
  // Check if user has already submitted
  const hasSubmitted = challengeSubmissions.some(submission => submission.userId === user?.id);
  
  // Get user's submission if they've submitted
  const userSubmission = challengeSubmissions.find(submission => submission.userId === user?.id);
  
  // Handle accepting a challenge
  const handleAcceptChallenge = () => {
    if (!isLoggedIn) {
      // Redirect to login if not logged in
      navigate('/login', { state: { from: `/challenges/${challengeId}` } });
      return;
    }
    
    if (userRole !== "builder") {
      toast({
        title: "Only builders can accept challenges",
        description: "Please sign up as a builder to participate in challenges.",
        variant: "destructive"
      });
      return;
    }
    
    // Add the challenge to the accepted challenges
    addChallenge(challenge);
    
    toast({
      title: "Challenge accepted!",
      description: "This challenge has been added to your dashboard.",
      variant: "default"
    });
  };
  
  // Handle submitting a solution
  const handleSubmitSolution = () => {
    if (!isLoggedIn || !user || !profile) {
      navigate('/login', { state: { from: `/challenges/${challengeId}` } });
      return;
    }
    
    if (!submissionLink) {
      toast({
        title: "Submission link required",
        description: "Please provide a link to your solution.",
        variant: "destructive"
      });
      return;
    }
    
    // Validate URL format
    try {
      new URL(submissionLink);
    } catch (e) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL starting with http:// or https://",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Submit the challenge solution
      submitChallenge(
        challenge.id,
        user.id,
        profile.full_name || user.email || 'Anonymous Builder',
        submissionLink
      );
      
      toast({
        title: "Solution submitted successfully!",
        description: "Your submission has been received and is pending review.",
        variant: "default"
      });
      
      // Close dialog and reset form
      setIsSubmitDialogOpen(false);
      setSubmissionLink('');
    } catch (error) {
      console.error('Error submitting solution:', error);
      toast({
        title: "Submission failed",
        description: "There was an error submitting your solution. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Back Button */}
        <div className="container mx-auto px-4 py-6">
          <Link to="/challenges" className="inline-flex items-center text-indigo-600 hover:text-indigo-800">
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to Challenges
          </Link>
        </div>
        
        {/* Challenge Header */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-700 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="bg-white p-2 rounded-lg">
                <img 
                  src={challenge.logo} 
                  alt={`${challenge.sponsor} logo`} 
                  className="w-12 h-12 object-contain" 
                />
              </div>
              <div className="flex-grow">
                <h1 className="text-2xl md:text-3xl font-bold text-white">{challenge.title}</h1>
                <p className="text-indigo-100 mt-1">Sponsored by {challenge.sponsor}</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Key Details Block */}
        <section className="bg-white border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center">
                <CalendarDays className="w-5 h-5 text-indigo-600 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Deadline</p>
                  <p className="font-medium">{formatDate(challenge.deadline)}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Trophy className="w-5 h-5 text-indigo-600 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Prize</p>
                  <p className="font-medium">{challenge.prize}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-50">
                  {challenge.difficulty}
                </Badge>
                <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-50">
                  {challenge.category}
                </Badge>
                <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                  {challenge.status === "active" ? "Active" : "Closed"}
                </Badge>
              </div>
            </div>
          </div>
        </section>
        
        {/* Main Content Area with Tabs */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Tabbed Information */}
              <div className="lg:col-span-2">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3 md:grid-cols-4">
                    <TabsTrigger value="description" className="flex items-center gap-1">
                      <FileText className="w-4 h-4" /> Description
                    </TabsTrigger>
                    <TabsTrigger value="requirements" className="flex items-center gap-1">
                      <CheckSquare className="w-4 h-4" /> Requirements
                    </TabsTrigger>
                    <TabsTrigger value="resources" className="flex items-center gap-1">
                      <Database className="w-4 h-4" /> Resources
                    </TabsTrigger>
                    {userRole === "sponsor" && (
                      <TabsTrigger value="submissions" className="flex items-center gap-1">
                        <Send className="w-4 h-4" /> Submissions
                      </TabsTrigger>
                    )}
                  </TabsList>
                  
                  <TabsContent value="description" className="p-6 bg-white rounded-b-md shadow-sm mt-2">
                    <h2 className="text-xl font-semibold mb-4">Challenge Overview</h2>
                    <p className="text-gray-700 mb-6">{challenge.description}</p>
                  </TabsContent>
                  
                  <TabsContent value="requirements" className="p-6 bg-white rounded-b-md shadow-sm mt-2">
                    <h2 className="text-xl font-semibold mb-4">Requirements & Deliverables</h2>
                    
                    <div className="mb-6">
                      <h3 className="font-medium text-gray-900 mb-2">Technical Requirements:</h3>
                      <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        {challenge.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Evaluation Criteria:</h3>
                      <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        {challenge.evaluation.map((criteria, index) => (
                          <li key={index}>{criteria}</li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="resources" className="p-6 bg-white rounded-b-md shadow-sm mt-2">
                    <h2 className="text-xl font-semibold mb-4">Resources</h2>
                    
                    {challenge.resources.length > 0 ? (
                      <ul className="space-y-3">
                        {challenge.resources.map((resource, index) => (
                          <li key={index} className="flex items-center">
                            <FileText className="w-4 h-4 text-indigo-600 mr-2" />
                            <a 
                              href={resource.link} 
                              className="text-indigo-600 hover:text-indigo-800 hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {resource.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-600">No additional resources provided for this challenge.</p>
                    )}
                  </TabsContent>
                  
                  {/* Add Submissions tab for sponsors */}
                  {userRole === "sponsor" && (
                    <TabsContent value="submissions" className="p-6 bg-white rounded-b-md shadow-sm mt-2">
                      <h2 className="text-xl font-semibold mb-4">Submissions</h2>
                      
                      {challengeSubmissions.length > 0 ? (
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="border-b border-gray-200 text-left">
                                <th className="py-3 px-4 font-medium">Builder</th>
                                <th className="py-3 px-4 font-medium">Submission Date</th>
                                <th className="py-3 px-4 font-medium">Status</th>
                                <th className="py-3 px-4 font-medium">Link</th>
                                <th className="py-3 px-4 font-medium">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {challengeSubmissions.map((submission) => (
                                <tr key={submission.id} className="border-b border-gray-100 hover:bg-gray-50">
                                  <td className="py-3 px-4">{submission.userName}</td>
                                  <td className="py-3 px-4">{new Date(submission.submissionDate).toLocaleDateString()}</td>
                                  <td className="py-3 px-4">
                                    <Badge
                                      variant="outline"
                                      className={
                                        submission.status === 'approved' ? 'bg-green-50 text-green-700' :
                                        submission.status === 'rejected' ? 'bg-red-50 text-red-700' :
                                        'bg-amber-50 text-amber-700'
                                      }
                                    >
                                      {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                                    </Badge>
                                  </td>
                                  <td className="py-3 px-4">
                                    <a 
                                      href={submission.submissionLink} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-indigo-600 hover:text-indigo-800 flex items-center"
                                    >
                                      View <ExternalLink className="ml-1 h-3 w-3" />
                                    </a>
                                  </td>
                                  <td className="py-3 px-4">
                                    <div className="flex space-x-2">
                                      <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700 hover:bg-green-50">
                                        Approve
                                      </Button>
                                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                                        Reject
                                      </Button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <p className="text-gray-600">No submissions have been received for this challenge yet.</p>
                      )}
                    </TabsContent>
                  )}
                </Tabs>
              </div>
              
              {/* Right Column: Call to Action / Submission Area */}
              <div>
                <div className="bg-gray-50 border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Submit Your Solution</h3>
                  
                  {!isLoggedIn ? (
                    <div>
                      <p className="text-gray-700 mb-4">
                        Interested in this challenge? Sign up as a Builder or login to submit your solution.
                      </p>
                      <div className="space-y-3">
                        <Button asChild className="w-full">
                          <Link to="/signup">Sign up as a Builder</Link>
                        </Button>
                        <Button asChild variant="outline" className="w-full">
                          <Link to="/login">Login</Link>
                        </Button>
                      </div>
                    </div>
                  ) : userRole === "builder" ? (
                    challenge.status === "active" ? (
                      <div>
                        {!challengeAccepted ? (
                          <>
                            <p className="text-gray-700 mb-4">
                              Interested in this challenge? Accept it to add to your dashboard.
                            </p>
                            <Button 
                              size="lg" 
                              className="w-full mb-4"
                              onClick={handleAcceptChallenge}
                            >
                              <PlusCircle className="mr-2 h-4 w-4" /> Accept Challenge
                            </Button>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center justify-center p-2 bg-green-50 text-green-700 rounded-md mb-4">
                              <Check className="mr-2 h-4 w-4" /> Challenge accepted
                            </div>
                            <p className="text-gray-700 mb-4">
                              {hasSubmitted 
                                ? "You've already submitted a solution for this challenge." 
                                : "Ready to showcase your skills? Submit your solution before the deadline."}
                            </p>
                            
                            {hasSubmitted ? (
                              <div className="space-y-4">
                                <div className="p-4 bg-gray-50 rounded-md">
                                  <h4 className="font-medium mb-2">Your submission</h4>
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <Badge className="mb-2">{userSubmission?.status}</Badge>
                                      <p className="text-sm text-gray-500">
                                        Submitted on {new Date(userSubmission?.submissionDate || '').toLocaleDateString()}
                                      </p>
                                    </div>
                                    <a 
                                      href={userSubmission?.submissionLink} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-indigo-600 hover:text-indigo-800 flex items-center"
                                    >
                                      View Submission <ExternalLink className="ml-1 h-3 w-3" />
                                    </a>
                                  </div>
                                </div>
                                <Button variant="outline" size="lg" className="w-full">
                                  Update Submission
                                </Button>
                              </div>
                            ) : (
                              <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
                                <DialogTrigger asChild>
                                  <Button size="lg" className="w-full">
                                    <Send className="mr-2 h-4 w-4" /> Submit Your Solution
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Submit Your Solution</DialogTitle>
                                    <DialogDescription>
                                      Provide a link to your solution. This could be a GitHub repository, a deployed application, or any other relevant link.
                                    </DialogDescription>
                                  </DialogHeader>
                                  
                                  <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                      <label htmlFor="submissionLink" className="text-sm font-medium">
                                        Submission Link <span className="text-red-500">*</span>
                                      </label>
                                      <Input
                                        id="submissionLink"
                                        placeholder="https://github.com/yourusername/your-repo"
                                        value={submissionLink}
                                        onChange={(e) => setSubmissionLink(e.target.value)}
                                      />
                                      <p className="text-sm text-gray-500">
                                        Make sure your submission is publicly accessible and includes all required deliverables.
                                      </p>
                                    </div>
                                  </div>
                                  
                                  <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsSubmitDialogOpen(false)}>Cancel</Button>
                                    <Button 
                                      onClick={handleSubmitSolution} 
                                      disabled={isSubmitting || !submissionLink}
                                    >
                                      {isSubmitting ? "Submitting..." : "Submit Solution"}
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            )}
                          </>
                        )}
                        <p className="text-sm text-gray-500 mt-2">
                          Deadline: {formatDate(challenge.deadline)}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-amber-700 mb-2">
                          This challenge is no longer accepting submissions.
                        </p>
                        <p className="text-gray-700">
                          Browse other active challenges to participate.
                        </p>
                        <Link to="/challenges" className="mt-4 inline-block">
                          <Button variant="outline">Browse Challenges</Button>
                        </Link>
                      </div>
                    )
                  ) : (
                    <div>
                      <p className="text-gray-700 mb-4">
                        As a sponsor, you can view all submissions once they are submitted.
                      </p>
                      <p className="text-sm text-gray-500">
                        Submission deadline: {formatDate(challenge.deadline)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ChallengeDetail;
