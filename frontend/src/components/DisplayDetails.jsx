import { useParams } from "react-router-dom";
import { useSubject } from "../context/SubjectContext";

function DisplayDetails() {
  const { id } = useParams();
  const { subjects } = useSubject();
  const data = subjects.find(subject => subject._id === id);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <p className="p-6 bg-white rounded-xl shadow-lg text-xl font-medium text-gray-700">
          Subject not found
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl p-6 sm:p-8">
          <div className="space-y-6">
            {/* Header Section */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <span className="inline-block px-2 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs sm:text-sm font-medium">
                  {data.branch}
                </span>
                <span className="inline-block px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs sm:text-sm font-medium">
                  Semester {data.semester}
                </span>
                <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs sm:text-sm font-medium">
                  {data.credits} Credits
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                {data.name}
              </h1>

              <p className="text-gray-700 text-sm sm:text-base leading-relaxed border-l-4 border-blue-500 pl-4 italic">
                {data.description}
              </p>
            </div>

            {/* Faculty Information Block */}
            {data.faculty && (
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl border border-purple-100 shadow-sm">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-2 rounded-lg mr-3">
                    <svg
                      className="w-5 h-5 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-purple-600 uppercase tracking-wider">
                      Subject Faculty
                    </h3>
                    <p className="text-sm sm:text-base font-medium text-gray-800">
                      {data.faculty}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Rest of your component remains the same */}
            {/* Topics Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-xl border border-blue-100 shadow-sm">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 flex items-center">
                <svg
                  className="w-5 h-5 text-blue-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Topics
              </h2>
              <ul className="space-y-2">
                {data.topics.map((topic, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg
                      className="w-4 h-4 text-blue-500 mt-1 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700 text-sm sm:text-base">
                      {topic}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Section */}
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center">
                <svg
                  className="w-5 h-5 text-gray-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Learning Resources
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {data.resources.map((res, idx) => (
                  <a
                    key={idx}
                    href={res.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white p-3 sm:p-4 rounded-lg border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-start">
                      <div className="p-1 sm:p-2 bg-blue-50 rounded-lg mr-3 sm:mr-4 group-hover:bg-blue-100 transition-colors duration-200">
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 text-sm sm:text-base group-hover:text-blue-600">
                          {res.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500">
                          {res.author || res.platform}
                        </p>
                        <span className="inline-block mt-1 text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                          {res.resourceType}
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Previous Year Papers Section */}
            {data.previousYearPapers && (
              <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 text-gray-600 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Previous Year Papers
                </h2>

                <a
                  href={data.previousYearPapers}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group border border-gray-200 rounded-lg p-3 sm:p-4 hover:border-blue-300 transition-colors duration-200 hover:shadow-md flex items-center"
                >
                  <div className="bg-blue-100 p-1 sm:p-2 rounded-lg mr-2 sm:mr-3 group-hover:bg-blue-200 transition-colors duration-200">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm sm:text-base group-hover:text-blue-600">
                      Download Paper
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Click to view PDF
                    </p>
                  </div>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplayDetails;