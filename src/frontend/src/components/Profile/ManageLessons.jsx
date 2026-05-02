import { useState, useEffect } from "react";

function ManageLessons() {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [lessons, setLessons] = useState([]);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ title: "", content: "", videoUrl: "" });
    const [msg, setMsg] = useState("");

    useEffect(() => {
        fetch("http://localhost:8080/api/courses/my", { credentials: "include" })
            .then(res => res.ok ? res.json() : [])
            .then(data => setCourses(data));
    }, []);

    const selectCourse = (course) => {
        setSelectedCourse(course);
        setLessons(course.lessons || []);
        setEditing(null);
        setMsg("");
    };

    const handleEdit = (lesson) => {
        setEditing(lesson.id);
        setForm({ title: lesson.title, content: lesson.content, videoUrl: lesson.videoUrl || "" });
    };

    const handleSave = async () => {
        const res = await fetch("http://localhost:8080/api/courses/lessons/" + editing, {
            method: "PUT",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        if (res.ok) {
            setLessons(lessons.map(l => l.id === editing ? { ...l, ...form } : l));
            setEditing(null);
            setMsg("Збережено");
        }
    };

    const handleDelete = async (lessonId) => {
        const ok = window.confirm("Видалити заняття?");
        if (!ok) return;

        const res = await fetch("http://localhost:8080/api/courses/lessons/" + lessonId, {
            method: "DELETE",
            credentials: "include",
        });

        if (res.ok) {
            setLessons(lessons.filter(l => l.id !== lessonId));
            setMsg("Заняття видалено");
        }
    };

    const handleAdd = async () => {
        if (!form.title.trim()) { setMsg("Введіть назву"); return; }

        const res = await fetch("http://localhost:8080/api/courses/" + selectedCourse.id + "/lessons", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        if (res.ok) {
            const updated = await fetch("http://localhost:8080/api/courses/" + selectedCourse.id)
                .then(r => r.json());
            setLessons(updated.lessons || []);
            setForm({ title: "", content: "", videoUrl: "" });
            setMsg("Заняття додано");
        }
    };

    return (
        <>
            <h2>Керування заняттями</h2>
            <div className="profile-card">

                <select
                    onChange={(e) => {
                        const course = courses.find(c => c.id === parseInt(e.target.value));
                        if (course) selectCourse(course);
                    }}
                    style={{ padding: "10px", borderRadius: "10px", border: "1px solid #e8ddd2", width: "100%", marginBottom: "16px" }}
                >
                    <option value="">Виберіть курс</option>
                    {courses.map(c => (
                        <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                </select>

                {selectedCourse && (
                    <>
                        <h3>Заняття курсу: {selectedCourse.title}</h3>

                        {lessons.map((lesson, i) => (
                            <div key={lesson.id} style={{ border: "1px solid #e8ddd2", borderRadius: "10px", padding: "12px", marginBottom: "10px" }}>
                                {editing === lesson.id ? (
                                    <>
                                        <input
                                            value={form.title}
                                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                                            placeholder="Назва"
                                            style={{ width: "100%", marginBottom: "8px", padding: "8px", borderRadius: "8px", border: "1px solid #e8ddd2" }}
                                        />
                                        <textarea
                                            value={form.content}
                                            onChange={(e) => setForm({ ...form, content: e.target.value })}
                                            placeholder="Опис"
                                            rows={3}
                                            style={{ width: "100%", marginBottom: "8px", padding: "8px", borderRadius: "8px", border: "1px solid #e8ddd2" }}
                                        />
                                        <input
                                            value={form.videoUrl}
                                            onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                                            placeholder="YouTube посилання"
                                            style={{ width: "100%", marginBottom: "8px", padding: "8px", borderRadius: "8px", border: "1px solid #e8ddd2" }}
                                        />
                                        <div style={{ display: "flex", gap: "8px" }}>
                                            <button onClick={handleSave}>Зберегти</button>
                                            <button onClick={() => setEditing(null)}>Скасувати</button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <p><strong>Заняття {i + 1}: {lesson.title}</strong></p>
                                        <p style={{ fontSize: "13px", color: "#8a6f63" }}>{lesson.content?.substring(0, 80)}...</p>
                                        {lesson.videoUrl && <p style={{ fontSize: "12px", color: "#c47a55" }}>📹 Відео додано</p>}
                                        <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                                            <button onClick={() => handleEdit(lesson)}>Редагувати</button>
                                            <button onClick={() => handleDelete(lesson.id)}>Видалити</button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}

                        <h3 style={{ marginTop: "16px" }}>Додати нове заняття</h3>
                        <input
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            placeholder="Назва заняття"
                            style={{ width: "100%", marginBottom: "8px", padding: "8px", borderRadius: "8px", border: "1px solid #e8ddd2" }}
                        />
                        <textarea
                            value={form.content}
                            onChange={(e) => setForm({ ...form, content: e.target.value })}
                            placeholder="Опис заняття"
                            rows={3}
                            style={{ width: "100%", marginBottom: "8px", padding: "8px", borderRadius: "8px", border: "1px solid #e8ddd2" }}
                        />
                        <input
                            value={form.videoUrl}
                            onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                            placeholder="YouTube посилання (необов'язково)"
                            style={{ width: "100%", marginBottom: "8px", padding: "8px", borderRadius: "8px", border: "1px solid #e8ddd2" }}
                        />
                        <button onClick={handleAdd}>Додати заняття</button>
                    </>
                )}

                {msg && <p style={{ color: "#c47a55", marginTop: "10px" }}>{msg}</p>}
            </div>
        </>
    );
}

export default ManageLessons;