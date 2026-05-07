import "./CourseCard.css";
import { Link } from "react-router-dom";
import StarRating from "../../components/StarRating";
import {useEffect, useState} from "react";

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

        const [rating, setRating] = useState({ average: 0, count: 0 });

        useEffect(() => {
            fetch("http://localhost:8080/api/courses/" + id + "/rating")
                .then(res => res.ok ? res.json() : { average: 0, count: 0 })
                .then(setRating);
        }, [id]);




        return (
            <Link to={"/course/" + id} className="card-link">
                <div className="card">
                    <div className="card-header">
                        <h2 className="title">{title}</h2>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "2px" }}>
                            <StarRating value={Math.round(rating.average)} readonly />
                            <span style={{ fontSize: "11px", color: "#8a6f63" }}>
                            {rating.average > 0 ? rating.average + " (" + rating.count + ")" : "Немає оцінок"}
                        </span>
                        </div>
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





