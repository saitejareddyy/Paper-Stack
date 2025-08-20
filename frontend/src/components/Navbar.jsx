import React from "react";
import { useSubject } from "../context/SubjectContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../App";
import toast from "react-hot-toast";

function Navbar() {
  const { branch, setBranch } = useSubject();
  const branches = ["CSE", "ECE", "EEE", "MECH", "CIVIL"];
  
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
  }

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

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none">
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>


          <div className="bg-[#bcb5b5] rounded-3xl px-2 py-2 hover:bg-[#7a7070]">
            <p>Upload Notes</p>
          </div>

          {/* Right Side - Desktop */}
          <div onClick={handleLogout} className="hidden md:flex items-center space-x-4">
            <button className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium text-sm shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300">
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Hidden by default */}
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
          <button onClick={handleLogout} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;