import { Link } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';
import "./Navbar.css";

function Navbar() {
  const { user } = useAuth();

  return (
    <div className="navbar">
      <div className="links">
        <Link className="link" to="/">Головна сторінка</Link>
        <Link className="link" to="/news">Новини</Link>

        {!user && (
        <Link className="link" to="/about">О платформе</Link>
        )}

        {user?.role === 'teacher' && (
          <Link className="link" to="/courses">Мої курси</Link>
        )}

        {user?.role === 'student' && (
          <Link className="link" to="/my-learning">Моє навчання</Link>
        )}

        {user?.role === 'admin' && (
          <Link className="link" to="/admin">Користувачі</Link>
        )}

        {user && (
          <Link className="link" to="/profile">Мій профіль</Link>
        )}

        {!user && (
          <Link className="link" to="/auth">Вхід / Реєстрація</Link>
        )}

        {user && (
          <Link className="link" to="/logout">Вихід</Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;