import { createContext, useContext, useEffect, useState } from "react";
import axios  from 'axios'
import { backendUrl } from "../App";

export const SubjectContext = createContext();

export const SubjectContextProvider = ({ children }) => {
  const [subjects, setSubjects] = useState([]);
  const [branch, setBranch] = useState("ECE");
  const [user, setUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [StudentsNotes, setStudentsNotes] = useState([]);

  const getSubjectData = async () => {
    try {
       const res = await axios.get(`${backendUrl}/api/v1/subject/list`, { withCredentials: true })
    console.log(res.data);
    setSubjects(res.data.subjects || []);
    } catch (error) {
      console.log("Error from fetching subjects" + error.message);
    }
  }

  const getNotesData = async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/v1/notes/list`,{}, {withCredentials: true})
      console.log("notes data after reload: ",response);
      setStudentsNotes(response.data.data);

    } catch (error) {
      console.log("Error from fetching the notes data frontend" + error.message);
    }
  }


  useEffect(() => {
    getSubjectData();
    getNotesData();
  }, []);

  const data = {
    subjects,
    branch,
    setBranch,
    setSubjects,
    user, setUser,
    isCheckingAuth, setIsCheckingAuth,
    StudentsNotes, setStudentsNotes
  };

  return (
    <SubjectContext.Provider value={data}>
      {children}
    </SubjectContext.Provider>
  );
};

export const useSubject = () => useContext(SubjectContext);

