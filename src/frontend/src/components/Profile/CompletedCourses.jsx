import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function CompletedCourses() {
    const [courses, setCourses] = useState([]);
    const [progress, setProgress] = useState({});

    useEffect(() => {
        fetch("http://localhost:8080/api/courses/enrolled", { credentials: "include" })
            .then(res => res.ok ? res.json() : [])
            .then(async (data) => {
                setCourses(data);
                const progressMap = {};
                for (const course of data) {
                    const res = await fetch("http://localhost:8080/api/courses/" + course.id + "/progress", {
                        credentials: "include",
                    });
                    if (res.ok) progressMap[course.id] = await res.json();
                }
                setProgress(progressMap);
            });
    }, []);

    const isCompleted = (courseId) => {
        const lessons = progress[courseId] || [];
        const withExercises = lessons.filter(l => l.status !== "NO_EXERCISES");
        if (withExercises.length === 0) return false;
        return withExercises.every(l => l.status === "DONE");
    };

    const completedCourses = courses.filter(c => isCompleted(c.id));

    return (
        <>
            <h2 className="profile-title">Завершені курси</h2>
            <div className="profile-card">
                {completedCourses.length === 0 && <p style={{ color: "#8a6f63" }}>Завершених курсів немає</p>}
                {completedCourses.map(course => (
                    <div key={course.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", paddingBottom: "12px", borderBottom: "1px solid #e8ddd2" }}>
                        <Link to={"/course/" + course.id} style={{ textDecoration: "none", color: "#2f2a26", fontWeight: "500" }}>
                            {course.title}
                        </Link>
                        <span style={{ fontSize: "13px", color: "#4a8a4a", background: "#f0faf0", padding: "4px 10px", borderRadius: "999px" }}>
                            ✅ Завершено
                        </span>
                    </div>
                ))}
            </div>
        </>
    );
}

export default CompletedCourses;