import React from "react";
import { useSubject } from "../context/SubjectContext";
import SubjectCard from "./SubjectCard";
import { useNavigate } from "react-router-dom";

function DisplaySubjects() {
  const navigate = useNavigate();
  const { subjects, branch } = useSubject();

  // Filter subjects by selected branch
  const filteredSubjects = subjects.filter((subject) => subject.branch === branch);

  return (
    <div className="min-h-screen bg-stone-50 p-6 md:p-12">
      <h1 className="mb-8 text-center text-3xl font-bold text-stone-800">
        {branch} Subjects
      </h1>

      {filteredSubjects.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No subjects available for {branch}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {filteredSubjects.map((subject) => (
            <SubjectCard
              key={subject._id}
              name={subject.name}
              image={subject.image}
              onClick={() => navigate(`/subject/${subject._id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default DisplaySubjects;
