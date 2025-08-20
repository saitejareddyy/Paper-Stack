import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Bars3Icon,
  XMarkIcon,
  PlusCircleIcon,
  BookOpenIcon 
} from '@heroicons/react/24/outline';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    {
      name: "Add Subject",
      path: "/admin/add-subject",
      icon: <PlusCircleIcon className="w-5 h-5 mr-2" />
    },
    {
      name: "Subjects",
      path: "/admin/subjects",
      icon: <BookOpenIcon className="w-5 h-5 mr-2" />
    }
  ];

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Desktop Navbar */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            to="/admin" 
            className="flex items-center space-x-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
              <span className="text-xl font-bold text-white">⚡</span>
            </div>
            <span className="text-xl font-bold text-white hidden sm:block">Admin</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    location.pathname === link.path
                      ? 'bg-white/20 text-white shadow-lg'
                      : 'text-white/90 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/10 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-indigo-700 shadow-inner">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center px-3 py-3 rounded-md text-base font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'bg-white/20 text-white'
                    : 'text-white/90 hover:bg-white/10'
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;