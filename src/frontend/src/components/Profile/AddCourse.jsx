import { useState } from "react";

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
        if (!title) { setMsg("Введіть назву курсу"); return; }

        // создаём курс
        const res = await fetch("http://localhost:8080/api/courses/create", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, description: "" }),
        });

        const text = await res.text();
        if (!res.ok) { setMsg(text); return; }

        // получаем id курса из ответа "OK:123"
        const courseId = text.split(":")[1];

        // добавляем уроки
        for (const lesson of lessons) {
            if (!lesson.title) continue;
            await fetch("http://localhost:8080/api/courses/" + courseId + "/lessons", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: lesson.title, content: lesson.content }),
            });
        }

        setMsg("Курс створено успішно");
        setTitle("");
        setLessons([{ title: "", content: "" }]);
    };

    return (
        <>
            <h2>Додати курс</h2>
            <div className="profile-card">
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Назва курсу"
                />

                <h3>Теми курсу</h3>

                {lessons.map((lesson, index) => (
                    <div key={index} className="lesson-item">
                        <div className="lesson-header">
                            <span>Тема №{index + 1}</span>
                            <button
                                onClick={() => removeLesson(index)}
                                className="btn-remove"
                            >✕</button>
                        </div>
                        <input
                            value={lesson.title}
                            onChange={(e) => updateLesson(index, "title", e.target.value)}
                            placeholder="Назва теми"
                        />
                        <textarea
                            value={lesson.content}
                            onChange={(e) => updateLesson(index, "content", e.target.value)}
                            placeholder="Опис теми"
                            rows={3}
                        />
                    </div>
                ))}

                <button onClick={addLesson} className="btn-add-lesson">
                    + Додати тему
                </button>

                <button onClick={handleSubmit} className="btn-save">
                    Зберегти курс
                </button>

                {msg && <p>{msg}</p>}
            </div>
        </>
    );
}

export default AddCourse;