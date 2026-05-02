import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./CoursePage.css";


function CoursePage() {
    const { id } = useParams();
    const { user } = useAuth();
    const [course, setCourse] = useState(null);
    const [enrolled, setEnrolled] = useState(false);
    const [msg, setMsg] = useState("");
    const [activeLesson, setActiveLesson] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/api/courses/" + id)
            .then(res => res.ok ? res.json() : null)
            .then(data => { if (data) setCourse(data); });

        fetch("http://localhost:8080/api/courses/" + id + "/enrolled", {
            credentials: "include",
        })
            .then(res => {
                if (!res.ok) return false;
                return res.json();
            })
            .then(data => setEnrolled(data));
    }, [id]);

    const handleEnroll = async () => {
        const res = await fetch("http://localhost:8080/api/courses/" + id + "/enroll", {
            method: "POST",
            credentials: "include",
        });
        if (res.ok) {
            setEnrolled(true);
            setMsg("Ви приєднались до курсу");
        }
    };

    const handleUnenroll = async () => {
        const res = await fetch("http://localhost:8080/api/courses/unenroll/" + id, {
            method: "DELETE",
            credentials: "include",
        });
        if (res.ok) {
            setEnrolled(false);
            setMsg("Ви покинули курс");
        }
    };

    const getYoutubeEmbedUrl = (url) => {
        if (!url) return null;
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([^&]+)/);
        return match ? "https://www.youtube.com/embed/" + match[1] : null;
    };

    if (!course) return <div>Завантаження...</div>;

    if (!course.active) {
        return (
            <div style={{ padding: "40px", textAlign: "center" }}>
                <h2>Курс закрито</h2>
                <p>Викладач тимчасово закрив цей курс.</p>
            </div>
        );
    }

    return (
        <div className="course-page">
            <div className="course-sidebar">
                <h3>Матеріали курсу</h3>
                {course.lessons && course.lessons.map((lesson, i) => (
                    <div
                        key={lesson.id}
                        className={`course-lesson-item ${activeLesson?.id === lesson.id ? "active" : ""}`}
                        onClick={() => setActiveLesson(lesson)}
                    >
                        Заняття №{i + 1}
                    </div>
                ))}
            </div>

            <div className="course-content">
                {!activeLesson ? (
                    <>
                        <h1 className="course-title">{course.title}</h1>
                        <p className="course-lang">{course.language?.name} · {course.level}</p>

                        <div className="course-buttons">
                            {user?.role === "STUDENT" && (
                                <>
                                    {!enrolled ? (
                                        <button className="btn-enroll" onClick={handleEnroll}>
                                            Приєднатись до курсу
                                        </button>
                                    ) : (
                                        <button className="btn-unenroll" onClick={handleUnenroll}>
                                            Покинути курс
                                        </button>
                                    )}
                                </>
                            )}
                        </div>

                        {msg && <p className="course-msg">{msg}</p>}

                        <div className="course-topics">
                            <p>Теми, які розглядаються в курсі:</p>
                            <ol>
                                {course.lessons && course.lessons.map((lesson) => (
                                    <li key={lesson.id}>
                                        <strong>{lesson.title}</strong>
                                        <p>{lesson.content}</p>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => setActiveLesson(null)}
                            style={{ marginBottom: "16px", background: "none", border: "none", cursor: "pointer", color: "#c47a55", fontSize: "14px" }}
                        >
                            ← Назад до курсу
                        </button>

                        <h1 className="course-title">{activeLesson.title}</h1>

                        <div className="lesson-content">
                            <p>{activeLesson.content}</p>
                        </div>
                        
                        {getYoutubeEmbedUrl(activeLesson.videoUrl) && (
                            <div className="lesson-video">
                                <iframe
                                    width="60%"
                                    height="500"
                                    src={getYoutubeEmbedUrl(activeLesson.videoUrl)}
                                    title={activeLesson.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        )}

                    </>
                )}
            </div>
        </div>
    );
}

export default CoursePage;