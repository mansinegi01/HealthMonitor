import './App.css'
import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Login from './Login/Login'
import Signup from './Signup/Signup'
import Layout from "../Layout/Layout"
function App() {

  return (
    <>
       <Routes>
        <Route path='/' element={<Layout/>}>
  
          <Route path='login' element={<Login/>}></Route>
          <Route path='signup' element={<Signup/>}></Route>
        </Route>
       </Routes>
    </>
  )
}

export default App
