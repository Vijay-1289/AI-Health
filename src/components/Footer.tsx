
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-healSmart-blue mb-4">SmartHeal</h3>
            <p className="text-gray-600 mb-4">Providing quality healthcare access to everyone through innovative technology.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link to="/doctors" className="text-gray-600 hover:text-healSmart-blue">Find Doctors</Link></li>
              <li><Link to="/ai-nurse" className="text-gray-600 hover:text-healSmart-blue">AI Health Assistant</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-healSmart-blue">Health Tips</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-healSmart-blue">About Us</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-healSmart-blue">Contact</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-healSmart-blue">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-healSmart-blue">Privacy Policy</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-healSmart-blue">Terms of Service</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-healSmart-blue">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm text-center">
            &copy; {new Date().getFullYear()} SmartHeal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
