import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, User, LogOut } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  const isAuthenticated = !!user;
  const userRole = profile?.role || "";
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // Helper to check if a link is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  // Toggle menu on mobile
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut();
      // Clear local storage to remove any cached user data
      localStorage.removeItem('acceptedChallenges');
      localStorage.removeItem('createdChallenges');
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  
  return (
    <header className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-bold text-xl p-2 rounded">EA</div>
            <span className="ml-2 text-xl font-bold text-gray-900">EliteArena</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Navigation links - visible on desktop */}
            <NavItems isAuthenticated={isAuthenticated} userRole={userRole} isActive={isActive} />
            
            {/* Authentication Actions */}
            {isAuthenticated ? (
              <UserMenu userRole={userRole} handleLogout={handleLogout} />
            ) : (
              <AuthButtons />
            )}
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation - slide down panel */}
      {isOpen && isMobile && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <MobileNavItems 
              isAuthenticated={isAuthenticated} 
              userRole={userRole} 
              isActive={isActive}
              closeMenu={() => setIsOpen(false)}
            />
            
            {/* Authentication Actions */}
            {isAuthenticated ? (
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <p className="text-sm text-gray-500">Signed in as {userRole}</p>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="flex items-center text-red-600 hover:text-red-800"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <Button 
                  variant="default" 
                  onClick={() => {
                    navigate('/login');
                    setIsOpen(false);
                  }}
                >
                  Login
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    navigate('/signup');
                    setIsOpen(false);
                  }}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

// Desktop Navigation Items
const NavItems = ({ 
  isAuthenticated, 
  userRole, 
  isActive 
}: { 
  isAuthenticated: boolean; 
  userRole: string; 
  isActive: (path: string) => boolean;
}) => {
  // Default links for all users
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Challenges", path: "/challenges" }
  ];
  
  // Additional links based on authentication status and role
  if (isAuthenticated) {
    if (userRole === "builder") {
      navItems.push({ name: "My Dashboard", path: "/builder-dashboard" });
      navItems.push({ name: "My Submissions", path: "/my-submissions" });
    } else if (userRole === "sponsor") {
      navItems.push({ name: "My Dashboard", path: "/dashboard/sponsor" });
      navItems.push({ name: "Create Challenge", path: "/dashboard/sponsor/create-challenge" });
    }
  }
  
  return (
    <>
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={cn(
            "text-gray-700 hover:text-indigo-600 font-medium",
            isActive(item.path) && "text-indigo-600 font-semibold"
          )}
        >
          {item.name}
        </Link>
      ))}
    </>
  );
};

// Mobile Navigation Items
const MobileNavItems = ({ 
  isAuthenticated, 
  userRole, 
  isActive,
  closeMenu
}: { 
  isAuthenticated: boolean; 
  userRole: string; 
  isActive: (path: string) => boolean;
  closeMenu: () => void;
}) => {
  // Default links for all users
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Challenges", path: "/challenges" }
  ];
  
  // Additional links based on authentication status and role
  if (isAuthenticated) {
    if (userRole === "builder") {
      navItems.push({ name: "My Dashboard", path: "/builder-dashboard" });
      navItems.push({ name: "My Submissions", path: "/my-submissions" });
    } else if (userRole === "sponsor") {
      navItems.push({ name: "My Dashboard", path: "/dashboard/sponsor" });
      navItems.push({ name: "Create Challenge", path: "/dashboard/sponsor/create-challenge" });
    }
  }
  
  return (
    <>
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={cn(
            "py-2 block text-gray-700 hover:text-indigo-600 font-medium",
            isActive(item.path) && "text-indigo-600 font-semibold"
          )}
          onClick={closeMenu}
        >
          {item.name}
        </Link>
      ))}
    </>
  );
};

// User Menu (Dropdown) - For authenticated users
const UserMenu = ({ 
  userRole,
  handleLogout
}: {
  userRole: string;
  handleLogout: () => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5">
          <p className="text-sm font-medium">My Account</p>
          <p className="text-xs text-muted-foreground">{userRole}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/profile" className="cursor-pointer">
            Profile Settings
          </Link>
        </DropdownMenuItem>
        {userRole === "builder" ? (
          <>
            <DropdownMenuItem asChild>
              <Link to="/builder-dashboard" className="cursor-pointer">
                My Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/my-submissions" className="cursor-pointer">
                My Submissions
              </Link>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem asChild>
              <Link to="/dashboard/sponsor" className="cursor-pointer">
                My Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/dashboard/sponsor/create-challenge" className="cursor-pointer">
                Create Challenge
              </Link>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={handleLogout}
          className="text-red-600 focus:text-red-600 cursor-pointer"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Login and Signup Buttons - For guests
const AuthButtons = () => {
  return (
    <div className="flex items-center space-x-4">
      <Button variant="ghost" asChild>
        <Link to="/login">Login</Link>
      </Button>
      <Button asChild>
        <Link to="/signup">Sign Up</Link>
      </Button>
    </div>
  );
};

export default Navbar;
