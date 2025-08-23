import React, { useState, useMemo } from 'react';
import { useSubject } from '../context/SubjectContext';
import StudentNotesCard from './StudentNotesCard';

function StudentNotes() {
  const { StudentsNotes } = useSubject();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('newest');

  // Filter and sort notes based on search query and sort option
  const filteredAndSortedNotes = useMemo(() => {
    let result = [...StudentsNotes];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(note => 
        note.title.toLowerCase().includes(query) || 
        (note.uploadedBy.username && note.uploadedBy.username.toLowerCase().includes(query))
      );
    }
    
    // Sort notes
    switch(sortOption) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'most-liked':
        // FIX: Use likes.length instead of likes
        result.sort((a, b) => b.likes.length - a.likes.length);
        break;
      case 'title':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }
    
    return result;
  }, [StudentsNotes, searchQuery, sortOption]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">Student Notes</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Access and share study materials with your peers. Find the perfect notes for your subjects.
          </p>
        </div>
        
        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search notes by title or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-gray-700 font-medium whitespace-nowrap">Sort by:</span>
              <select 
                value={sortOption} 
                onChange={(e) => setSortOption(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="most-liked">Most Liked</option>
                <option value="title">Title (A-Z)</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Results Info */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-700">
            <span className="font-semibold">{filteredAndSortedNotes.length}</span> note{filteredAndSortedNotes.length !== 1 ? 's' : ''} found
          </p>
          
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
            >
              Clear search
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
        
        {/* Notes Grid */}
        {filteredAndSortedNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedNotes.map((notes) => (
              <StudentNotesCard
                key={notes._id}
                pdf={notes.fileUrl}
                title={notes.title}
                uploadedBy={notes.uploadedBy.username}
                likes={notes.likes}
                createdAt={notes.createdAt}
                notesId={notes._id}
                isLiked={notes.isLiked}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-10 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <h3 className="mt-4 text-xl font-medium text-gray-900">No notes found</h3>
            <p className="mt-2 text-gray-600">
              {searchQuery 
                ? `No results found for "${searchQuery}". Try adjusting your search.`
                : 'There are no notes available at the moment.'}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentNotes;
