import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl } from '../App'
import toast from 'react-hot-toast'
import SubjectCard from './SubjectCard'

function AllSubjects() {
  const [subjectData, setSubjectData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  const getAllSubject = async () => {
    try {
      setIsLoading(true)
      const res = await axios.get(`${backendUrl}/api/v1/subject/list`, { withCredentials: true });
      console.log(res)
      if(res.data.success){
        setSubjectData(res.data.subjects || [])
      }
    } catch (error) {
      console.log("Error in fetching data of subjects")
      toast.error(error.message);
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getAllSubject()
  }, [])

  // Filter subjects based on search term
  const filteredSubjects = subjectData.filter(subject => 
    subject.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSubjectDeleted = (deleteId) => {
    setSubjectData(prev => prev.filter(subject => subject._id !== deleteId))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">All Subjects</h1>
          <p className="mt-3 text-xl text-gray-500">Browse through our collection of subjects</p>
        </div>
        
        {/* Search Bar */}
        <div className="mb-10">
          <div className="max-w-md mx-auto">
            <div className="relative flex items-center">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search subjects..."
                className="block w-full rounded-md border-gray-300 pr-12 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                <kbd className="inline-flex items-center rounded border border-gray-200 px-2 font-sans text-sm font-medium text-gray-400">
                  ⌘K
                </kbd>
              </div>
            </div>
          </div>
        </div>
        
        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        )}
        
        {/* Empty State */}
        {!isLoading && filteredSubjects.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No subjects found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? 'Try adjusting your search term' : 'Get started by adding a new subject'}
            </p>
          </div>
        )}
        
        {/* Subjects Grid */}
        {!isLoading && filteredSubjects.length > 0 && (
          <>
            <div className="mb-4 flex justify-between items-center">
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{filteredSubjects.length}</span> subjects
                {searchTerm && (
                  <span> matching <span className="font-medium">"{searchTerm}"</span></span>
                )}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredSubjects.map((subject) => (
                <SubjectCard 
                  key={subject._id} 
                  name={subject.name} 
                  image={subject.image}
                  id = {subject._id} 
                  noOfSubjects={subject.topics.length} 
                  onSubjectDeleted={handleSubjectDeleted}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}


export default AllSubjects
