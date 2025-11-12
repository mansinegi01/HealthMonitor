import './App.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './Login/Login'
import Signup from './Signup/Signup'
import Layout from "../src/Layout/Layout"
import Home from './Home/Home'
import About from './About/About'
import Contact from './Contact/Contact'
import Header from './Header/Header'
import GetStart from './GetStart/GetStart'
import Question from './Questions/Question'
import Profile from './Profile/Profile'
import Notes from './Notes/Notes'
import DisplayNotes from './Notes/DisplayNotes'
import Therapy from './QuickActioons/Therapy'
import Reports from './QuickActioons/Reports'
import PlayGames from './QuickActioons/PlayGames'
import Community from './QuickActioons/Community'
import Chatbot from './QuickActioons/Chatbot'
import Workout from './QuickActioons/Workout'
import Audio from './Therapies/Audio'
import Consult from './Therapies/Consult'
import Reading from './Therapies/Reading'
import Talking from './Therapies/Talking'
import Yoga from './Therapies/Yoga'

function App() {

  return (
    <>
   


        <Routes>
          <Route path='/' element={<Layout />}>

            <Route path='' element={<GetStart />} />
            <Route path='home' element={<Home />} />
            <Route path='login' element={<Login />}></Route>
            <Route path='signup' element={<Signup />}></Route>
            <Route path='about' element={<About />}></Route>
            <Route path='contact' element={<Contact />}></Route>
            <Route path='question' element={<Question />}></Route>
            <Route path='profile' element={<Profile />}></Route>
            <Route path='notes' element={<Notes />}></Route>
            <Route path='displayNotes' element={<DisplayNotes />}></Route>
            <Route path='playGames' element={<PlayGames />}></Route>
            <Route path='therapy' element={<Therapy />}></Route>
            <Route path='reports' element={<Reports />}></Route>
            <Route path='community' element={<Community />}></Route>
            <Route path='workout' element={<Workout />}></Route>
            <Route path='chatbot' element={<Chatbot />}></Route>
            <Route path='Audio' element={<Audio />}></Route>
            <Route path='consult' element={<Consult />}></Route>
            <Route path='therapies/reading' element={<Reading />}></Route>
            <Route path='talking' element={<Talking />}></Route>
            <Route path='yoga' element={<Yoga />}></Route>
          </Route>
        </Routes>
      
    </>
  )
}

export default App
