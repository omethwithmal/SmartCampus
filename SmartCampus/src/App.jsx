import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 



import Home from "./components/Ometh Widmal/Home_Page/Home";
import NavBar from "./components/Ometh Widmal/NavBar/NavBar";
import Footer from "./components/Ometh Widmal/footer/footer";
import LectureHalls from "./components/Ometh Widmal/LectureHalls/LectureHalls";
import Labs from "./components/Ometh Widmal/Labs/Labs";
import MeetingRooms from "./components/Ometh Widmal/MeetingRooms/MeetingRooms";
import Equipment from "./components/Ometh Widmal/Equipment/Equipment";
import AdminSidebar from "./components/Ometh Widmal/AdminSidebar/AdminSidebar";
import AddLectureHalls from "./components/Ometh Widmal/AddLectureHalls/AddLectureHalls";
import QuickAnalyze from "./components/Ometh Widmal/QuickAnalyze/QuickAnalyze";
import LabsAnalyzeDashboard from "./components/Ometh Widmal/LabsAnalyzeDashboard/LabsAnalyzeDashboard";

function App() {
  return (
    <Router>
      <Routes>
      
      <Route path="/Home" element={<Home />} />
      <Route path="/NavBar" element={<NavBar />} />
      <Route path="/Footer" element={<Footer />} />

      <Route path="/LectureHalls" element={<LectureHalls />} />
      <Route path="/AddLectureHalls" element={<AddLectureHalls />} />


      <Route path="/Labs" element={<Labs  />} />
      <Route path="/MeetingRooms" element={<MeetingRooms />} />
      <Route path="/Equipment" element={<Equipment />} />

       <Route path="/AdminSidebar" element={<AdminSidebar />} />
       
       <Route path="/QuickAnalyze" element={<QuickAnalyze />} />
       <Route path="/LabsAnalyzeDashboard" element={<LabsAnalyzeDashboard />} />
     
     
      </Routes>
    </Router>
  );
}

export default App;
