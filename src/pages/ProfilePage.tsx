import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProfilePage: React.FC = () => {
  const { profile, updateProfile, loading, signOut } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    full_name: '',
    portfolio_link: '',
    company_name: ''
  });
  
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  // Initialize form data with profile data when it loads
  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        portfolio_link: profile.portfolio_link || '',
        company_name: profile.company_name || ''
      });
    }
  }, [profile]);
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profile) {
      return;
    }
    
    setUpdating(true);
    setError(null);
    setSuccess(false);
    
    try {
      // Prepare update data based on user role
      const updateData: any = {
        full_name: formData.full_name
      };
      
      if (profile.role === 'builder') {
        updateData.portfolio_link = formData.portfolio_link;
      } else if (profile.role === 'sponsor') {
        updateData.company_name = formData.company_name;
      }
      
      const { error } = await updateProfile(updateData);
      
      if (error) {
        throw new Error(error.message || 'Failed to update profile');
      }
      
      setSuccess(true);
      
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        const dashboardPath = profile.role === 'builder' ? '/dashboard/builder' : '/dashboard/sponsor';
        navigate(dashboardPath);
      }, 2000);
      
    } catch (error: any) {
      setError(error.message || 'An error occurred while updating your profile');
    } finally {
      setUpdating(false);
    }
  };
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };
  
  if (loading || !profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Your Profile</h1>
          <div className="flex space-x-3">
            <Link
              to={profile.role === 'builder' ? '/dashboard/builder' : '/dashboard/sponsor'}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Back to Dashboard
            </Link>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Sign Out
            </button>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
              Profile updated successfully! Redirecting to your dashboard...
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="full_name"
                name="full_name"
                type="text"
                value={formData.full_name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-md text-gray-500">
                {profile.email} <span className="text-xs">(cannot be changed)</span>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <div className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-md text-gray-500 capitalize">
                {profile.role} <span className="text-xs">(cannot be changed)</span>
              </div>
            </div>
            
            {profile.role === 'builder' && (
              <div className="mb-6">
                <label htmlFor="portfolio_link" className="block text-sm font-medium text-gray-700 mb-1">
                  Portfolio Link
                </label>
                <input
                  id="portfolio_link"
                  name="portfolio_link"
                  type="url"
                  value={formData.portfolio_link}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://github.com/yourusername"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Link to your portfolio, GitHub profile, or personal website
                </p>
              </div>
            )}
            
            {profile.role === 'sponsor' && (
              <div className="mb-6">
                <label htmlFor="company_name" className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  id="company_name"
                  name="company_name"
                  type="text"
                  value={formData.company_name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your company name"
                />
              </div>
            )}
            
            <div className="flex justify-end">
              <button
                type="submit"
                className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${
                  updating ? 'opacity-70 cursor-not-allowed' : ''
                }`}
                disabled={updating}
              >
                {updating ? 'Updating...' : 'Update Profile'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
