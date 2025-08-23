import { useState, useRef } from "react";
import axios from 'axios';
import { backendUrl } from '../App';
import toast from 'react-hot-toast';

function SubjectCard({ name, image, id, noOfSubjects, onSubjectDeleted }) {
  const [imgError, setImgError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteTimeoutRef = useRef(null);
  const showUndoRef = useRef(false);

  const handleDelete = () => {
    setIsDeleting(true);
    showUndoRef.current = true;
    
    // Show toast with undo option
    toast.success(
      <div className="flex items-center">
        <span>Subject will be deleted in 5 seconds</span>
        <button 
          onClick={handleUndo} 
          className="ml-3 px-3 py-1 bg-white text-blue-600 rounded-md text-sm font-medium border border-gray-200 hover:bg-gray-50"
        >
          Undo
        </button>
      </div>,
      { 
        duration: 5000,
        icon: '⏱️'
      }
    );
    
    // Set timeout for actual deletion
    deleteTimeoutRef.current = setTimeout(async () => {
      if (showUndoRef.current) { // If undo wasn't clicked
        try {
          await axios.post(`${backendUrl}/api/v1/subject/remove`, {id: id});
          toast.success("Subject deleted successfully");
          if (onSubjectDeleted) {
            onSubjectDeleted(id);
          }
        } catch (error) {
          console.error("Delete error:", error);
          setIsDeleting(false);
          toast.error("Failed to delete subject");
        }
      }
    }, 5000);
  };

  const handleUndo = () => {
    // Clear the deletion timeout
    if (deleteTimeoutRef.current) {
      clearTimeout(deleteTimeoutRef.current);
      deleteTimeoutRef.current = null;
    }
    
    showUndoRef.current = false;
    setIsDeleting(false);
    toast.success("Delete cancelled");
  };

  return (
    <div className={`w-full max-w-xs overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer group relative ${isDeleting ? "opacity-70" : ""}`}>
      {/* Show pending deletion overlay */}
      {isDeleting && (
        <div className="absolute inset-0 bg-yellow-100 bg-opacity-70 z-10 flex items-center justify-center rounded-2xl">
          <div className="text-center p-4">
            <div className="w-16 h-16 mx-auto mb-3 bg-yellow-500 bg-opacity-20 rounded-full flex items-center justify-center">
              <svg 
                className="w-8 h-8 text-yellow-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-yellow-800 mb-2">Deleting...</h3>
            <p className="text-sm text-yellow-600 mb-3">This subject will be deleted in 5 seconds</p>
            <button
              onClick={handleUndo}
              className="px-4 py-2 bg-white text-yellow-700 rounded-full text-sm font-medium hover:bg-yellow-50 transition-colors duration-300 border border-yellow-300"
            >
              Cancel Delete
            </button>
          </div>
        </div>
      )}
      
      {/* Image Container */}
      <div className="relative h-52 w-full overflow-hidden">
        {!imgError ? (
          <img
            src={image}
            alt={name}
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="text-center p-4">
              <svg 
                className="w-16 h-16 mx-auto text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                />
              </svg>
              <span className="text-sm text-gray-500 mt-2 block">No image available</span>
            </div>
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
        
        {/* Subject Name Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white drop-shadow-md truncate">{name}</h3>
        </div>
        
        {/* Favorite Button */}
        <button className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors duration-300 shadow-sm">
          <svg 
            className="w-5 h-5 text-gray-600 hover:text-red-500" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
          </svg>
        </button>
      </div>

      {/* Card Content */}
      <div className="p-5 bg-white">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <svg 
              className="w-4 h-4 text-yellow-400 mr-1" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-medium text-gray-600">4.8</span>
          </div>
          
          <span className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">
            {noOfSubjects} Topics
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          Explore various concepts and topics related to {name} with our comprehensive learning materials.
        </p>
        
        <div className="flex justify-between items-center">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-300 flex items-center">
            View Details
            <svg 
              className="w-4 h-4 ml-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M14 5l7 7m0 0l-7 7m7-7H3" 
              />
            </svg>
          </button>
          
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors duration-300 flex items-center justify-center disabled:opacity-50"
            aria-label="Delete subject"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubjectCard;
