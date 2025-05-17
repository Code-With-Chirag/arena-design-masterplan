
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Trophy, ChevronLeft, FileText, CheckSquare, Database } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Mock data - in a real app this would come from an API
const challengesData = {
  "1": {
    id: "1",
    title: "Autonomous AI Assistant for Marketing Teams",
    sponsor: "MarketGenius Inc.",
    logo: "https://placehold.co/50",
    description: "Build an AI that can generate marketing copy, analyze campaign performance, and suggest improvements based on data insights. The solution should be able to learn from feedback and adapt its suggestions over time.",
    deadline: "2025-06-15",
    status: "active",
    difficulty: "Intermediate",
    prize: "$5,000",
    category: "NLP",
    requirements: [
      "Solution must be capable of generating marketing copy for social media, email, and web",
      "Must include performance analysis tools that provide actionable insights",
      "Should learn from user feedback to improve future suggestions",
      "API documentation for integration with existing marketing tools",
      "Ability to handle multiple marketing channels and campaign types"
    ],
    evaluation: [
      "Quality and relevance of generated content (30%)",
      "Accuracy of performance analysis (25%)",
      "Adaptability and learning capabilities (25%)",
      "API design and integration capabilities (10%)",
      "User experience and interface design (10%)"
    ],
    resources: [
      { name: "Sample marketing data", link: "#" },
      { name: "API documentation template", link: "#" },
      { name: "Evaluation criteria details", link: "#" }
    ]
  },
  "2": {
    id: "2",
    title: "Healthcare Diagnostic Image Analysis",
    sponsor: "MediTech Solutions",
    logo: "https://placehold.co/50",
    description: "Develop an algorithm to identify anomalies in medical imaging with high accuracy. The solution should work across X-rays, CT scans, and MRIs to flag potential issues for medical professionals.",
    deadline: "2025-07-01",
    status: "active",
    difficulty: "Advanced",
    prize: "$8,000",
    category: "Computer Vision",
    requirements: [
      "Support for X-ray, CT scan, and MRI image formats",
      "Ability to identify and highlight potential anomalies",
      "False positive rate below industry standard",
      "Documentation on model architecture and training process",
      "Interface for medical professionals to review flagged issues"
    ],
    evaluation: [
      "Accuracy of anomaly detection (40%)",
      "False positive/negative rates (30%)",
      "Processing speed and efficiency (10%)",
      "Ease of use for medical professionals (10%)",
      "Documentation quality (10%)"
    ],
    resources: [
      { name: "Sample anonymized medical images", link: "#" },
      { name: "Medical imaging standards documentation", link: "#" },
      { name: "Evaluation metrics details", link: "#" }
    ]
  }
};

const ChallengeDetail = () => {
  const { challengeId } = useParams();
  const [isLoggedIn] = useState(false); // In a real app, this would come from authentication state
  const [userRole] = useState("guest"); // In a real app, this would come from user profile: "builder", "sponsor", "guest"
  
  // Get challenge data based on challengeId
  const challenge = challengeId ? challengesData[challengeId] : null;
  
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
                <Tabs defaultValue="description">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="description" className="flex items-center gap-1">
                      <FileText className="w-4 h-4" /> Description
                    </TabsTrigger>
                    <TabsTrigger value="requirements" className="flex items-center gap-1">
                      <CheckSquare className="w-4 h-4" /> Requirements
                    </TabsTrigger>
                    <TabsTrigger value="resources" className="flex items-center gap-1">
                      <Database className="w-4 h-4" /> Resources
                    </TabsTrigger>
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
                        <Button className="w-full">Sign up as a Builder</Button>
                        <Button variant="outline" className="w-full">Login</Button>
                      </div>
                    </div>
                  ) : userRole === "builder" ? (
                    challenge.status === "active" ? (
                      <div>
                        <p className="text-gray-700 mb-4">
                          Ready to showcase your skills? Submit your solution before the deadline.
                        </p>
                        <Button size="lg" className="w-full">Submit Your Solution</Button>
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
