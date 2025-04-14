
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-healSmart-blue">
                SmartHeal
              </h1>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-600 hover:text-healSmart-blue px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link to="/doctors" className="text-gray-600 hover:text-healSmart-blue px-3 py-2 rounded-md text-sm font-medium">
              Consult Doctors
            </Link>
            <Link to="/ai-nurse" className="text-gray-600 hover:text-healSmart-blue px-3 py-2 rounded-md text-sm font-medium">
              AI Nurse
            </Link>
            <Button variant="outline" className="ml-4">
              Sign In
            </Button>
            <Button>
              Sign Up
            </Button>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-healSmart-blue"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="text-gray-600 hover:bg-healSmart-lightBlue hover:text-healSmart-blue block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/doctors" 
              className="text-gray-600 hover:bg-healSmart-lightBlue hover:text-healSmart-blue block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Consult Doctors
            </Link>
            <Link 
              to="/ai-nurse" 
              className="text-gray-600 hover:bg-healSmart-lightBlue hover:text-healSmart-blue block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              AI Nurse
            </Link>
            <div className="mt-4 space-y-2 px-3">
              <Button variant="outline" className="w-full">
                Sign In
              </Button>
              <Button className="w-full">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
