import { useState } from "react";

function SubjectCard({ name, image, onClick }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div 
      onClick={onClick} 
      className="w-full max-w-xs overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer group"
    >
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden">
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
                className="w-12 h-12 mx-auto text-gray-400" 
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
              <span className="text-sm text-gray-500 mt-2">No image available</span>
            </div>
          </div>
        )}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent" />
      </div>

      {/* Subject Name */}
      <div className="p-4 text-center bg-white">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
          {name}
        </h3>
        <div className="mt-2">
          <span className="inline-block px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">
            View Details
          </span>
        </div>
      </div>
    </div>
  );
}

export default SubjectCard;