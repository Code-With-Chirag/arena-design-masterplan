import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Pages
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import BuilderDashboard from './pages/BuilderDashboard';
import SponsorDashboardPage from './pages/SponsorDashboardPage';
import Challenges from './pages/Challenges';
import ChallengeDetail from './pages/ChallengeDetail';
import ProfilePage from './pages/ProfilePage';
import CreateChallengePage from './pages/CreateChallengePage';
import MySubmissions from './pages/MySubmissions';
import NotFound from './pages/NotFound';

// Create router configuration
const router = createBrowserRouter([
  // Public routes
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/signup',
    element: <SignupPage />
  },
  {
    path: '/challenges',
    element: <Challenges />
  },
  {
    path: '/challenges/:challengeId',
    element: <ChallengeDetail />
  },
  
  // Protected routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/dashboard',
        element: <DashboardPage />
      },
      {
        path: '/profile',
        element: <ProfilePage />
      }
    ]
  },
  
  // Builder-specific routes
  {
    element: <ProtectedRoute allowedRoles={['builder']} />,
    children: [
      {
        path: '/builder-dashboard',
        element: <BuilderDashboard />
      },
      {
        path: '/my-submissions',
        element: <MySubmissions />
      }
    ]
  },
  
  // Sponsor-specific routes
  {
    element: <ProtectedRoute allowedRoles={['sponsor']} />,
    children: [
      {
        path: '/dashboard/sponsor',
        element: <SponsorDashboardPage />
      },
      {
        path: '/dashboard/sponsor/create-challenge',
        element: <CreateChallengePage />
      }
    ]
  },
  
  // Redirect root to challenges page
  {
    path: '/',
    element: <Navigate to="/challenges" replace />
  },
  
  // Catch all other routes and show NotFound page
  {
    path: '*',
    element: <NotFound />
  }
]);

export default router;
