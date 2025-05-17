import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Define the Challenge type
interface Challenge {
  id: string;
  title: string;
  description: string;
  requirements: string;
  deadline: string;
  status: 'open' | 'evaluating' | 'closed';
  sponsor_name: string;
  sponsor_id: string;
}

// Define the Submission type
interface SubmissionFormData {
  project_link: string;
  notes: string;
}

const ChallengeDetailPage: React.FC = () => {
  const { challengeId } = useParams<{ challengeId: string }>();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [submissionData, setSubmissionData] = useState<SubmissionFormData>({
    project_link: '',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const { user, profile, session } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChallengeDetails = async () => {
      try {
        // Fetch challenge details from the backend API
        const response = await fetch(`http://localhost:8000/api/challenges/${challengeId}`);
        
        if (!response.ok) {
          throw new Error(`Error fetching challenge: ${response.status}`);
        }
        
        const data = await response.json();
        setChallenge(data);
      } catch (error) {
        console.error('Error fetching challenge details:', error);
        setError('Failed to load challenge details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (challengeId) {
      fetchChallengeDetails();
    }
  }, [challengeId]);

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Check if deadline has passed
  const isDeadlinePassed = (dateString: string) => {
    const deadline = new Date(dateString);
    const now = new Date();
    return deadline < now;
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSubmissionData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle submission form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !session || !profile || profile.role !== 'builder') {
      setSubmitError('You must be logged in as a builder to submit a solution.');
      return;
    }
    
    if (!submissionData.project_link) {
      setSubmitError('Project link is required.');
      return;
    }
    
    setSubmitting(true);
    setSubmitError(null);
    
    try {
      const response = await fetch(`http://localhost:8000/api/challenges/${challengeId}/submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify(submissionData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to submit solution.');
      }
      
      setSubmitSuccess(true);
      setShowSubmissionForm(false);
      
      // Reset form data
      setSubmissionData({
        project_link: '',
        notes: ''
      });
      
      // Redirect to builder dashboard after a short delay
      setTimeout(() => {
        navigate('/dashboard/builder');
      }, 3000);
      
    } catch (error: any) {
      console.error('Error submitting solution:', error);
      setSubmitError(error.message || 'Failed to submit solution. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !challenge) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
          <div className="text-red-600 mb-4">{error || 'Challenge not found.'}</div>
          <Link
            to="/challenges"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Challenges
          </Link>
        </div>
      </div>
    );
  }

  const deadlinePassed = isDeadlinePassed(challenge.deadline);
  const canSubmit = user && profile?.role === 'builder' && challenge.status === 'open' && !deadlinePassed;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <Link
            to="/challenges"
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Challenges
          </Link>
          
          {user && (
            <Link
              to="/dashboard"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Dashboard
            </Link>
          )}
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl font-bold text-gray-900">{challenge.title}</h1>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                challenge.status === 'open' 
                  ? 'bg-green-100 text-green-800' 
                  : challenge.status === 'evaluating'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {challenge.status.charAt(0).toUpperCase() + challenge.status.slice(1)}
              </span>
            </div>
            
            <div className="mb-6">
              <div className="text-sm text-gray-500 mb-2">
                <span className="font-medium">Sponsor:</span> {challenge.sponsor_name}
              </div>
              <div className="text-sm text-gray-500">
                <span className="font-medium">Deadline:</span> {formatDate(challenge.deadline)}
                {deadlinePassed && (
                  <span className="ml-2 text-red-600">(Deadline passed)</span>
                )}
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <div className="text-gray-700 whitespace-pre-line">{challenge.description}</div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Requirements</h2>
              <div className="text-gray-700 whitespace-pre-line">{challenge.requirements}</div>
            </div>
            
            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                Your solution has been submitted successfully! Redirecting to your dashboard...
              </div>
            )}
            
            {canSubmit && !submitSuccess && (
              <div>
                {!showSubmissionForm ? (
                  <button
                    onClick={() => setShowSubmissionForm(true)}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Submit Solution
                  </button>
                ) : (
                  <div className="border border-gray-200 rounded-md p-4">
                    <h2 className="text-xl font-semibold mb-4">Submit Your Solution</h2>
                    
                    {submitError && (
                      <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {submitError}
                      </div>
                    )}
                    
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label htmlFor="project_link" className="block text-sm font-medium text-gray-700 mb-1">
                          Project Link <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="project_link"
                          name="project_link"
                          type="url"
                          value={submissionData.project_link}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="https://github.com/yourusername/project"
                          required
                        />
                        <p className="mt-1 text-sm text-gray-500">
                          Link to your solution (e.g., GitHub repository, CodePen, etc.)
                        </p>
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                          Notes (Optional)
                        </label>
                        <textarea
                          id="notes"
                          name="notes"
                          value={submissionData.notes}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Add any additional notes or explanations about your solution..."
                        ></textarea>
                      </div>
                      
                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          onClick={() => setShowSubmissionForm(false)}
                          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                          disabled={submitting}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${
                            submitting ? 'opacity-70 cursor-not-allowed' : ''
                          }`}
                          disabled={submitting}
                        >
                          {submitting ? 'Submitting...' : 'Submit Solution'}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}
            
            {user && profile?.role === 'builder' && challenge.status !== 'open' && (
              <div className="p-4 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded">
                This challenge is no longer accepting submissions.
              </div>
            )}
            
            {user && profile?.role === 'builder' && deadlinePassed && (
              <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                The deadline for this challenge has passed.
              </div>
            )}
            
            {!user && (
              <div className="p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded">
                <p className="mb-2">You need to log in as a Builder to submit a solution.</p>
                <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                  Log in now →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetailPage;
