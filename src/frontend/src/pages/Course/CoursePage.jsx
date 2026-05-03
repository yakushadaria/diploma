
/*
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import ExerciseBlock from "../../components/Exercise/ExerciseBlock";
import AddExercise from "../../components/Exercise/AddExercise";

import "./CoursePage.css";

import engImg from "../../assets/Англійська.jpg";
import spaImg from "../../assets/Іспанська.jpg";
import itaImg from "../../assets/Італійська.jpg";
import fraImg from "../../assets/Французька.jpg";
import gerImg from "../../assets/Німецька.jpg";
import chiImg from "../../assets/Китайська.jpg";
import japImg from "../../assets/Японська.jpg";
import polImg from "../../assets/Польська.jpg";
import czhImg from "../../assets/Чеська.jpg";
import ukrImg from "../../assets/Українська.jpg";


const imageMap = {
    "Англійська": engImg,
    "Українська": ukrImg,
    "Іспанська": spaImg,
    "Французька": fraImg,
    "Німецька": gerImg,
    "Чеська": czhImg,
    "Польська": polImg,
    "Японська": japImg,
    "Китайська": chiImg,
    "Італійська": itaImg,
};





function CoursePage() {
    const {id} = useParams();
    const {user} = useAuth();
    const [course, setCourse] = useState(null);
    const [enrolled, setEnrolled] = useState(false);
    const [msg, setMsg] = useState("");
    const [activeLesson, setActiveLesson] = useState(null);


    useEffect(() => {
        fetch("http://localhost:8080/api/courses/" + id)
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (data) setCourse(data);
            });

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
            <div style={{padding: "40px", textAlign: "center"}}>
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
                        <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                            <p className="course-lang">{course.language?.name} · {course.level}</p>

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

                            {msg && <p className="course-msg">{msg}</p>}

                        </div>

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

                        <h1 className="course-title">{activeLesson.title}</h1>

                        <div className="lesson-content">
                            <p>{activeLesson.content}</p>
                        </div>

                        {getYoutubeEmbedUrl(activeLesson.videoUrl) && (
                            <div className="lesson-video">
                                <iframe
                                    src={getYoutubeEmbedUrl(activeLesson.videoUrl)}
                                    title={activeLesson.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        )}



                        {activeLesson && selectedType && (
                            <ExerciseBlock
                                exercises={
                                    (lessonExercises[activeLesson.id] || [])
                                        .filter(ex => ex.type === selectedType)
                                }
                            />
                        )}

                        {user?.role === "TEACHER" && (
                            <AddExercise lessonId={activeLesson.id} />
                        )}




                        <button
                            onClick={() => setActiveLesson(null)}
                            style={{
                                display: "block",
                                margin: "20px auto 0",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                color: "#c47a55",
                                fontSize: "17px",
                                fontStyle: "Ebrima"
                            }}
                        >
                            ← Назад до курсу
                        </button>

                    </>
                )}
            </div>

 */


/*
            { //правый сайдбар — на одном уровне с course-sidebar и course-content }
            <div className="course-lang-sidebar">
                {course.language?.name && imageMap[course.language.name] && (
                    <img
                        src={imageMap[course.language.name]}
                        alt={course.language.name}
                        className="course-lang-image"
                    />
                )}
            </div>
        </div>
    );
}
export default CoursePage;

 */

















import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ExerciseBlock from "../../components/Exercise/ExerciseBlock";
import AddExercise from "../../components/Exercise/AddExercise";
import "./CoursePage.css";

import engImg from "../../assets/Англійська.jpg";
import spaImg from "../../assets/Іспанська.jpg";
import itaImg from "../../assets/Італійська.jpg";
import fraImg from "../../assets/Французька.jpg";
import gerImg from "../../assets/Німецька.jpg";
import chiImg from "../../assets/Китайська.jpg";
import japImg from "../../assets/Японська.jpg";
import polImg from "../../assets/Польська.jpg";
import czhImg from "../../assets/Чеська.jpg";
import ukrImg from "../../assets/Українська.jpg";

const imageMap = {
    "Англійська": engImg,
    "Українська": ukrImg,
    "Іспанська": spaImg,
    "Французька": fraImg,
    "Німецька": gerImg,
    "Чеська": czhImg,
    "Польська": polImg,
    "Японська": japImg,
    "Китайська": chiImg,
    "Італійська": itaImg,
};

const typeLabels = {
    "MULTIPLE_CHOICE": "Тест",
    "FILL_WORD": "Вписати слово",
    "TRANSLATE": "Переклад",
};

