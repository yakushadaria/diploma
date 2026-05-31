import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { Link } from "react-router-dom";
import CourseCard from "../../components/CourseCard/CourseCard.jsx";
import "./MyLearningPage.css";

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
                    <div key={course.id} style={{ position: "relative" }}>
                        <CourseCard
                            id={course.id}
                            title={course.title}
                            language={course.language?.name || ""}
                            level={course.level || ""}
                            description={course.description}
                            teacher={course.teacher?.username || ""}
                        />
                    </div>
                    ))}
            </div>
        </div>
    );
}

export default MyLearningPage;