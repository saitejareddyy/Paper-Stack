import { createContext, useContext, useEffect, useState } from "react";
import axios  from 'axios'
import { backendUrl } from "../App";

export const SubjectContext = createContext();

export const SubjectContextProvider = ({ children }) => {
  const [subjects, setSubjects] = useState([]);
  const [branch, setBranch] = useState("ECE");
  const [user, setUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);


  const getSubjectData = async () => {
    try {
       const res = await axios.get(`${backendUrl}/api/v1/subject/list`, { withCredentials: true })
    console.log(res.data);
    setSubjects(res.data.subjects || []);
    } catch (error) {
      console.log("Error from fetching subjects" + error.message);
    }
  }

  useEffect(() => {
    getSubjectData();
  }, []);

  const data = {
    subjects,
    branch,
    setBranch,
    setSubjects,
    user, setUser,
    isCheckingAuth, setIsCheckingAuth
  };

  return (
    <SubjectContext.Provider value={data}>
      {children}
    </SubjectContext.Provider>
  );
};

export const useSubject = () => useContext(SubjectContext);
