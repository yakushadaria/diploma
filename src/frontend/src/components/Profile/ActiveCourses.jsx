import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function ActiveCourses() {
    const { user } = useAuth();
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

    const getPercent = (courseId) => {
        const lessons = progress[courseId] || [];
        const withExercises = lessons.filter(l => l.status !== "NO_EXERCISES");
        if (withExercises.length === 0) return 0;
        const done = withExercises.filter(l => l.status === "DONE").length;
        return Math.round((done / withExercises.length) * 100);
    };

    const activeCourses = courses.filter(c => !isCompleted(c.id));

    return (
        <>
            <h2 className="profile-title">Активні курси</h2>
            <div className="profile-card">
                {activeCourses.length === 0 && <p style={{ color: "#8a6f63" }}>Активних курсів немає</p>}
                {activeCourses.map(course => {
                    const percent = getPercent(course.id);
                    return (
                        <div key={course.id} style={{ marginBottom: "16px", paddingBottom: "16px", borderBottom: "1px solid #e8ddd2" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                                <Link to={"/course/" + course.id} style={{ textDecoration: "none", color: "#2f2a26", fontWeight: "500" }}>
                                    {course.title}
                                </Link>
                                <span style={{ fontSize: "13px", color: "#8a6f63" }}>{percent}%</span>
                            </div>
                            <div style={{ background: "#e8ddd2", borderRadius: "999px", height: "6px", overflow: "hidden" }}>
                                <div style={{ width: percent + "%", height: "100%", background: "#c47a55", borderRadius: "999px", transition: "width 0.5s" }} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default ActiveCourses;