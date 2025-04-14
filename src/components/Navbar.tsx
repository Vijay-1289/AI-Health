import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location.pathname]);

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
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
