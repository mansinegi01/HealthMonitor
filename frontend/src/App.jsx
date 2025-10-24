import './App.css'
import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Login from './Login/Login'
import Signup from './Signup/Signup'
import Layout from "../src/Layout/Layout"
import Home from './Home/Home'
import About from './About/About'
import Contact from './Contact/Contact'
import Header from './Header/Header'
import GetStart from './GetStart/GetStart'
function App() {

  return (
    <>
       <Routes>
        <Route path='/' element={<Layout/>}>
 
          <Route path='' element={<GetStart/>}/>
          <Route path='home' element={<Home/>}/>
          <Route path='login' element={<Login/>}></Route>
          <Route path='signup' element={<Signup/>}></Route>
          <Route path='about' element={<About/>}></Route>
          <Route path='contact' element={<Contact/>}></Route>
        </Route>
       </Routes>
    </>
  )
}

export default App
