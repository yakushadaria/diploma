import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../layouts/Navbar/Navbar";
import HomePage from "../pages/Home/HomePage";
import AuthPage from "../pages/Auth/AuthPage";

function News() {
  return <h2>Новини</h2>;
}

function Profile() {
  return <h2>Мій профіль</h2>;
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
          <Route path="/" element={<HomePage />} />
          <Route path="/news" element={<News />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;