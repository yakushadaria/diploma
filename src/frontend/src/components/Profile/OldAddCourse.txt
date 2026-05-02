import { useState } from "react";
import "./styles/AddCourse.css";

function AddCourse() {
    const [title, setTitle] = useState("");
    const [lessons, setLessons] = useState([{ title: "", content: "" }]);
    const [msg, setMsg] = useState("");
    const [description, setDescription] = useState("");
    const [language, setLanguage] = useState("");
    const [level, setLevel] = useState("");
    const [langCode, setLangCode] = useState("");
    const [showLangDropdown, setShowLangDropdown] = useState(false);

    const languages = [
        { name: "Англійська", code: "gb" },
        { name: "Українська", code: "ua" },
        { name: "Іспанська", code: "es" },
        { name: "Французька", code: "fr" },
        { name: "Німецька", code: "de" },
        { name: "Чеська", code: "cz" },
        { name: "Польська", code: "pl" },
        { name: "Японська", code: "jp" },
        { name: "Китайська", code: "cn" },
        { name: "Італійська", code: "it" },
    ];

    const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];


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
                body: JSON.stringify({ title, description, language, level }),
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
            setDescription("");
            setLanguage("");
            setLangCode("");
            setLevel("");
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

                <input
                    value={description}
                    onChange={(e) => {
                        if (e.target.value.length <= 70) setDescription(e.target.value);
                    }}
                    placeholder="Короткий опис курсу (до 70 символів)"
                />
                <p style={{ fontSize: "12px", color: "#8a6f63" }}>{description.length}/70</p>





                <div style={{ display: "flex", gap: "12px" }}>
                    {/* кастомный dropdown для языка */}
                    <div style={{ position: "relative", flex: 1 }}>
                        <div
                            onClick={() => setShowLangDropdown(!showLangDropdown)}
                            style={{
                                padding: "10px 14px",
                                borderRadius: "10px",
                                border: "1px solid #e8ddd2",
                                cursor: "pointer",
                                background: "white",
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                fontSize: "14px",
                            }}
                        >
                            {langCode && (
                                <img
                                    src={"https://flagcdn.com/24x18/" + langCode + ".png"}
                                    width="24"
                                    height="18"
                                    alt=""
                                />
                            )}
                            {language || "Виберіть мову"}
                        </div>

                        {showLangDropdown && (
                            <div style={{
                                position: "absolute",
                                top: "100%",
                                left: 0,
                                right: 0,
                                background: "white",
                                border: "1px solid #e8ddd2",
                                borderRadius: "10px",
                                zIndex: 10,
                                maxHeight: "200px",
                                overflowY: "auto",
                                marginTop: "4px",
                            }}>
                                {languages.map(l => (
                                    <div
                                        key={l.name}
                                        onClick={() => {
                                            setLanguage(l.name);
                                            setLangCode(l.code);
                                            setShowLangDropdown(false);
                                        }}
                                        style={{
                                            padding: "10px 14px",
                                            cursor: "pointer",
                                            fontSize: "14px",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px",
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.background = "#f5ede6"}
                                        onMouseLeave={e => e.currentTarget.style.background = "white"}
                                    >
                                        <img
                                            src={"https://flagcdn.com/24x18/" + l.code + ".png"}
                                            width="24"
                                            height="18"
                                            alt={l.name}
                                        />
                                        {l.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* select для уровня */}
                    <select
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                        style={{
                            flex: 1,
                            padding: "10px",
                            borderRadius: "10px",
                            border: "1px solid #e8ddd2",
                            fontSize: "14px",
                        }}
                    >
                        <option value="">Виберіть рівень</option>
                        {levels.map(l => (
                            <option key={l} value={l}>{l}</option>
                        ))}
                    </select>
                </div>






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