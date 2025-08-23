import React, { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'
import axios from 'axios'
import { backendUrl } from '../App'
import { useSubject } from '../context/SubjectContext'
import toast from 'react-hot-toast'

function StudentNotesCard({ pdf, title, uploadedBy, likes, createdAt, notesId, isLiked: initialIsLiked }) {
  const { setStudentsNotes } = useSubject();
  const [isLiked, setIsLiked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState([]);

  // Initialize state from props when component mounts
  useEffect(() => {
    setIsLiked(initialIsLiked || false);
    setCurrentLikes(likes || []);
  }, [initialIsLiked, likes]);

  const handleLike = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/v1/notes/like`, 
        { notesId }, 
        { withCredentials: true }
      );
      
      toast.success(response.data.message);
      
      // Update local state immediately for better UX
      setIsLiked(!isLiked);
      setCurrentLikes(response.data.notes.likes);
      
      // Update global state
      setStudentsNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === notesId
            ? { 
                ...note, 
                likes: response.data.notes.likes,
                isLiked: !isLiked
              }
            : note
        )
      );

    } catch (error) {
      console.log("Error in fetching likes data", error.message);
      toast.error("Failed to update like");
    }
  }

  const handleDownload = () => {
    window.open(pdf, '_blank')
  }

  const formatDate = (dateString) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true })
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 p-6 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800 mb-2" style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {title}
          </h3>
          <p className="text-sm text-gray-600">
            Uploaded by: <span className="font-medium">{uploadedBy || 'Unknown'}</span>
          </p>
        </div>

        {/* Download Button */}
        <button
          onClick={handleDownload}
          className="ml-4 p-2 bg-blue-100 hover:bg-blue-200 rounded-full transition-colors duration-200"
          title="Download PDF"
        >
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </button>
      </div>

      {/* File Info */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center text-sm text-gray-600">
          <svg className="w-4 h-4 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          PDF Document
        </div>
      </div>

      {/* Metadata */}
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <span>{formatDate(createdAt)}</span>
        <span>{currentLikes.length} Likes</span>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-3">
        <button
          onClick={handleLike}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
            isLiked
              ? 'bg-red-100 text-red-600 hover:bg-red-200'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <svg 
            className="w-4 h-4 mr-2" 
            fill={isLiked ? "currentColor" : "none"} 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
          </svg>
          {isLiked ? 'Liked' : 'Like'}
        </button>

        <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors duration-200">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          Comment
        </button>
      </div>
    </div>
  )
}

export default StudentNotesCard
