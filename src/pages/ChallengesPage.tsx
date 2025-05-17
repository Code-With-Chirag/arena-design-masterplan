import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
}

const ChallengesPage: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        // Fetch challenges from the backend API
        const response = await fetch('http://localhost:8000/api/challenges');
        
        if (!response.ok) {
          throw new Error(`Error fetching challenges: ${response.status}`);
        }
        
        const data = await response.json();
        setChallenges(data);
      } catch (error) {
        console.error('Error fetching challenges:', error);
        setError('Failed to load challenges. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">AI Challenges</h1>
          {user && (
            <Link
              to="/dashboard"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Back to Dashboard
            </Link>
          )}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : challenges.length === 0 ? (
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <p className="text-gray-700 text-lg">No active challenges available at the moment.</p>
            <p className="text-gray-500 mt-2">Check back later for new opportunities!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge) => (
              <div
                key={challenge.id}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">{challenge.title}</h2>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      challenge.status === 'open' 
                        ? 'bg-green-100 text-green-800' 
                        : challenge.status === 'evaluating'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {challenge.status.charAt(0).toUpperCase() + challenge.status.slice(1)}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">{challenge.description}</p>
                  
                  <div className="text-sm text-gray-500 mb-4">
                    <div className="mb-1">
                      <span className="font-medium">Sponsor:</span> {challenge.sponsor_name}
                    </div>
                    <div>
                      <span className="font-medium">Deadline:</span> {formatDate(challenge.deadline)}
                    </div>
                  </div>
                  
                  <Link
                    to={`/challenges/${challenge.id}`}
                    className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengesPage;
