import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ExerciseBlock from "../../components/Exercise/ExerciseBlock";
import AddExercise from "../../components/Exercise/AddExercise";
import TeacherExerciseList from "../../components/Exercise/TeacherExerciseList.jsx";
import "./CoursePage.css";
import StarRating from "../../components/StarRating";


import engImg from "../../assets/language/Англійська.jpg";
import spaImg from "../../assets/language/Іспанська.jpg";
import itaImg from "../../assets/language/Італійська.jpg";
import fraImg from "../../assets/language/Французька.jpg";
import gerImg from "../../assets/language/Німецька.jpg";
import chiImg from "../../assets/language/Китайська.jpg";
import japImg from "../../assets/language/Японська.jpg";
import polImg from "../../assets/language/Польська.jpg";
import czhImg from "../../assets/language/Чеська.jpg";
import ukrImg from "../../assets/language/Українська.jpg";

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
    "SPEAKING": "Говоріння",
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
    const [lessonExercisesMap, setLessonExercisesMap] = useState({});

    const [myRating, setMyRating] = useState(0);
    const [avgRating, setAvgRating] = useState({ average: 0, count: 0 });
    const [ratingMsg, setRatingMsg] = useState("");


    /*
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



    fetch("http://localhost:8080/api/courses/" + id + "/rating")
        .then(res => res.ok ? res.json() : { average: 0, count: 0 })
        .then(setAvgRating);

    fetch("http://localhost:8080/api/courses/" + id + "/my-rating", {
        credentials: "include",
    })
        .then(res => res.ok ? res.json() : 0)
        .then(setMyRating);
*/


    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            try {
                const courseRes = await fetch("http://localhost:8080/api/courses/" + id);
                const courseData = await courseRes.json();

                const enrolledRes = await fetch("http://localhost:8080/api/courses/" + id + "/enrolled", {
                    credentials: "include",
                });
                const enrolledData = await enrolledRes.json();

                const ratingRes = await fetch("http://localhost:8080/api/courses/" + id + "/rating");
                const ratingData = await ratingRes.json();

                const myRatingRes = await fetch("http://localhost:8080/api/courses/" + id + "/my-rating", {
                    credentials: "include",
                });
                const myRatingData = await myRatingRes.json();

                if (isMounted) {
                    setCourse(courseData);
                    setEnrolled(enrolledData);
                    setAvgRating(ratingData);
                    setMyRating(myRatingData);
                }

            } catch (e) {
                console.error("FETCH ERROR:", e);
            }
        };

        loadData();

        return () => {
            isMounted = false;
        };

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



    const handleDeleteExercise = async (exerciseId, lessonId) => {
        const res = await fetch("http://localhost:8080/api/exercises/" + exerciseId, {
            method: "DELETE",
            credentials: "include",
        });
        if (res.ok) {
            setLessonExercises(prev => ({
                ...prev,
                [lessonId]: prev[lessonId].filter(ex => ex.id !== exerciseId),
            }));
        }
    };


    const loadExercises = async (lessonId) => {
        const res = await fetch("http://localhost:8080/api/exercises/lesson/" + lessonId);
        if (res.ok) {
            const data = await res.json();
            setLessonExercisesMap(prev => ({ ...prev, [lessonId]: data }));
        }
    };







    // функция выставления рейтинга
    const handleRating = async (value) => {
        const res = await fetch("http://localhost:8080/api/courses/" + id + "/rating", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ rating: value }),
        });

        if (res.ok) {
            setMyRating(value);
            setRatingMsg("Дякуємо за оцінку!");
            fetch("http://localhost:8080/api/courses/" + id + "/rating")
                .then(r => r.json())
                .then(setAvgRating);
            setTimeout(() => setRatingMsg(""), 2000);
        } else {
            const text = await res.text();
            setRatingMsg(text);
            setTimeout(() => setRatingMsg(""), 3000);
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
                                loadExercises(lesson.id);
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
                            courseLang={course.language?.name}
                            enrolled={enrolled}
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



                        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                <StarRating value={Math.round(avgRating.average)} readonly />
                                <span style={{ fontSize: "13px", color: "#8a6f63" }}>
            {avgRating.average > 0 ? avgRating.average + " (" + avgRating.count + ")" : "Немає оцінок"}
        </span>
                            </div>

                            {user?.role === "STUDENT" && enrolled && (
                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                    <span style={{ fontSize: "13px", color: "#8a6f63" }}>Ваша оцінка:</span>
                                    <StarRating value={myRating} onChange={handleRating} />
                                </div>
                            )}

                            {ratingMsg && <p style={{ fontSize: "13px", color: "#c47a55" }}>{ratingMsg}</p>}
                        </div>





                        {/* список заданий только для учителя */}
                        {user?.role === "TEACHER" && (
                            <div style={{ marginTop: "24px", borderTop: "1px solid #e8ddd2", paddingTop: "16px" }}>
                                <h3 style={{ fontSize: "15px", fontWeight: "600", color: "#2f2a26", marginBottom: "12px" }}>
                                    Завдання до заняття
                                </h3>

                                <TeacherExerciseList
                                    lessonId={activeLesson.id}
                                    exercises={lessonExercises[activeLesson.id] || []}
                                    onDelete={(id) => handleDeleteExercise(id, activeLesson.id)}
                                />
                            </div>
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
            {user?.role === "TEACHER" && activeType === "ALL" ? (

                // для учителя во вкладке заданий — форма добавления
                <div style={{
                    width: "320px",
                    minWidth: "320px",
                    borderLeft: "1px solid #e8ddd2",
                    padding: "24px 16px",
                    overflowY: "auto",

                }}>

    <>
                    <TeacherExerciseList
                        exercises={lessonExercisesMap[activeLesson.id] || []}
                        onDelete={async (id) => {
                            await fetch("http://localhost:8080/api/exercises/" + id, {
                                method: "DELETE",
                                credentials: "include",
                            });
                            loadExercises(activeLesson.id);
                        }}
                    />
                    <div style={{ marginTop: "24px", borderTop: "1px solid #e8ddd2", paddingTop: "16px" }}>
                        <AddExercise
                            lessonId={activeLesson.id}
                            onAdded={() => loadExercises(activeLesson.id)}
                        />
                    </div>
                </>
                </div>

            ) : (
                // для всех остальных — картинка языка
                <div className="course-lang-sidebar">
                    {course.language?.name && imageMap[course.language.name] && (
                        <img
                            src={imageMap[course.language.name]}
                            alt={course.language.name}
                            className="course-lang-image"
                        />
                    )}
                </div>
            )}
        </div>
    );
}

export default CoursePage;

