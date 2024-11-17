import React, { createContext, useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import axios from 'axios'
import Create from './components/Create'
import Post from './components/Post'
import EditPost from './components/EditPost'

export const userContext = createContext()

const App = () => {

  const [user,setuser] = useState("")
  const API_URL = "https://blog-page-mern-backend.onrender.com"

  async function getData() {
    try{
      const response = await axios.get(`${API_URL}/auth/verify`, {withCredentials: true})
      setuser(response.data)
    }
    catch(err){
      console.log(`Error in Get Data - ${err}`)
    }
  }

  useEffect(() =>{
    getData()
  },[])

  return (
    <userContext.Provider value={user}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<Create />} />
          <Route path='post/:id' element={<Post />} />
          <Route path='/editpost/:id' element={<EditPost />} />
        </Routes>
      </BrowserRouter>
    </userContext.Provider>
  )
}

export default App
