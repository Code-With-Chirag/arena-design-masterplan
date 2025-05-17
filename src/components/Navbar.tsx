
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // This would come from auth context in a real app
  const [userRole, setUserRole] = useState("builder"); // This would come from user context in a real app ("builder" or "sponsor")
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // Helper to check if a link is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  // Toggle menu on mobile
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  // For demo purposes only - toggle authentication state
  const toggleAuth = () => {
    setIsAuthenticated(!isAuthenticated);
  };
  
  // For demo purposes only - toggle user role
  const toggleRole = () => {
    setUserRole(userRole === "builder" ? "sponsor" : "builder");
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
              <UserMenu userRole={userRole} toggleAuth={toggleAuth} toggleRole={toggleRole} />
            ) : (
              <AuthButtons toggleAuth={toggleAuth} />
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
                    toggleAuth();
                    setIsOpen(false);
                  }}
                  className="flex items-center text-red-600 hover:text-red-800"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
                
                {/* Demo purpose only - toggle role */}
                <button 
                  onClick={toggleRole}
                  className="text-xs text-gray-500 mt-2"
                >
                  Demo: Switch to {userRole === "builder" ? "sponsor" : "builder"}
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <Button 
                  variant="default" 
                  onClick={() => {
                    toggleAuth();
                    setIsOpen(false);
                  }}
                >
                  Login
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    toggleAuth();
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
      navItems.push({ name: "My Dashboard", path: "/sponsor-dashboard" });
      navItems.push({ name: "Create Challenge", path: "/create-challenge" });
    }
  } else {
    navItems.push({ name: "Sponsors", path: "/sponsors" });
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
      navItems.push({ name: "My Dashboard", path: "/sponsor-dashboard" });
      navItems.push({ name: "Create Challenge", path: "/create-challenge" });
    }
  } else {
    navItems.push({ name: "Sponsors", path: "/sponsors" });
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
  toggleAuth,
  toggleRole
}: {
  userRole: string;
  toggleAuth: () => void;
  toggleRole: () => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
            <User className="h-4 w-4 text-indigo-600" />
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="px-2 py-1.5 text-sm font-medium text-gray-500">
          Signed in as {userRole}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/profile" className="cursor-pointer">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/settings" className="cursor-pointer">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={toggleAuth}
          className="text-red-600 cursor-pointer"
        >
          Log out
        </DropdownMenuItem>
        
        {/* Demo purpose only - toggle role */}
        <DropdownMenuSeparator />
        <div className="px-2 py-1 text-xs text-gray-400">Demo Controls</div>
        <DropdownMenuItem onClick={toggleRole} className="text-xs text-gray-500 cursor-pointer">
          Switch to {userRole === "builder" ? "sponsor" : "builder"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Login and Signup Buttons - For guests
const AuthButtons = ({ toggleAuth }: { toggleAuth: () => void }) => {
  return (
    <div className="flex items-center space-x-4">
      <Button 
        variant="ghost" 
        onClick={toggleAuth}
      >
        Login
      </Button>
      <Button 
        variant="default"
        onClick={toggleAuth}
      >
        Sign Up
      </Button>
    </div>
  );
};

export default Navbar;
