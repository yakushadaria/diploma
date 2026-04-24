import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function MyCoursesPage() {
    const { user } = useAuth();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        if (!user) return;
        fetch("http://localhost:8080/api/courses/my", {
            credentials: "include",
        })
            .then(res => res.ok ? res.json() : [])
            .then(data => setCourses(data))
            .catch(console.error);
    }, [user]);

    if (!user) { window.location.href = "/auth"; return null; }

    return (
        <div style={{ padding: "20px" }}>
            <h1>Мої курси</h1>
            {courses.length === 0 && <p>Курсів поки немає</p>}
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

export default MyCoursesPage;







