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

    useEffect(() => {
        fetch("http://localhost:8080/api/courses/" + id)
            .then(res => res.ok ? res.json() : null)
            .then(data => { if (data) setCourse(data); });

        fetch("http://localhost:8080/api/courses/" + id + "/enrolled", {
            credentials: "include",
        })
            .then(res => res.json())
            .then(data => {
                console.log("enrolled:", data);
                setEnrolled(data);
            });
    }, [id]);


    fetch("http://localhost:8080/api/courses/" + id + "/enrolled", {
        credentials: "include",
    })
        .then(res => {
            if (!res.ok) return false;
            return res.json();
        })
        .then(data => {
            console.log("enrolled:", data);
            setEnrolled(data);
        });

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

    if (!course) return <div>Завантаження...</div>;

    if (!course.active) {
        return (
            <div style={{ padding: "40px", textAlign: "center" }}>
                <h2>Курс закрито</h2>
                <p>Викладач тимчасово закрив цей курс</p>
            </div>
        );
    }

    return (
        <div className="course-page">
            <div className="course-sidebar">
                <h3>Матеріали курсу</h3>
                {course.lessons && course.lessons.map((lesson, i) => (
                    <div key={lesson.id} className="course-lesson-item">
                        Заняття №{i + 1}
                    </div>
                ))}
            </div>





            <div className="course-content">
                <h1 className="course-title">{course.title}</h1>

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
                        {course.lessons && course.lessons.map((lesson, i) => (
                            <li key={lesson.id}>
                                <strong>{lesson.title}</strong>
                                <p>{lesson.content}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    );
}

export default CoursePage;