import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import  "./ProgressPage.css";


function ProgressPage() {
    const {user} = useAuth();
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [progress, setProgress] = useState({});
    const [loading, setLoading] = useState(true);
    const [openCourses, setOpenCourses] = useState({});

    useEffect(() => {
        if (!user) return;

        fetch("http://localhost:8080/api/courses/enrolled", {
            credentials: "include",
        })
            .then(res => res.ok ? res.json() : [])
            .then(async (courses) => {
                setEnrolledCourses(courses);

                const progressMap = {};
                for (const course of courses) {
                    const res = await fetch("http://localhost:8080/api/courses/" + course.id + "/progress", {
                        credentials: "include",
                    });
                    if (res.ok) {
                        progressMap[course.id] = await res.json();
                    }
                }
                setProgress(progressMap);
                setLoading(false);
            });
    }, [user]);

    if (!user) {
        window.location.href = "/auth";
        return null;
    }
    if (loading) return <div style={{padding: "40px"}}>Завантаження...</div>;

    const getStatusIcon = (status) => {
        if (status === "DONE") return "✅";
        if (status === "IN_PROGRESS") return "🔄";
        if (status === "NOT_STARTED") return "⭕";
        return "📝";
    };

    const getStatusLabel = (status) => {
        if (status === "DONE") return "Пройдено";
        if (status === "IN_PROGRESS") return "В процесі";
        if (status === "NOT_STARTED") return "Не розпочато";
        return "Немає завдань";
    };

    const getStatusColor = (status) => {
        if (status === "DONE") return "#4a8a4a";
        if (status === "IN_PROGRESS") return "#c47a55";
        if (status === "NOT_STARTED") return "#8a6f63";
        return "#8a6f63";
    };


    return (
        <div className="progress-container">

            <h1 className="progress-title">
                Мій прогрес
            </h1>

            {enrolledCourses.length === 0 && (
                <p className="progress-empty">
                    Ви ще не записані на жоден курс
                </p>
            )}

            <div className="progress-grid">

                {enrolledCourses.map(course => {
                    const lessons = progress[course.id] || [];

                    const done = lessons.filter(l => l.status === "DONE").length;
                    const total = lessons.filter(l => l.status !== "NO_EXERCISES").length;
                    const percent = total > 0 ? Math.round((done / total) * 100) : 0;

                    return (
                        <div key={course.id} className="progress-card">

                            {/* HEADER */}
                            <div
                                className="progress-header"
                                onClick={() =>
                                    setOpenCourses(prev => ({
                                        ...prev,
                                        [course.id]: !prev[course.id]
                                    }))
                                }
                            >
                                <div className="progress-left">
                                    <span>
                                        {openCourses[course.id] ? "▼" : "▶"}
                                    </span>

                                    <h2 className="progress-course-title">
                                        {course.title}
                                    </h2>
                                </div>

                                <span className="progress-counter">
                                    {done}/{total}
                                </span>
                            </div>

                            {/* PROGRESS BAR */}
                            <div className="progress-bar">
                                <div
                                    className="progress-fill"
                                    style={{ width: percent + "%" }}
                                />
                            </div>

                            <p className="progress-percent">
                                {percent}% завершено
                            </p>

                            {/* LESSONS */}
                            {openCourses[course.id] && (
                                <div className="progress-lessons">

                                    {lessons.map((lesson, i) => (
                                        <div key={lesson.lessonId} className="lesson-item">

                                            {/* LEFT */}
                                            <div className="lesson-left">
                                                <span style={{ fontSize: "18px" }}>
                                                    {getStatusIcon(lesson.status)}
                                                </span>

                                                <span>
                                                    Заняття {i + 1}: {lesson.lessonTitle}
                                                </span>
                                            </div>

                                            {/* RIGHT */}
                                            <div className="lesson-right">

                                                <span className="lesson-score">
                                                    {lesson.correct}/{lesson.total}
                                                </span>

                                                <span
                                                    style={{
                                                        fontSize: "12px",
                                                        fontWeight: "500",
                                                        color: getStatusColor(lesson.status),
                                                        background: getStatusColor(lesson.status) + "20",
                                                        padding: "3px 10px",
                                                        borderRadius: "999px"
                                                    }}
                                                >
                                                    {getStatusLabel(lesson.status)}
                                                </span>

                                            </div>

                                        </div>
                                    ))}

                                </div>
                            )}

                        </div>
                    );
                })}

            </div>
        </div>
    );
}

export default ProgressPage;