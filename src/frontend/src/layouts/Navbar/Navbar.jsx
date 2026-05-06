import { Link } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';
import "./Navbar.css";

function Navbar() {
  //const { user } = useAuth();
  const { user, logout } = useAuth();

  return (
    <div className="navbar">
      <div className="links">
        <Link className="link" to="/">Головна сторінка</Link>
        <Link className="link" to="/news">Новини</Link>

        {!user && (
        <Link className="link" to="/about">О платформе</Link>
        )}

        {user?.role === 'TEACHER' && (
          <Link className="link" to="/my-courses">Мої курси</Link>
        )}





        {user?.role === "STUDENT" && (
              <Link className="link" to="/progress">Мій прогрес</Link>
        )}


        {user?.role === 'STUDENT' && (
          <Link className="link" to="/my-learning">Моє навчання</Link>
        )}





        {user?.role === 'ADMIN' && (
          <Link className="link" to="/admin">Користувачі</Link>
        )}

        {user && (
          <Link className="link" to="/profile">Мій профіль</Link>
        )}

        {!user && (
          <Link className="link" to="/auth">Вхід / Реєстрація</Link>
        )}

        {user && (
            <span className="link" onClick={logout} style={{ cursor: "pointer" }}>
            Вихід
          </span>
        )}
      </div>
    </div>
  );
}

export default Navbar;