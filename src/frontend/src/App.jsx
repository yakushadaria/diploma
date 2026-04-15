import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import HomePage from "./HomePage";
import AuthPage from "./AuthPage";

function News() {
  return <h2>Новини</h2>;
}

function Profile() {
  return <h2>Мій профіль</h2>;
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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;