import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddSubject = () => {
  const navigate = useNavigate();
  const backendUrl = "http://localhost:5050";
  
  // Main form state
  const [formData, setFormData] = useState({
    name: '',
    branch: 'ECE',
    description: '',
    semester: 1,
    credits: 3,
    faculty: '',
    topics: [], // Will be joined with commas for backend
    resources: [] // Will be stringified
  });

  // File states
  const [image, setImage] = useState(null);
  const [paper, setPaper] = useState(null);
  
  // Input states
  const [currentTopic, setCurrentTopic] = useState('');
  const [currentResource, setCurrentResource] = useState({
    resourceType: 'Textbook',
    title: '',
    author: '',
    link: '#'
  });
  const [loading, setLoading] = useState(false);

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Topic management
  const addTopic = () => {
    if (currentTopic.trim() && !formData.topics.includes(currentTopic.trim())) {
      setFormData(prev => ({
        ...prev,
        topics: [...prev.topics, currentTopic.trim()]
      }));
      setCurrentTopic('');
    }
  };

  const removeTopic = (index) => {
    setFormData(prev => ({
      ...prev,
      topics: prev.topics.filter((_, i) => i !== index)
    }));
  };

  // Resource management
  const addResource = () => {
    if (currentResource.title.trim() && currentResource.author.trim()) {
      setFormData(prev => ({
        ...prev,
        resources: [
          ...prev.resources,
          {
            resourceType: currentResource.resourceType,
            title: currentResource.title.trim(),
            author: currentResource.author.trim(),
            link: currentResource.link.trim() || '#'
          }
        ]
      }));
      setCurrentResource({
        resourceType: 'Textbook',
        title: '',
        author: '',
        link: '#'
      });
    }
  };

  const removeResource = (index) => {
    setFormData(prev => ({
      ...prev,
      resources: prev.resources.filter((_, i) => i !== index)
    }));
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (formData.topics.length === 0) {
      alert('Please add at least one topic');
      return;
    }

    setLoading(true);

    const uploadData = new FormData();
    
    // Append all text fields
    uploadData.append('name', formData.name);
    uploadData.append('branch', formData.branch);
    uploadData.append('description', formData.description);
    uploadData.append('semester', formData.semester.toString());
    uploadData.append('credits', formData.credits.toString());
    uploadData.append('faculty', formData.faculty);
    
    // Convert arrays to backend-expected formats
    uploadData.append('topics', formData.topics.join(',')); // Comma-separated string
    uploadData.append('resources', JSON.stringify(formData.resources));
    
    // Append files
    if (image) uploadData.append('image', image);
    if (paper) uploadData.append('paper', paper);

    try {
      const response = await axios.post(
        `${backendUrl}/api/v1/subject/add`,
        uploadData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      alert('Subject added successfully!');
      navigate('/subjects');

    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      alert(`Error: ${error.response?.data?.message || 'Failed to add subject'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Subject</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject Name*</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Branch*</label>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            >
              <option value="ECE">ECE</option>
              <option value="CSE">CSE</option>
              <option value="EEE">EEE</option>
              <option value="MECH">Mechanical</option>
              <option value="CIVIL">Civil</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Semester*</label>
            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                <option key={num} value={num}>Semester {num}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Credits*</label>
            <input
              type="number"
              name="credits"
              min="1"
              max="10"
              value={formData.credits}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* File Uploads */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject Image*</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Previous Year Papers*</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPaper(e.target.files[0])}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        
        {/* Faculty */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Faculty*</label>
          <input
            type="text"
            name="faculty"
            value={formData.faculty}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        
        {/* Topics */}
        <div className="border border-gray-200 rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Topics*
            {formData.topics.length === 0 && (
              <span className="text-red-500 ml-2">(At least one required)</span>
            )}
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={currentTopic}
              onChange={(e) => setCurrentTopic(e.target.value)}
              placeholder="Enter topic"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={addTopic}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Add
            </button>
          </div>
          {formData.topics.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.topics.map((topic, index) => (
                <div key={index} className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                  <span className="text-sm">{topic}</span>
                  <button
                    type="button"
                    onClick={() => removeTopic(index)}
                    className="ml-2 text-gray-500 hover:text-red-500"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Resources */}
        <div className="border border-gray-200 rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Resources</label>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-3">
            <select
              value={currentResource.resourceType}
              onChange={(e) => setCurrentResource({
                ...currentResource,
                resourceType: e.target.value
              })}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Textbook">Textbook</option>
              <option value="Reference">Reference</option>
              <option value="Video">Video</option>
              <option value="Slide">Slide</option>
            </select>
            <input
              type="text"
              value={currentResource.title}
              onChange={(e) => setCurrentResource({
                ...currentResource,
                title: e.target.value
              })}
              placeholder="Title"
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              value={currentResource.author}
              onChange={(e) => setCurrentResource({
                ...currentResource,
                author: e.target.value
              })}
              placeholder="Author"
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="url"
              value={currentResource.link}
              onChange={(e) => setCurrentResource({
                ...currentResource,
                link: e.target.value
              })}
              placeholder="URL"
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="button"
            onClick={addResource}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 mb-4"
          >
            Add Resource
          </button>
          
          {formData.resources.length > 0 && (
            <div className="space-y-2">
              {formData.resources.map((resource, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                  <div>
                    <p className="font-medium">
                      <span className="text-indigo-600">{resource.resourceType}:</span> {resource.title}
                    </p>
                    <p className="text-sm text-gray-600">By {resource.author}</p>
                    <a 
                      href={resource.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-500 text-sm hover:underline"
                    >
                      {resource.link}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeResource(index)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading || formData.topics.length === 0}
            className={`w-full px-4 py-3 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : formData.topics.length === 0 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
            }`}
          >
            {loading ? 'Adding Subject...' : 'Add Subject'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSubject;
