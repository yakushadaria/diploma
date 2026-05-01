import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { Link } from "react-router-dom";

function MyLearningPage() {
    const { user } = useAuth();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        if (!user) return;
        fetch("http://localhost:8080/api/courses/enrolled", {
            credentials: "include",
        })
            .then(res => res.ok ? res.json() : [])
            .then(data => setCourses(data))
            .catch(console.error);
    }, [user]);

    if (!user) { window.location.href = "/auth"; return null; }

    return (
        <div style={{ padding: "30px" }}>
            {courses.length === 0 && <p>Ви ще не записані на жоден курс</p>}
            <div className="grid">
                {courses.map(course => (
                    <Link key={course.id} to={"/course/" + course.id} style={{ textDecoration: "none", color: "inherit" }}>
                        <div className="card">
                            <h2>{course.title}</h2>
                            <p>{course.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default MyLearningPage;