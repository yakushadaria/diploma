import "./CourseCard.css";
import { Link } from "react-router-dom";


/*
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

*/



    const codeMap = {
        "Англійська": "gb",
        "Українська": "ua",
        "Іспанська": "es",
        "Французька": "fr",
        "Німецька": "de",
        "Чеська": "cz",
        "Польська": "pl",
        "Японська": "jp",
        "Китайська": "cn",
        "Італійська": "it",
    };


    function CourseCard({ id, title, language, level, description, teacher }) {
        return (
            <Link to={"/course/" + id} className="card-link">
                <div className="card">
                    <div className="card-header">
                        <h2 className="title">{title}</h2>
                    </div>

                    <div className="meta">
                        {language && (
                            <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "19px", fontStyle:"Times New Roman" }}>
                            {codeMap[language] && (
                                <img
                                    src={"https://flagcdn.com/24x18/" + codeMap[language] + ".png"}
                                    width="28"
                                    height="20"
                                    alt={language}
                                />
                            )}
                                {language}
                        </span>
                        )}

                        {level && <span style={{ fontSize: "19px" }}>📊 {level}</span>}
                    </div>

                    <p className="desc">{description}</p>

                    {teacher && (
                        <div className="card-footer">
                            <span className="card-teacher">@{teacher}</span>
                        </div>
                    )}

                </div>
            </Link>
        );
    }

export default CourseCard;