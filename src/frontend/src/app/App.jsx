import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../layouts/Navbar/Navbar";
import Home from "../pages/Home/HomePage";
import Auth from "../pages/Auth/AuthPage";
import Profile from "../pages/Profile/ProfilePage";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;