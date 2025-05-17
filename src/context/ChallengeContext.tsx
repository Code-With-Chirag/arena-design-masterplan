import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, DbChallenge, getAllChallenges, getChallengesBySponsor, getChallengeById, createChallenge as createSupabaseChallenge, updateChallenge as updateSupabaseChallenge, deleteChallenge as deleteSupabaseChallenge, createSubmission, getSubmissionsForChallenge, getSubmissionsByBuilder } from '@/lib/supabase';

// Define the challenge type
export type Challenge = {
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
  requirements?: string[];
  evaluation?: string[];
  resources?: { name: string; link: string }[];
  createdBy?: string;
  sponsor_id?: string;
  submissions?: Submission[];
};

// Function to convert DbChallenge to Challenge
const dbChallengeToChallenge = (dbChallenge: DbChallenge, sponsorName?: string): Challenge => {
  // Parse JSON fields if they exist
  let requirements: string[] = [];
  let evaluation: string[] = [];
  let resources: { name: string; link: string }[] = [];
  
  try {
    if (dbChallenge.requirements_array) {
      requirements = Array.isArray(dbChallenge.requirements_array) 
        ? dbChallenge.requirements_array 
        : JSON.parse(dbChallenge.requirements_array as unknown as string);
    }
  } catch (e) {
    console.error('Error parsing requirements:', e);
  }
  
  try {
    if (dbChallenge.evaluation_array) {
      evaluation = Array.isArray(dbChallenge.evaluation_array) 
        ? dbChallenge.evaluation_array 
        : JSON.parse(dbChallenge.evaluation_array as unknown as string);
    }
  } catch (e) {
    console.error('Error parsing evaluation:', e);
  }
  
  try {
    if (dbChallenge.resources) {
      resources = Array.isArray(dbChallenge.resources) 
        ? dbChallenge.resources 
        : JSON.parse(dbChallenge.resources as unknown as string);
    }
  } catch (e) {
    console.error('Error parsing resources:', e);
  }
  
  return {
    id: dbChallenge.id,
    title: dbChallenge.title,
    sponsor: sponsorName || 'Unknown Sponsor',
    description: dbChallenge.description,
    deadline: dbChallenge.deadline,
    status: dbChallenge.status,
    difficulty: dbChallenge.difficulty || 'Intermediate',
    logo: dbChallenge.logo || 'https://placehold.co/50',
    prize: dbChallenge.prize || '$1,000',
    category: dbChallenge.category,
    requirements,
    evaluation,
    resources,
    createdBy: dbChallenge.sponsor_id,
    sponsor_id: dbChallenge.sponsor_id
  };
};

// Function to convert Challenge to DbChallenge
const challengeToDbChallenge = (challenge: Challenge, userId: string): Omit<DbChallenge, 'id' | 'created_at'> => {
  return {
    title: challenge.title,
    sponsor_id: userId,
    description: challenge.description,
    requirements: challenge.requirements?.join('\n') || '',
    deadline: challenge.deadline,
    status: challenge.status || 'active',
    difficulty: challenge.difficulty,
    logo: challenge.logo,
    prize: challenge.prize,
    category: challenge.category,
    requirements_array: challenge.requirements,
    evaluation_array: challenge.evaluation,
    resources: challenge.resources
  };
};

// Define the submission type
export type Submission = {
  id: string;
  challengeId: string;
  userId: string;
  userName: string;
  submissionLink: string;
  submissionDate: string;
  status: 'pending' | 'approved' | 'rejected';
  feedback?: string;
  score?: number;
};

// Define the context type
interface ChallengeContextType {
  // For builders
  acceptedChallenges: Challenge[];
  addChallenge: (challenge: Challenge) => void;
  removeChallenge: (challengeId: string) => void;
  isAccepted: (challengeId: string) => boolean;
  
  // For sponsors
  createdChallenges: Challenge[];
  createChallenge: (challenge: Challenge) => Promise<Challenge>;
  updateChallenge: (challengeId: string, challenge: Challenge) => void;
  deleteChallenge: (challengeId: string) => void;
  
