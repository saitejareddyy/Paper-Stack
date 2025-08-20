import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import AddSubject from './pages/AddSubject'
import AllSubjects from './pages/AllSubjects'
import {Toaster} from 'react-hot-toast'
export const backendUrl = "https://paper-stack-backend.onrender.com"

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/admin/add-subject' element={<AddSubject />}/>
        <Route path='/admin/subjects' element={<AllSubjects />}/>
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
