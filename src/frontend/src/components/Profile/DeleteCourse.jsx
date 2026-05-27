import { useState, useEffect } from "react";

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


