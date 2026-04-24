import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../layouts/Navbar/Navbar";
import Home from "../pages/Home/HomePage";
import Auth from "../pages/Auth/AuthPage";
import Profile from "../pages/Profile/ProfilePage";
import CoursePage from "../pages/Course/CoursePage";
import MyCoursesPage from "../pages/MyCourses/MyCoursesPage.jsx";
import MyLearningPage from "../pages/MyLearning/ MyLearningPage.jsx";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/course/:id" element={<CoursePage />} />
                    <Route path="/my-courses" element={<MyCoursesPage />} />
                    <Route path="/my-learning" element={<MyLearningPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;