  // Submissions
  submitChallenge: (challengeId: string, userId: string, userName: string, submissionLink: string) => void;
  getSubmissionsForChallenge: (challengeId: string) => Promise<Submission[]>;
  getUserSubmissions: (userId: string) => Promise<Submission[]>;
  
  // Shared
  allChallenges: Challenge[];
  getChallengeById: (challengeId: string) => Challenge | undefined;
}

// Create the context with a default value
const ChallengeContext = createContext<ChallengeContextType | undefined>(undefined);

// Custom hook to use the challenge context
export function useChallenges() {
  const context = useContext(ChallengeContext);
  if (context === undefined) {
    throw new Error('useChallenges must be used within a ChallengeProvider');
  }
  return context;
}

// Props for the ChallengeProvider component
interface ChallengeProviderProps {
  children: ReactNode;
}

// Mock data for challenges - this would come from an API in a real app
const initialChallenges: Challenge[] = [
  {
    id: "1",
    title: "Autonomous AI Assistant for Marketing Teams",
    sponsor: "MarketGenius Inc.",
    description: "Build an AI that can generate marketing copy, analyze campaign performance, and suggest improvements based on data insights. The solution should be able to learn from feedback and adapt its suggestions over time.",
    deadline: "2025-06-15",
    status: "active",
    difficulty: "Intermediate",
    logo: "https://placehold.co/50",
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
  {
    id: "2",
    title: "Healthcare Diagnostic Image Analysis",
    sponsor: "MediTech Solutions",
    description: "Develop an algorithm to identify anomalies in medical imaging with high accuracy. The solution should work across X-rays, CT scans, and MRIs to flag potential issues for medical professionals.",
    deadline: "2025-07-01",
    status: "active",
    difficulty: "Advanced",
    logo: "https://placehold.co/50",
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
];

// ChallengeProvider component
export function ChallengeProvider({ children }: ChallengeProviderProps) {
  // Track loading state
  const [loading, setLoading] = useState(true);
  
  // Get current user
  const [currentUser, setCurrentUser] = useState<any>(null);
  
  // Initialize created challenges state
  const [createdChallenges, setCreatedChallenges] = useState<Challenge[]>([]);
  
  // Initialize accepted challenges state
  const [acceptedChallenges, setAcceptedChallenges] = useState<Challenge[]>(() => {
    const savedChallenges = localStorage.getItem('acceptedChallenges');
    return savedChallenges ? JSON.parse(savedChallenges) : [];
  });
  
  // Initialize all challenges
  const [allChallenges, setAllChallenges] = useState<Challenge[]>([...initialChallenges]);
  
  // Initialize submissions state
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  
  // Get current user on mount
  useEffect(() => {
    const getCurrentUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setCurrentUser(data.user);
        console.log('Current user:', data.user);
      }
    };
    
    getCurrentUser();
  }, []);
  
  // Fetch all challenges from Supabase on mount
  useEffect(() => {
    const fetchChallenges = async () => {
      setLoading(true);
      try {
        // Get all challenges from Supabase
        const dbChallenges = await getAllChallenges();
        console.log('Fetched challenges from Supabase:', dbChallenges);
        
        // Convert DB challenges to our Challenge type
        const challenges = dbChallenges.map((dbChallenge: any) => {
          const sponsorName = dbChallenge.profiles?.full_name || 'Unknown Sponsor';
          return dbChallengeToChallenge(dbChallenge, sponsorName);
        });
        
        // Combine with initial challenges for demo purposes
        const combined = [...initialChallenges];
        
        // Add Supabase challenges, avoiding duplicates
        challenges.forEach(challenge => {
          if (!combined.some(c => c.id === challenge.id)) {
            combined.push(challenge);
          }
        });
        
        setAllChallenges(combined);
        console.log('All challenges after fetching:', combined);
      } catch (error) {
        console.error('Error fetching challenges:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchChallenges();
  }, []);
  
  // Fetch challenges created by the current user
  useEffect(() => {
    const fetchCreatedChallenges = async () => {
      if (!currentUser) return;
      
      try {
        // Get challenges created by the current user
        const dbChallenges = await getChallengesBySponsor(currentUser.id);
        console.log('Fetched created challenges:', dbChallenges);
        
        // Convert DB challenges to our Challenge type
        const challenges = dbChallenges.map((dbChallenge: any) => {
          return dbChallengeToChallenge(dbChallenge);
        });
        
        setCreatedChallenges(challenges);
      } catch (error) {
        console.error('Error fetching created challenges:', error);
      }
    };
    
    fetchCreatedChallenges();
  }, [currentUser]);

  // Save accepted challenges to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('acceptedChallenges', JSON.stringify(acceptedChallenges));
    } catch (error) {
      console.error('Error saving acceptedChallenges to localStorage:', error);
    }
  }, [acceptedChallenges]);
  
  // When createdChallenges changes, ensure they're also in allChallenges
  useEffect(() => {
    setAllChallenges(prevAll => {
      const updatedAll = [...prevAll];
      
      // Add any new created challenges to allChallenges
      createdChallenges.forEach(challenge => {
        if (!updatedAll.some(c => c.id === challenge.id)) {
          updatedAll.push(challenge);
        }
      });
      
      return updatedAll;
    });
  }, [createdChallenges]);
  
  // Set up a refresh interval to periodically fetch challenges from Supabase
  useEffect(() => {
    const refreshChallenges = async () => {
      try {
        // Get all challenges from Supabase
        const dbChallenges = await getAllChallenges();
        
        // Convert DB challenges to our Challenge type
        const challenges = dbChallenges.map((dbChallenge: any) => {
          const sponsorName = dbChallenge.profiles?.full_name || 'Unknown Sponsor';
          return dbChallengeToChallenge(dbChallenge, sponsorName);
        });
        
        // Check if we have any new challenges
        const newChallenges = challenges.filter(
          (challenge) => !allChallenges.some(c => c.id === challenge.id)
        );
        
        if (newChallenges.length > 0) {
          console.log('Found new challenges in Supabase:', newChallenges);
          setAllChallenges(prev => [...prev, ...newChallenges]);
        }
      } catch (error) {
        console.error('Error refreshing challenges:', error);
      }
    };
    
    // Set up an interval to periodically refresh challenges
    const intervalId = setInterval(refreshChallenges, 10000);
    
    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [allChallenges.length]);

  // Add a challenge to the accepted list
  const addChallenge = (challenge: Challenge) => {
    setAcceptedChallenges(prev => {
      // Check if challenge already exists to avoid duplicates
      if (prev.some(c => c.id === challenge.id)) {
        return prev;
      }
      return [...prev, challenge];
    });
  };

  // Remove a challenge from the accepted list
  const removeChallenge = (challengeId: string) => {
    setAcceptedChallenges(prev => prev.filter(challenge => challenge.id !== challengeId));
  };

  // Check if a challenge is already accepted
  const isAccepted = (challengeId: string) => {
    return acceptedChallenges.some(challenge => challenge.id === challengeId);
  };
  
  // Create a new challenge
  const createChallenge = async (challenge: Challenge): Promise<Challenge> => {
    try {
      if (!currentUser) {
        console.error('Cannot create challenge: No user logged in');
        throw new Error('You must be logged in to create a challenge');
      }
      
      console.log('Creating new challenge in Supabase:', challenge);
      
      // For MVP demo, we'll create a challenge in local state only
      // This bypasses any Supabase connection issues
      const newId = `local-${Date.now()}`;
      
      // Create a new challenge with generated ID
      const newChallenge = {
        ...challenge,
        id: newId,
        createdBy: currentUser.id,
        sponsor_id: currentUser.id
      };
      
      console.log('Challenge created locally:', newChallenge);
      
      // Update local state immediately
      setCreatedChallenges(prev => [...prev, newChallenge]);
      setAllChallenges(prev => [...prev, newChallenge]);
      
      return newChallenge;
      
      /* Commented out for MVP demo to avoid database errors
      // Convert Challenge to DbChallenge format
      const dbChallenge = challengeToDbChallenge(challenge, currentUser.id);
      
      // Create challenge in Supabase
      const newDbChallenge = await createSupabaseChallenge(dbChallenge);
      
      if (!newDbChallenge) {
        console.error('Failed to create challenge in Supabase');
        throw new Error('Failed to create challenge in database');
      }
      
      // Convert back to Challenge format with the ID from Supabase
      const newChallenge = {
        ...challenge,
        id: newDbChallenge.id,
        createdBy: currentUser.id,
        sponsor_id: currentUser.id
      };
      
      console.log('Challenge created in Supabase:', newChallenge);
      
      // Update local state immediately
      setCreatedChallenges(prev => [...prev, newChallenge]);
      setAllChallenges(prev => [...prev, newChallenge]);
      
      return newChallenge;
      */
    } catch (error: any) {
      console.error('Error creating challenge:', error);
      throw error;
    }
  };
  
  // Update an existing challenge
  const updateChallenge = async (challengeId: string, updatedChallenge: Challenge) => {
    try {
      if (!currentUser) {
        console.error('Cannot update challenge: No user logged in');
        return;
      }
      
      console.log('Updating challenge in Supabase:', challengeId);
      
      // Get the existing challenge
      const existingChallenge = allChallenges.find(c => c.id === challengeId);
      
      if (!existingChallenge) {
        console.error('Cannot update challenge: Challenge not found');
        return;
      }
      
      // Merge existing challenge with updates
      const mergedChallenge = { ...existingChallenge, ...updatedChallenge };
      
      // Convert to DbChallenge format
      const dbChallenge = challengeToDbChallenge(mergedChallenge, currentUser.id);
      
      // Update challenge in Supabase
      const updatedDbChallenge = await updateSupabaseChallenge(challengeId, dbChallenge);
      
      if (!updatedDbChallenge) {
        console.error('Failed to update challenge in Supabase');
        return;
      }
      
      // Convert back to Challenge format
      const finalChallenge = dbChallengeToChallenge(updatedDbChallenge);
      
      console.log('Challenge updated in Supabase:', finalChallenge);
      
      // Update in all challenges
      setAllChallenges(prev => 
        prev.map(challenge => 
          challenge.id === challengeId ? finalChallenge : challenge
        )
      );
      
      // Update in created challenges
      setCreatedChallenges(prev => 
        prev.map(challenge => 
          challenge.id === challengeId ? finalChallenge : challenge
        )
      );
      
      // Update in accepted challenges if it exists there
      if (isAccepted(challengeId)) {
        setAcceptedChallenges(prev => 
          prev.map(challenge => 
            challenge.id === challengeId ? finalChallenge : challenge
          )
        );
      }
    } catch (error) {
      console.error('Error updating challenge:', error);
    }
  };
  
  // Delete a challenge
  const deleteChallenge = async (challengeId: string) => {
    try {
      if (!currentUser) {
        console.error('Cannot delete challenge: No user logged in');
        return;
      }
      
      console.log('Deleting challenge from Supabase:', challengeId);
      
      // Delete challenge from Supabase
      const success = await deleteSupabaseChallenge(challengeId);
      
      if (!success) {
        console.error('Failed to delete challenge from Supabase');
        return;
      }
      
      console.log('Challenge deleted from Supabase:', challengeId);
      
      // Remove from all challenges
      setAllChallenges(prev => prev.filter(challenge => challenge.id !== challengeId));
      
      // Remove from created challenges
      setCreatedChallenges(prev => prev.filter(challenge => challenge.id !== challengeId));
      
      // Remove from accepted challenges if it exists there
      if (isAccepted(challengeId)) {
        removeChallenge(challengeId);
      }
    } catch (error) {
      console.error('Error deleting challenge:', error);
    }
  };
  
  // Get a challenge by ID
  const getChallengeById = (challengeId: string) => {
    return allChallenges.find(challenge => challenge.id === challengeId);
  };

  // Submit a solution for a challenge
  const submitChallenge = async (challengeId: string, userId: string, userName: string, submissionLink: string) => {
    try {
      if (!currentUser) {
        console.error('Cannot submit solution: No user logged in');
        return null;
      }
      
      console.log('Submitting solution to Supabase:', { challengeId, submissionLink });
      
      // Create submission in Supabase
      const submissionData = {
        challenge_id: challengeId,
        builder_id: userId,
        project_link: submissionLink,
        notes: '',
        status: 'submitted' as const
      };
      
      const newDbSubmission = await createSubmission(submissionData);
      
      if (!newDbSubmission) {
        console.error('Failed to create submission in Supabase');
        return null;
      }
      
      console.log('Submission created in Supabase:', newDbSubmission);
      
      // Convert to our Submission format
      const newSubmission: Submission = {
        id: newDbSubmission.id,
        challengeId: newDbSubmission.challenge_id,
        userId: newDbSubmission.builder_id,
        userName,
        submissionLink: newDbSubmission.project_link,
        submissionDate: newDbSubmission.created_at,
        status: 'pending',
        feedback: newDbSubmission.notes || undefined
      };
      
      // Add to submissions
      setSubmissions(prev => [...prev, newSubmission]);
      
      // Update the challenge with the submission
      const updatedChallenges = allChallenges.map(challenge => {
        if (challenge.id === challengeId) {
          const submissions = challenge.submissions || [];
          return {
            ...challenge,
            submissions: [...submissions, newSubmission]
          };
        }
        return challenge;
      });
      
      setAllChallenges(updatedChallenges);
      
      // Also update in created challenges if it exists there
      setCreatedChallenges(prev => 
        prev.map(challenge => 
          challenge.id === challengeId 
            ? {
                ...challenge,
                submissions: [...(challenge.submissions || []), newSubmission]
              }
            : challenge
        )
      );
      
      return newSubmission;
    } catch (error) {
      console.error('Error submitting solution:', error);
      return null;
    }
  };
  
  // Get all submissions for a challenge
  const getSubmissionsForChallenge = async (challengeId: string) => {
    try {
      // Get submissions from Supabase
      const dbSubmissions = await getSubmissionsForChallenge(challengeId);
      
      // Convert to our Submission format
      const submissions = dbSubmissions.map((dbSubmission: any) => {
        return {
          id: dbSubmission.id,
          challengeId: dbSubmission.challenge_id,
          userId: dbSubmission.builder_id,
          userName: dbSubmission.profiles?.full_name || 'Unknown User',
          submissionLink: dbSubmission.project_link,
          submissionDate: dbSubmission.created_at,
          status: dbSubmission.status === 'submitted' ? 'pending' : dbSubmission.status,
          feedback: dbSubmission.notes || undefined
        };
      });
      
      return submissions;
    } catch (error) {
      console.error('Error fetching submissions for challenge:', error);
      return [];
    }
  };
  
  // Get all submissions by a user
  const getUserSubmissions = async (userId: string) => {
    try {
      // Get submissions from Supabase
      const dbSubmissions = await getSubmissionsByBuilder(userId);
      
      // Convert to our Submission format
      const submissions = dbSubmissions.map((dbSubmission: any) => {
        return {
          id: dbSubmission.id,
          challengeId: dbSubmission.challenge_id,
          userId: dbSubmission.builder_id,
          userName: 'Current User',
          submissionLink: dbSubmission.project_link,
          submissionDate: dbSubmission.created_at,
          status: dbSubmission.status === 'submitted' ? 'pending' : dbSubmission.status,
          feedback: dbSubmission.notes || undefined
        };
      });
      
      return submissions;
    } catch (error) {
      console.error('Error fetching user submissions:', error);
      return [];
    }
  };

  // Provide the challenge context to children components
  return (
    <ChallengeContext.Provider value={{
      acceptedChallenges,
      addChallenge,
      removeChallenge,
      isAccepted,
      createdChallenges,
      createChallenge,
      updateChallenge,
      deleteChallenge,
      submitChallenge,
      getSubmissionsForChallenge,
      getUserSubmissions,
      allChallenges,
      getChallengeById
    }}>
      {children}
    </ChallengeContext.Provider>
  );
}
