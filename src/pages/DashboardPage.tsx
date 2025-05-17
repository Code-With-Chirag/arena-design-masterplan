import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DashboardPage: React.FC = () => {
  const { profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to role-specific dashboard once profile is loaded
    if (!loading && profile) {
      if (profile.role === 'builder') {
        navigate('/dashboard/builder');
      } else if (profile.role === 'sponsor') {
        navigate('/dashboard/sponsor');
      }
    }
  }, [profile, loading, navigate]);

  // Show loading state while checking authentication and profile
  if (loading || !profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // This should not be rendered as the useEffect will redirect
  return null;
};

export default DashboardPage;
