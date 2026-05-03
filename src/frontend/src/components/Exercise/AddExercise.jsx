import { useState, useEffect } from "react";

function AddExercise({ lessonId }) {
    const [exercises, setExercises] = useState([]);
    const [type, setType] = useState("MULTIPLE_CHOICE");
    const [question, setQuestion] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [options, setOptions] = useState(["", "", "", ""]);
    const [msg, setMsg] = useState("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!open) return;
        fetch("http://localhost:8080/api/exercises/lesson/" + lessonId)
            .then(res => res.ok ? res.json() : [])
            .then(setExercises);
    }, [open, lessonId]);

    const handleAddOption = () => setOptions([...options, ""]);
    const handleOptionChange = (i, val) => {
        const updated = [...options];
        updated[i] = val;
        setOptions(updated);
    };

    const handleSubmit = async () => {
        if (!question || !correctAnswer) { setMsg("Заповніть всі поля"); return; }

        const body = {
            question,
            correctAnswer,
            type,
            options: type === "MULTIPLE_CHOICE" ? JSON.stringify(options.filter(o => o.trim())) : null,
        };

        const res = await fetch("http://localhost:8080/api/exercises/lesson/" + lessonId, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        if (res.ok) {
            const updated = await fetch("http://localhost:8080/api/exercises/lesson/" + lessonId).then(r => r.json());
            setExercises(updated);
            setQuestion("");
            setCorrectAnswer("");
            setOptions(["", "", "", ""]);
            setMsg("Завдання додано");
        }
    };

    const handleDelete = async (id) => {
        await fetch("http://localhost:8080/api/exercises/" + id, {
            method: "DELETE",
            credentials: "include",
        });
        setExercises(exercises.filter(e => e.id !== id));
    };

    return (
        <div style={{ marginTop: "12px" }}>
            <button
                onClick={() => setOpen(!open)}
                style={{ padding: "8px 16px", borderRadius: "8px", border: "1px solid #e8ddd2", cursor: "pointer", fontSize: "13px", color: "#c47a55", background: "white" }}
            >
                {open ? "▲ Сховати завдання" : "▼ Завдання"}
            </button>

            {open && (
                <div style={{ marginTop: "12px", background: "#fffaf5", border: "1px solid #e8ddd2", borderRadius: "14px", padding: "16px" }}>
                    <h4 style={{ marginBottom: "12px" }}>Існуючі завдання</h4>
                    {exercises.map((ex, i) => (
                        <div key={ex.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px", borderBottom: "1px solid #e8ddd2" }}>
                            <span style={{ fontSize: "13px" }}>{i + 1}. {ex.question}</span>
                            <button onClick={() => handleDelete(ex.id)} style={{ fontSize: "12px", color: "#c44a4a", border: "none", background: "none", cursor: "pointer" }}>Видалити</button>
                        </div>
                    ))}

                    <h4 style={{ margin: "16px 0 12px" }}>Додати завдання</h4>

                    <select value={type} onChange={(e) => setType(e.target.value)} style={{ padding: "8px", borderRadius: "8px", border: "1px solid #e8ddd2", marginBottom: "8px", width: "100%" }}>
                        <option value="MULTIPLE_CHOICE">Вибір відповіді</option>
                        <option value="FILL_WORD">Вписати слово</option>
                        <option value="TRANSLATE">Переклад</option>
                    </select>

                    <input
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Питання"
                        style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #e8ddd2", marginBottom: "8px" }}
                    />

                    {type === "MULTIPLE_CHOICE" && (
                        <div style={{ marginBottom: "8px" }}>
                            <p style={{ fontSize: "13px", color: "#8a6f63", marginBottom: "6px" }}>Варіанти відповідей:</p>
                            {options.map((opt, i) => (
                                <input
                                    key={i}
                                    value={opt}
                                    onChange={(e) => handleOptionChange(i, e.target.value)}
                                    placeholder={"Варіант " + (i + 1)}
                                    style={{ width: "100%", padding: "6px 10px", borderRadius: "8px", border: "1px solid #e8ddd2", marginBottom: "4px" }}
                                />
                            ))}
                            <button onClick={handleAddOption} style={{ fontSize: "12px", color: "#c47a55", border: "none", background: "none", cursor: "pointer" }}>+ Додати варіант</button>
                        </div>
                    )}

                    <input
                        value={correctAnswer}
                        onChange={(e) => setCorrectAnswer(e.target.value)}
                        placeholder="Правильна відповідь"
                        style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #e8ddd2", marginBottom: "8px" }}
                    />

                    <button onClick={handleSubmit} style={{ padding: "8px 20px", borderRadius: "8px", background: "#c47a55", color: "white", border: "none", cursor: "pointer" }}>
                        Додати завдання
                    </button>

                    {msg && <p style={{ color: "#4a8a4a", marginTop: "8px", fontSize: "13px" }}>{msg}</p>}
                </div>
            )}
        </div>
    );
}

export default AddExercise;