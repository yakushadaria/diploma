import { useState } from "react";

const templates = [
    {
        type: "MULTIPLE_CHOICE",
        label: "Вибір відповіді",
        desc: "Питання з варіантами відповідей",
        color: "#e8f4fd",
        border: "#b3d4f0",
    },
    {
        type: "FILL_WORD",
        label: "Вписати слово",
        desc: "Студент вводить відповідь вручну",
        color: "#f0faf0",
        border: "#b3d9b3",
    },
    {
        type: "MATCH",
        label: "Відповідність",
        desc: "З'єднати слова з перекладом",
        color: "#f5f0ff",
        border: "#c9b3f0",
    },
];

function AddExercise({ lessonId, onAdded }) {
    const [selected, setSelected] = useState(null);
    const [question, setQuestion] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [options, setOptions] = useState(["", "", "", ""]);
    const [msg, setMsg] = useState("");

    const handleAddOption = () => setOptions([...options, ""]);

    const handleOptionChange = (i, val) => {
        const updated = [...options];
        updated[i] = val;
        setOptions(updated);
    };

    const handleClose = () => {
        setSelected(null);
        setQuestion("");
        setCorrectAnswer("");
        setOptions(["", "", "", ""]);
        setMsg("");
    };

    const handleSubmit = async () => {
        if (!question || !correctAnswer) { setMsg("Заповніть всі поля"); return; }

        const body = {
            question,
            correctAnswer,
            type: selected.type,
            options: selected.type === "MULTIPLE_CHOICE"
                ? JSON.stringify(options.filter(o => o.trim()))
                : null,
        };

        const res = await fetch("http://localhost:8080/api/exercises/lesson/" + lessonId, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        if (res.ok) {
            handleClose();
            if (onAdded) onAdded();
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h3 style={{ fontSize: "19px", fontWeight: "600", color: "#2a211e", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: "6px", marginBottom: "10px" }}>
                Оберіть шаблон
            </h3>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {templates.map(t => (
                    <div
                        key={t.type}
                        onClick={() => { setSelected(t); setMsg(""); }}
                        style={{
                            border: "1px solid #e8ddd2",
                            borderRadius: "12px",
                            padding: "16px",
                            cursor: "pointer",
                            transition: "0.2s",
                            display: "flex",
                            alignItems: "center",
                            gap: "20px",
                            minWidth: "180px",
                            background: "#2a211e",
                        }}
                        onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                        onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                    >
                        <div>
                            <p style={{ fontWeight: "600", fontSize: "14px", color: "#fff" }}>{t.label}</p>
                            <p style={{ fontSize: "13px", color: "#fff", marginTop: "2px" }}>{t.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* модальное окно */}
            {selected && (
                <div
                    onClick={handleClose}
                    style={{
                        position: "fixed",
                        top: 0, left: 0, right: 0, bottom: 0,
                        background: "rgba(0,0,0,0.4)",
                        zIndex: 1000,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <div
                        onClick={e => e.stopPropagation()}
                        style={{
                            background: selected.color,
                            border: "1px solid",
                            borderColor: selected.border,
                            borderRadius: "16px",
                            padding: "24px",
                            width: "480px",
                            maxWidth: "90vw",
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                            boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                        }}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#2f2a26" }}>
                                {selected.label}
                            </h3>
                            <button
                                onClick={handleClose}
                                style={{ background: "none", border: "none", cursor: "pointer", fontSize: "22px", color: "#8a6f63" }}
                            >
                                ×
                            </button>
                        </div>

                        <input
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="Питання"
                            style={{ padding: "10px 12px", borderRadius: "8px", border: "1px solid #e8ddd2", fontSize: "14px", background: "white", outline: "none" }}
                        />

                        {selected.type === "MULTIPLE_CHOICE" && (
                            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                                <p style={{ fontSize: "12px", color: "#8a6f63" }}>Варіанти відповідей:</p>
                                {options.map((opt, i) => (
                                    <input
                                        key={i}
                                        value={opt}
                                        onChange={(e) => handleOptionChange(i, e.target.value)}
                                        placeholder={"Варіант " + (i + 1)}
                                        style={{ padding: "8px 10px", borderRadius: "8px", border: "1px solid #e8ddd2", fontSize: "13px", background: "white", outline: "none" }}
                                    />
                                ))}
                                <button
                                    onClick={handleAddOption}
                                    style={{ fontSize: "12px", color: "#c47a55", border: "none", background: "none", cursor: "pointer", textAlign: "left" }}
                                >
                                    + Додати варіант
                                </button>
                            </div>
                        )}

                        {selected.type === "MATCH" && (
                            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                                <p style={{ fontSize: "12px", color: "#8a6f63" }}>
                                    Пари (формат: слово=переклад, через кому):
                                </p>
                                <p style={{ fontSize: "11px", color: "#8a6f63" }}>
                                    Приклад: cat=кіт, dog=пес, bird=птах
                                </p>
                                <textarea
                                    value={correctAnswer}
                                    onChange={(e) => setCorrectAnswer(e.target.value)}
                                    placeholder="cat=кіт, dog=пес, bird=птах"
                                    rows={4}
                                    style={{ padding: "8px 10px", borderRadius: "8px", border: "1px solid #e8ddd2", fontSize: "13px", background: "white", outline: "none", resize: "vertical" }}
                                />
                            </div>
                        )}

                        <input
                            value={correctAnswer}
                            onChange={(e) => setCorrectAnswer(e.target.value)}
                            placeholder="Правильна відповідь"
                            style={{ padding: "10px 12px", borderRadius: "8px", border: "1px solid #e8ddd2", fontSize: "14px", background: "white", outline: "none" }}
                        />

                        <button
                            onClick={handleSubmit}
                            style={{ padding: "12px", borderRadius: "10px", background: "#c47a55", color: "white", border: "none", cursor: "pointer", fontSize: "14px", fontWeight: "500" }}
                        >
                            Додати завдання
                        </button>

                        {msg && <p style={{ color: "#c44a4a", fontSize: "13px" }}>{msg}</p>}
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddExercise;













