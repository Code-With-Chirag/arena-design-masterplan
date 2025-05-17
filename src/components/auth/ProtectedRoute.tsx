import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  allowedRoles?: ('builder' | 'sponsor')[];
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  redirectPath = '/login',
}) => {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to={redirectPath} state={{ from: location.pathname }} replace />;
  }

  // If roles are specified and user's role doesn't match, redirect to appropriate dashboard
  if (allowedRoles && profile && !allowedRoles.includes(profile.role)) {
    // Redirect to appropriate dashboard based on role
    const roleDashboard = profile.role === 'builder' ? '/builder-dashboard' : '/dashboard/sponsor';
    return <Navigate to={roleDashboard} replace />;
  }
  
  // If no specific roles are required but user is authenticated, redirect to role-specific dashboard
  if (!allowedRoles && profile) {
    const roleDashboard = profile.role === 'builder' ? '/builder-dashboard' : '/dashboard/sponsor';
    // Only redirect if we're at the generic dashboard or root
    if (location.pathname === '/dashboard' || location.pathname === '/') {
      return <Navigate to={roleDashboard} replace />;
    }
  }

  // If authenticated and role check passes, render the protected content
  return <Outlet />;
};

export default ProtectedRoute;
