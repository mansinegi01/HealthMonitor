import './App.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoutes/ProtectedRoutes'
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
        <Route path="/" element={<Layout />}>

          {/* Public Routes */}
          <Route path="" element={<GetStart />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="question" element={<Question />} />

          {/* Protected Routes */}
          <Route
            path="home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="notes"
            element={
              <ProtectedRoute>
                <Notes />
              </ProtectedRoute>
            }
          />

          <Route
            path="displayNotes"
            element={
              <ProtectedRoute>
                <DisplayNotes />
              </ProtectedRoute>
            }
          />

          <Route
            path="playGames"
            element={
              <ProtectedRoute>
                <PlayGames />
              </ProtectedRoute>
            }
          />

          <Route
            path="therapy"
            element={
              <ProtectedRoute>
                <Therapy />
              </ProtectedRoute>
            }
          />

          <Route
            path="reports"
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          />

          <Route
            path="community"
            element={
              <ProtectedRoute>
                <Community />
              </ProtectedRoute>
            }
          />

          <Route
            path="workout"
            element={
              <ProtectedRoute>
                <Workout />
              </ProtectedRoute>
            }
          />

          <Route
            path="chatbot"
            element={
              <ProtectedRoute>
                <Chatbot />
              </ProtectedRoute>
            }
          />

          <Route
            path="Audio"
            element={
              <ProtectedRoute>
                <Audio />
              </ProtectedRoute>
            }
          />

          <Route
            path="consult"
            element={
              <ProtectedRoute>
                <Consult />
              </ProtectedRoute>
            }
          />

          <Route
            path="therapies/reading"
            element={
              <ProtectedRoute>
                <Reading />
              </ProtectedRoute>
            }
          />

          <Route
            path="talking"
            element={
              <ProtectedRoute>
                <Talking />
              </ProtectedRoute>
            }
          />

          <Route
            path="yoga"
            element={
              <ProtectedRoute>
                <Yoga />
              </ProtectedRoute>
            }
          />

        </Route>

      </Routes>

    </>
  )
}

export default App
