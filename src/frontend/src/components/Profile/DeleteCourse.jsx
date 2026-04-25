import { useState, useEffect } from "react";

function DeleteCourse() {
    const [courses, setCourses] = useState([]);
    const [selectedId, setSelectedId] = useState("");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        fetch("http://localhost:8080/api/courses/my", {
            credentials: "include",
        })
            .then(res => res.ok ? res.json() : [])
            .then(data => setCourses(data));
    }, []);

    const handleDelete = async () => {
        if (!selectedId) { setMsg("Виберіть курс"); return; }

        const ok = window.confirm("Видалити курс?");
        if (!ok) return;

        const res = await fetch("http://localhost:8080/api/courses/" + selectedId, {
            method: "DELETE",
            credentials: "include",
        });

        const text = await res.text();
        if (res.ok) {
            setCourses(courses.filter(c => c.id !== parseInt(selectedId)));
            setSelectedId("");
            setMsg("Курс видалено");
        } else {
            setMsg(text);
        }
    };

    return (
        <>
            <h2>Видалити курс</h2>
            <div className="profile-card">
                <select
                    className="profile-select"
                    value={selectedId}
                    onChange={(e) => setSelectedId(e.target.value)}
                >
                    <option value="">Виберіть курс</option>
                    {courses.map(c => (
                        <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                </select>
                <button onClick={handleDelete}>Видалити</button>
                {msg && <p>{msg}</p>}
            </div>
        </>
    );
}

export default DeleteCourse;