function CoursePage() {
    const { id } = useParams();
    const { user } = useAuth();
    const [course, setCourse] = useState(null);
    const [enrolled, setEnrolled] = useState(false);
    const [msg, setMsg] = useState("");
    const [activeLesson, setActiveLesson] = useState(null);
    const [activeType, setActiveType] = useState(null);
    const [lessonExercises, setLessonExercises] = useState({});
    const [expandedLessons, setExpandedLessons] = useState({});

    useEffect(() => {
        fetch("http://localhost:8080/api/courses/" + id)
            .then(res => res.ok ? res.json() : null)
            .then(data => { if (data) setCourse(data); });

        fetch("http://localhost:8080/api/courses/" + id + "/enrolled", {
            credentials: "include",
        })
            .then(res => { if (!res.ok) return false; return res.json(); })
            .then(data => setEnrolled(data));
    }, [id]);

    const toggleLesson = async (lesson) => {
        const isExpanded = expandedLessons[lesson.id];
        setExpandedLessons(prev => ({ ...prev, [lesson.id]: !isExpanded }));

        if (!isExpanded && !lessonExercises[lesson.id]) {
            const res = await fetch("http://localhost:8080/api/exercises/lesson/" + lesson.id);
            if (res.ok) {
                const data = await res.json();
                setLessonExercises(prev => ({ ...prev, [lesson.id]: data }));
            }
        }
    };

    const handleSelectType = (lesson, type) => {
        setActiveLesson(lesson);
        setActiveType(type);
    };

    const handleEnroll = async () => {
        const res = await fetch("http://localhost:8080/api/courses/" + id + "/enroll", {
            method: "POST", credentials: "include",
        });
        if (res.ok) { setEnrolled(true); setMsg("Ви приєднались до курсу"); }
    };

    const handleUnenroll = async () => {
        const res = await fetch("http://localhost:8080/api/courses/unenroll/" + id, {
            method: "DELETE", credentials: "include",
        });
        if (res.ok) { setEnrolled(false); setMsg("Ви покинули курс"); }
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
            {/* сайдбар с занятиями и заданиями */}
            <div className="course-sidebar">
                <h3>Матеріали курсу</h3>
                {course.lessons && course.lessons.map((lesson, i) => (
                    <div key={lesson.id}>
                        {/* заголовок занятия */}
                        <div
                            className={`course-lesson-item ${activeLesson?.id === lesson.id && !activeType ? "active" : ""}`}
                            onClick={() => {
                                setActiveLesson(lesson);
                                setActiveType(null);
                                toggleLesson(lesson);
                            }}
                        >
                            Заняття №{i + 1}
                        </div>

                        {/* список типов заданий */}
                        {expandedLessons[lesson.id] && lessonExercises[lesson.id] && (
                            <div style={{ paddingLeft: "16px" }}>

                                {/* Все задания */}
                                <div
                                    className={`course-lesson-item ${activeLesson?.id === lesson.id && activeType === "ALL" ? "active" : ""}`}
                                    style={{ fontSize: "16px", paddingLeft: "16px" }}
                                    onClick={() => handleSelectType(lesson, "ALL")}
                                >
                                    Всі завдання
                                </div>

                                {/* По типам */}
                                {[...new Set((lessonExercises[lesson.id] || []).map(ex => ex.type))].map(type => (
                                    <div
                                        key={type}
                                        className={`course-lesson-item ${activeLesson?.id === lesson.id && activeType === type ? "active" : ""}`}
                                        style={{ fontSize: "16px" }}
                                        onClick={() => handleSelectType(lesson, type)}
                                    >
                                        {typeLabels[type] || type}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* основной контент */}
            <div className="course-content">
                {!activeLesson ? (
                    <>
                        <h1 className="course-title">{course.title}</h1>
                        <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                            <p className="course-lang">{course.language?.name} · {course.level}</p>
                            {user?.role === "STUDENT" && (
                                <>
                                    {!enrolled ? (
                                        <button className="btn-enroll" onClick={handleEnroll}>Приєднатись до курсу</button>
                                    ) : (
                                        <button className="btn-unenroll" onClick={handleUnenroll}>Покинути курс</button>
                                    )}
                                </>
                            )}
                            {msg && <p className="course-msg">{msg}</p>}
                        </div>

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
                ) : activeType ? (
                    // показываем задания выбранного типа
                    <>
                        <button
                            onClick={() => setActiveType(null)}
                            style={{ background: "none", border: "none", cursor: "pointer", color: "#c47a55", fontSize: "14px", marginBottom: "16px" }}
                        >
                            ← Назад до заняття
                        </button>
                        <h1 className="course-title">{activeType === "ALL" ? "Всі завдання" : typeLabels[activeType]}</h1>
                        <ExerciseBlock
                            lessonId={activeLesson.id}
                            filterType={activeType === "ALL" ? null : activeType}
                        />
                    </>
                ) : (
                    // показываем урок
                    <>
                        <h1 className="course-title">{activeLesson.title}</h1>

                        <div className="lesson-content"
                             dangerouslySetInnerHTML={{ __html: activeLesson.content }}
                        />

                        {getYoutubeEmbedUrl(activeLesson.videoUrl) && (
                            <div className="lesson-video">
                                <iframe
                                    src={getYoutubeEmbedUrl(activeLesson.videoUrl)}
                                    title={activeLesson.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        )}

                        {user?.role === "TEACHER" && (
                            <AddExercise lessonId={activeLesson.id} />
                        )}

                        <button
                            onClick={() => setActiveLesson(null)}
                            style={{ display: "block", margin: "20px auto 0", background: "none", border: "none", cursor: "pointer", color: "#c47a55", fontSize: "17px" }}
                        >
                            ← Назад до курсу
                        </button>
                    </>
                )}
            </div>

            {/* правый сайдбар с картинкой */}
            <div className="course-lang-sidebar">
                {course.language?.name && imageMap[course.language.name] && (
                    <img
                        src={imageMap[course.language.name]}
                        alt={course.language.name}
                        className="course-lang-image"
                    />
                )}
            </div>
        </div>
    );
}

export default CoursePage;

