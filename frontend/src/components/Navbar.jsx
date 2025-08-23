import React, { useState } from "react";
import { useSubject } from "../context/SubjectContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../App";
import toast from "react-hot-toast";

function Navbar() {
  const { branch, setBranch, user } = useSubject();
  const branches = ["CSE", "ECE", "EEE", "MECH", "CIVIL"];
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  const navigate = useNavigate();
  const { setUser } = useSubject();

  const handleBranchClick = (selectedBranch) => {
    setBranch(selectedBranch);
  };

  const handleLogout = async () => {
    try {
      await axios.get(`${backendUrl}/api/v1/auth/logout`, { withCredentials: true });
      toast.success("Logged out Successfully");
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.log("Error in logout button frontend");
      toast.error("Failed to logout");
    }
  };

  const handleUploadNotes = () => {
    navigate("/upload");
  };

  const handleNotesClick = () => {
    navigate("/notes");
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0 flex items-center">
            <div className="text-2xl font-bold cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
              <span onClick={() => navigate("/")} className="hidden sm:inline">Paper</span>Stack
            </div>
          </div>

          {/* Branch Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-1 bg-gray-100/80 rounded-full p-1">
            {branches.map((b) => (
              <button
                key={b}
                onClick={() => handleBranchClick(b)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  branch === b
                    ? "bg-white shadow-sm text-blue-600"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/50"
                }`}
              >
                {b}
              </button>
            ))}
          </div>

          {/* Notes and Upload Notes - Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            <button 
              onClick={handleNotesClick}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 group"
            >
              <svg className="w-5 h-5 mr-2 text-gray-500 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Notes
            </button>
            
            <button 
              onClick={handleUploadNotes}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 hover:shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              Upload Notes
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={showMobileMenu ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>

          {/* Right Side - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium text-sm">
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
            </div>
            <button 
              onClick={handleLogout} 
              className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium text-sm shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Hidden by default */}
      {showMobileMenu && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {branches.map((b) => (
              <button
                key={b}
                onClick={() => handleBranchClick(b)}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  branch === b
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {b}
              </button>
            ))}
            
            <button 
              onClick={handleNotesClick}
              className="flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Notes
            </button>
            
            <button 
              onClick={handleUploadNotes}
              className="flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              Upload Notes
            </button>
            
            <button 
              onClick={handleLogout} 
              className="flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
