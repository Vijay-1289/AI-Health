
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in with Supabase
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    getUser();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      toast.success('Successfully logged out');
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to log out. Please try again.');
    }
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-healSmart-blue">SmartHeal</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/'
                  ? 'text-healSmart-blue'
                  : 'text-gray-600 hover:text-healSmart-blue'
              }`}
            >
              Home
            </Link>
            <Link
              to="/doctors"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/doctors'
                  ? 'text-healSmart-blue'
                  : 'text-gray-600 hover:text-healSmart-blue'
              }`}
            >
              Consult Doctors
            </Link>
            <Link
              to="/ai-nurse"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/ai-nurse'
                  ? 'text-healSmart-blue'
                  : 'text-gray-600 hover:text-healSmart-blue'
              }`}
            >
              AI Health Assistant
            </Link>
            <Link
              to="/nearby-hospitals"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/nearby-hospitals'
                  ? 'text-healSmart-blue'
                  : 'text-gray-600 hover:text-healSmart-blue'
              }`}
            >
              <MapPin className="h-4 w-4 inline mr-1" />
              Nearby Hospitals
            </Link>
            
            {user ? (
              <div className="flex items-center ml-4">
                <span className="text-sm text-gray-700 mr-2">Hello, {user.user_metadata.full_name || user.email}</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-healSmart-blue border-healSmart-blue"
                  onClick={handleLogout}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 ml-4">
                <Link to="/signin">
                  <Button variant="outline" size="sm" className="text-healSmart-blue border-healSmart-blue">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="bg-healSmart-blue hover:bg-blue-700">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-healSmart-blue focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/'
                  ? 'text-healSmart-blue bg-blue-50'
                  : 'text-gray-600 hover:text-healSmart-blue hover:bg-blue-50'
              }`}
            >
              Home
            </Link>
            <Link
              to="/doctors"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/doctors'
                  ? 'text-healSmart-blue bg-blue-50'
                  : 'text-gray-600 hover:text-healSmart-blue hover:bg-blue-50'
              }`}
            >
              Consult Doctors
            </Link>
            <Link
              to="/ai-nurse"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/ai-nurse'
                  ? 'text-healSmart-blue bg-blue-50'
                  : 'text-gray-600 hover:text-healSmart-blue hover:bg-blue-50'
              }`}
            >
              AI Health Assistant
            </Link>
            <Link
              to="/nearby-hospitals"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/nearby-hospitals'
                  ? 'text-healSmart-blue bg-blue-50'
                  : 'text-gray-600 hover:text-healSmart-blue hover:bg-blue-50'
              }`}
            >
              <MapPin className="h-4 w-4 inline mr-1" />
              Nearby Hospitals
            </Link>
            
            {user ? (
              <div className="px-3 py-2">
                <p className="text-sm text-gray-700 mb-2">Hello, {user.user_metadata.full_name || user.email}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-healSmart-blue border-healSmart-blue w-full"
                  onClick={handleLogout}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="px-3 py-2 space-y-2">
                <Link to="/signin" className="block">
                  <Button variant="outline" size="sm" className="text-healSmart-blue border-healSmart-blue w-full">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup" className="block">
                  <Button size="sm" className="bg-healSmart-blue hover:bg-blue-700 w-full">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
