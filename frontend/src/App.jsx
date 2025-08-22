import {Loader} from 'lucide-react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import DisplayDetails from './components/DisplayDetails'
import Navbar from './components/Navbar'
import { useContext, useEffect } from 'react'
import axios from 'axios'
import { SubjectContext} from './context/SubjectContext'
import { Toaster } from 'react-hot-toast'


import StudentNotes from './pages/StudentNotes'
export const backendUrl = "https://paper-stack-backend.onrender.com"


function App() {

  const { user, setUser, isCheckingAuth, setIsCheckingAuth } = useContext(SubjectContext);
  const navigate = useNavigate();


  const authCheck = async () => {
    setIsCheckingAuth(true);
    try {
      const response = await axios.get(`${backendUrl}/api/v1/auth/check`, { withCredentials: true });
      console.log("After reload component", response.data.user.username);
      setUser(response.data.user.username);
    } catch (error) {
      setUser(null);
      navigate("/login");
      console.log("Error in authCheck app component");
    } finally {
      setIsCheckingAuth(false);
    }
  }


  useEffect(() => {
    authCheck()
  }, [])

  if (isCheckingAuth) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className="animate-spin text-red-600 w-10 h-10" />
        </div>
      </div>
    )
  }
  return (
    <div>
      {user && <Navbar />}
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/subject/:id" element={user ? <DisplayDetails /> : <Navigate to="/login" />} />
        <Route path='/notes' element={ user ? <StudentNotes /> : <Navigate to="/login" /> } />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
