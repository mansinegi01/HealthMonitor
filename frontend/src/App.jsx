// import './App.css'
// import React from 'react'
// import { Routes, Route } from 'react-router-dom'
// import ProtectedRoute from './ProtectedRoutes/ProtectedRoutes'
// import Login from './Login/Login'
// import Signup from './Signup/Signup'
// import Layout from "../src/Layout/Layout"
// import Home from './Home/Home'
// import About from './About/About'
// import Contact from './Contact/Contact'
// import GetStart from './GetStart/GetStart'
// import Profile from './Profile/Profile'
// import Notes from './Notes/Notes'
// import DisplayNotes from './Notes/DisplayNotes'
// import Therapy from './QuickActioons/Therapy'
// import PlayGames from './QuickActioons/PlayGames'
// import Community from './QuickActioons/Community'

// import Workout from './QuickActioons/Workout'
// import Audio from './Therapies/Audio'
// import Consult from './Therapies/Consult'
// import Reading from './Therapies/Reading'
// import Talking from './Therapies/Talking'
// import Yoga from './Therapies/Yoga'
// import Report from './Report/Report'
// import DailyCheckIn from './DailyCheckIn/DailyCheckIn'
// import FinalReport from './FinalReport/FinalReport'
// import ChatbotIndex from "./Index"

// function App() {

//   return (
//     <>



//       <Routes>
//         <Route path="/" element={<Layout />}>

//           {/* Public Routes */}
//           <Route path="" element={<GetStart />} />
//           <Route path="login" element={<Login />} />
//           <Route path="signup" element={<Signup />} />
//           <Route path="about" element={<About />} />
//           <Route path="contact" element={<Contact />} />
//           <Route path="final-report" element={<FinalReport />} />
       


//           {/* Protected Routes */}
//           <Route
//             path="home"
//             element={
//               <ProtectedRoute>
//                 <Home />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="daily-checkin"
//             element={
//               <ProtectedRoute>
//                 <DailyCheckIn />
//               </ProtectedRoute>
//             }
//           />


//           <Route
//             path="profile"
//             element={
//               <ProtectedRoute>
//                 <Profile />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="notes"
//             element={
//               <ProtectedRoute>
//                 <Notes />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="displayNotes"
//             element={
//               <ProtectedRoute>
//                 <DisplayNotes />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="playGames"
//             element={
//               <ProtectedRoute>
//                 <PlayGames />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="therapy"
//             element={
//               <ProtectedRoute>
//                 <Therapy />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="reports"
//             element={
//               <ProtectedRoute>
//                 <Report />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="community"
//             element={
//               <ProtectedRoute>
//                 <Community />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="workout"
//             element={
//               <ProtectedRoute>
//                 <Workout />
//               </ProtectedRoute>
//             }
//           />

          

//           <Route
//           path="therapies/audio"
//           element={
//             <ProtectedRoute>
//               <Audio />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="therapies/reading"
//           element={
//             <ProtectedRoute>
//               <Reading />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="therapies/yoga"
//           element={
//             <ProtectedRoute>
//               <Yoga />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="therapies/consult"
//           element={
//             <ProtectedRoute>
//               <Consult />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="therapies/talking"
//           element={
//             <ProtectedRoute>
//               <Talking />
//             </ProtectedRoute>
//           }
//         />
        
        

//         <Route
//           path="chatbot"
//           element={
//             <ProtectedRoute>
//               <ChatbotIndex />
//             </ProtectedRoute>
//           }
//         />


//         </Route>

//       </Routes>

//     </>
//   )
// }

// export default App





import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes/ProtectedRoutes";

// Auth & Layout
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import Layout from "./Layout/Layout";

// Pages
import Home from "./Home/Home";
import About from "./About/About";
import Contact from "./Contact/Contact";
import GetStart from "./GetStart/GetStart";
import Profile from "./Profile/Profile";
import Notes from "./Notes/Notes";
import DisplayNotes from "./Notes/DisplayNotes";
import Therapy from "./QuickActioons/Therapy";
import PlayGames from "./QuickActioons/PlayGames";
import Community from "./QuickActioons/Community";
import Workout from "./QuickActioons/Workout";
import Report from "./Report/Report";
import DailyCheckIn from "./DailyCheckIn/DailyCheckIn";
import FinalReport from "./FinalReport/FinalReport";

// Therapies
import Audio from "./Therapies/Audio";
import Consult from "./Therapies/Consult";
import Reading from "./Therapies/Reading";
import Talking from "./Therapies/Talking";
import Yoga from "./Therapies/Yoga";

// Chatbot
import ChatbotIndex from "./Chatbot/Index";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        {/* Public Routes */}
        <Route index element={<GetStart />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="final-report" element={<FinalReport />} />

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
          path="daily-checkin"
          element={
            <ProtectedRoute>
              <DailyCheckIn />
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
              <Report />
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

        {/* Chatbot Routes */}
      <Route 
        path="chatbot" 
        element={
        <ProtectedRoute>
          <ChatbotIndex />
        </ProtectedRoute>
        }   
      />


        {/* Therapies */}
        <Route
          path="therapies/audio"
          element={
            <ProtectedRoute>
              <Audio />
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
          path="therapies/yoga"
          element={
            <ProtectedRoute>
              <Yoga />
            </ProtectedRoute>
          }
        />

        <Route
          path="therapies/consult"
          element={
            <ProtectedRoute>
              <Consult />
            </ProtectedRoute>
          }
        />

        <Route
          path="therapies/talking"
          element={
            <ProtectedRoute>
              <Talking />
            </ProtectedRoute>
          }
        />

      </Route>
    </Routes>
  );
}

export default App;
