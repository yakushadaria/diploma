import { useState, useEffect } from "react";


/*
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
*/





function DeleteCourse({ role }) {
    const [query, setQuery] = useState("");
    const [courses, setCourses] = useState([]);
    const [searched, setSearched] = useState(false);
    const [msg, setMsg] = useState("");

    const handleSearch = async () => {
        if (!query.trim()) { setMsg("Введіть назву курсу"); return; }
        setMsg("");

        const url = role === "ADMIN"
            ? "http://localhost:8080/api/courses"
            : "http://localhost:8080/api/courses/my";

        const res = await fetch(url, { credentials: "include" });
        const data = res.ok ? await res.json() : [];

        const filtered = data.filter(c =>
            c.title.toLowerCase().includes(query.toLowerCase())
        );

        setCourses(filtered);
        setSearched(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Видалити курс?")) return;

        const res = await fetch("http://localhost:8080/api/courses/" + id, {
            method: "DELETE",
            credentials: "include",
        });

        const text = await res.text();
        if (res.ok) {
            setCourses(courses.filter(c => c.id !== id));
            setMsg("Курс видалено");
        } else {
            setMsg(text);
        }
    };


    return (
        <>
            <h2>Видалити курс</h2>

            <div className="profile-card">
                <div style={{

                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    marginBottom: "16px",
                }}>
                    <input
                        className="profile-input"
                        type="text"
                        placeholder="Введіть назву курсу..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />

                    <button
                        onClick={handleSearch}
                        style={{
                            width: "800px",
                            maxWidth: "100%",
                            alignSelf: "flex-start"
                        }}
                    >
                        Знайти
                    </button>
                </div>

                {msg && <p>{msg}</p>}

                {searched && courses.length === 0 && (
                    <p>Курсів не знайдено</p>
                )}

                {courses.map(c => (
                    <div
                        key={c.id}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "10px 14px",
                            marginBottom: "8px",
                            borderRadius: "8px",
                            border: "1px solid #e0d6d0",
                            background: "#fdf8f6",
                            gap: "12px"
                        }}
                    >
    <span
        style={{
            fontWeight: 500,
            flex: 7
        }}
    >
        {c.title}
    </span>

                        <button
                            onClick={() => handleDelete(c.id)}
                            style={{
                                flex: 3,

                                height: "40px",
                                marginTop: "0px",
                                background: "#c0392b",
                                color: "white",
                                border: "none",
                                borderRadius: "6px",
                                padding: "6px 35px",
                                cursor: "pointer"
                            }}
                        >
                            Видалити
                        </button>
                    </div>
                ))}
            </div>
        </>
    );

}

export default DeleteCourse;


    /*
    return (
        <>
            <h2>Видалити курс</h2>
            <div className="profile-card">
                <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
                    <input
                        className="profile-input"
                        type="text"
                        placeholder="Введіть назву курсу..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                    <button onClick={handleSearch}>Знайти</button>
                </div>

                {msg && <p>{msg}</p>}

                {searched && courses.length === 0 && <p>Курсів не знайдено</p>}

                {courses.map(c => (
                    <div key={c.id} style={{
                        display: "flex", justifyContent: "space-between",
                        alignItems: "center", padding: "10px 14px",
                        marginBottom: "8px", borderRadius: "8px",
                        border: "1px solid #e0d6d0", background: "#fdf8f6"
                    }}>
                        <span style={{ fontWeight: 500 }}>{c.title}</span>
                        <button
                            onClick={() => handleDelete(c.id)}
                            style={{
                                background: "#c0392b", color: "white",
                                border: "none", borderRadius: "6px",
                                padding: "6px 14px", cursor: "pointer"
                            }}
                        >Видалити</button>
                    </div>
                ))}
            </div>
        </>
    );
}

export default DeleteCourse;

     */
