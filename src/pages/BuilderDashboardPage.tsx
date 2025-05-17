import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const BuilderDashboardPage: React.FC = () => {
  const { profile, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Builder Dashboard</h1>
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
              This is your builder dashboard where you can view challenges and manage your submissions.
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
                  <p className="text-sm text-gray-500">Portfolio Link</p>
                  <p className="font-medium">
                    {profile?.portfolio_link ? (
                      <a 
                        href={profile.portfolio_link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {profile.portfolio_link}
                      </a>
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
            <h2 className="text-xl font-semibold mb-4">Your Submissions</h2>
            <p className="text-gray-500 mb-4">
              You haven't submitted any solutions yet. Browse open challenges to get started.
            </p>
            <Link 
              to="/challenges" 
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Browse Challenges
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuilderDashboardPage;
