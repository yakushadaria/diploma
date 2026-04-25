import { useState } from "react";
import "./styles/AddCourse.css";

function AddCourse() {
    const [title, setTitle] = useState("");
    const [lessons, setLessons] = useState([{ title: "", content: "" }]);
    const [msg, setMsg] = useState("");

    const addLesson = () => {
        setLessons([...lessons, { title: "", content: "" }]);
    };

    const removeLesson = (index) => {
        setLessons(lessons.filter((_, i) => i !== index));
    };

    const updateLesson = (index, field, value) => {
        const updated = [...lessons];
        updated[index][field] = value;
        setLessons(updated);
    };

    const handleSubmit = async () => {
        if (!title.trim()) {
            setMsg("Введіть назву курсу");
            return;
        }

        try {
            const res = await fetch("http://localhost:8080/api/courses/create", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, description: "" }),
            });

            const text = await res.text();

            if (!res.ok) {
                setMsg(text);
                return;
            }

            const courseId = text.split(":")[1];

            for (const lesson of lessons) {
                if (!lesson.title.trim()) continue;

                await fetch(`http://localhost:8080/api/courses/${courseId}/lessons`, {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        title: lesson.title,
                        content: lesson.content,
                    }),
                });
            }

            setMsg("Курс створено успішно 🎉");

            setTitle("");
            setLessons([{ title: "", content: "" }]);
        } catch (e) {
            setMsg("Помилка з'єднання");
        }
    };

    return (
        <div className="add-course-page">

            <h2 className="profile-title">Додати курс</h2>

            <div className="profile-card add-course-card">

                <input
                    className="course-title-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Назва курсу"
                />

                <div className="lessons-header">
                    <h3>Теми курсу</h3>
                    <button onClick={addLesson} className="btn-add-lesson">
                        + Додати тему
                    </button>
                </div>

                <div className="lessons-list">
                    {lessons.map((lesson, index) => (
                        <div key={index} className="lesson-card">

                            <div className="lesson-top">
                                <span>Тема {index + 1}</span>

                                <button
                                    onClick={() => removeLesson(index)}
                                    className="btn-remove"
                                >
                                    ✕
                                </button>
                            </div>

                            <input
                                value={lesson.title}
                                onChange={(e) =>
                                    updateLesson(index, "title", e.target.value)
                                }
                                placeholder="Назва теми"
                            />

                            <textarea
                                value={lesson.content}
                                onChange={(e) =>
                                    updateLesson(index, "content", e.target.value)
                                }
                                placeholder="Опис теми"
                                rows={3}
                            />
                        </div>
                    ))}
                </div>

                <button onClick={handleSubmit} className="btn-save">
                    Зберегти курс
                </button>

                {msg && <p className="course-msg">{msg}</p>}
            </div>
        </div>
    );
}

export default AddCourse;