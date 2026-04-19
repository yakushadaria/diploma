import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <div className="links">
        <Link className="link" to="/">Головна сторінка</Link>
        <Link className="link" to="/news">Новини</Link>
        <Link className="link" to="/profile">Мій профіль</Link>
        <Link className="link" to="/auth">Вхід / Реєстрація</Link>
      </div>
    </div>
  );
}

export default Navbar;