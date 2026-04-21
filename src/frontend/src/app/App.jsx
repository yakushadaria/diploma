
/*
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../layouts/Navbar/Navbar";
import Home from "../pages/Home/HomePage";
import Auth from "../pages/Auth/AuthPage";
import Profile from "../pages/Profile/ProfilePage";

function News() {
  return <h2>Новини</h2>;
}

function About() {
  return <h2>О платформе</h2>;
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

 */


import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../layouts/Navbar/Navbar";
import Home from "../pages/Home/HomePage";
import Auth from "../pages/Auth/AuthPage";
import Profile from "../pages/Profile/ProfilePage";
import TeacherPage from "../pages/Teacher/TeacherPage.jsx";
import AdminPage from "../pages/Admin/AdminPage.jsx";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/teacher" element={<TeacherPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;