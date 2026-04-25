import "./CourseCard.css";
import { Link } from "react-router-dom";

function CourseCard({ id, title, language, level, description }) {
    return (
        <Link to={"/course/" + id} className="card-link">
            <div className="card">
                <h2 className="title">{title}</h2>

                <div className="meta">
                    <span>🌍 {language}</span>
                    <span>📊 {level}</span>
                </div>

                <p className="desc">{description}</p>
            </div>
        </Link>
    );
}

export default CourseCard;