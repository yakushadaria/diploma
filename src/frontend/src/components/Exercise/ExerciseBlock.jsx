
/*
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

function MultipleChoice({ exercise, onAnswer, result }) {
    const options = JSON.parse(exercise.options || "[]");
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {options.map((opt, i) => (
                <button
                    key={i}
                    onClick={() => !result && onAnswer(opt)}
                    style={{
                        padding: "10px 14px",
                        borderRadius: "10px",
                        border: "1px solid",
                        borderColor: result
                            ? opt === exercise.correctAnswer ? "#4a8a4a"
                                : opt === result.userAnswer ? "#c44a4a" : "#e8ddd2"
                            : "#e8ddd2",
                        background: result
                            ? opt === exercise.correctAnswer ? "#f0faf0"
                                : opt === result.userAnswer ? "#fff0f0" : "white"
                            : "white",
                        cursor: result ? "default" : "pointer",
                        textAlign: "left",
                        fontSize: "14px",
                    }}
                >
                    {opt}
                </button>
            ))}
        </div>
    );
}

function FillWord({ exercise, onAnswer, result }) {
    const [value, setValue] = useState(result?.userAnswer || "");
    return (
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Введіть відповідь"
                disabled={!!result}
                style={{
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: "1px solid",
                    borderColor: result ? result.correct ? "#4a8a4a" : "#c44a4a" : "#e8ddd2",
                    fontSize: "14px",
                    outline: "none",
                }}
            />
            {!result && <button onClick={() => onAnswer(value)} style={{ padding: "8px 16px", borderRadius: "8px", background: "#c47a55", color: "white", border: "none", cursor: "pointer" }}>Перевірити</button>}
            {result && <span style={{ color: result.correct ? "#4a8a4a" : "#c44a4a" }}>{result.correct ? "✓ Правильно" : "✗ Неправильно — " + exercise.correctAnswer}</span>}
        </div>
    );
}

function ExerciseBlock({ lessonId }) {
    const { user } = useAuth();
    const [exercises, setExercises] = useState([]);
    const [results, setResults] = useState({});
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!open) return;
        fetch("http://localhost:8080/api/exercises/lesson/" + lessonId)
            .then(res => res.ok ? res.json() : [])
            .then(setExercises);

        if (user) {
            fetch("http://localhost:8080/api/exercises/lesson/" + lessonId + "/results", {
                credentials: "include",
            })
                .then(res => res.ok ? res.json() : [])
                .then(data => {
                    const map = {};
                    data.forEach(r => { map[r.exercise.id] = r; });
                    setResults(map);
                });
        }
    }, [open, lessonId]);

    const handleAnswer = async (exerciseId, answer) => {
        const res = await fetch("http://localhost:8080/api/exercises/" + exerciseId + "/answer", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ answer }),
        });

        if (res.ok) {
            const data = await res.json();
            const exercise = exercises.find(e => e.id === exerciseId);
            setResults(prev => ({
                ...prev,
                [exerciseId]: { correct: data.correct, userAnswer: answer, exercise }
            }));
        }
    };

    if (exercises.length === 0 && open) return null;

    return (
        <div style={{ marginTop: "16px" }}>
            <button
                onClick={() => setOpen(!open)}
                style={{
                    padding: "10px 20px",
                    borderRadius: "10px",
                    border: "1px solid #e8ddd2",
                    background: open ? "#f5ede6" : "white",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#c47a55",
                }}
            >
                {open ? "▲ Сховати завдання" : "▼ Завдання до заняття"}
            </button>

            {open && (
                <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "16px" }}>
                    {exercises.map((exercise, i) => (
                        <div key={exercise.id} style={{
                            background: "#fffaf5",
                            border: "1px solid #e8ddd2",
                            borderRadius: "14px",
                            padding: "16px",
                        }}>
                            <p style={{ fontWeight: "500", marginBottom: "12px", fontSize: "15px" }}>
                                {i + 1}. {exercise.question}
                            </p>

                            {exercise.type === "MULTIPLE_CHOICE" && (
                                <MultipleChoice
                                    exercise={exercise}
                                    onAnswer={(ans) => handleAnswer(exercise.id, ans)}
                                    result={results[exercise.id]}
                                />
                            )}

                            {(exercise.type === "FILL_WORD" || exercise.type === "TRANSLATE") && (
                                <FillWord
                                    exercise={exercise}
                                    onAnswer={(ans) => handleAnswer(exercise.id, ans)}
                                    result={results[exercise.id]}
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ExerciseBlock;

 */





import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

function MultipleChoice({ exercise, onAnswer, result }) {
    const options = JSON.parse(exercise.options || "[]");

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {options.map((opt, i) => (
                <button
                    key={i}
                    onClick={() => !result && onAnswer(opt)}
                    style={{
                        padding: "10px 14px",
                        borderRadius: "10px",
                        border: "1px solid",
                        borderColor: result
                            ? opt === exercise.correctAnswer
                                ? "#4a8a4a"
                                : opt === result.userAnswer
                                    ? "#c44a4a"
                                    : "#e8ddd2"
                            : "#e8ddd2",
                        background: result
                            ? opt === exercise.correctAnswer
                                ? "#f0faf0"
                                : opt === result.userAnswer
                                    ? "#fff0f0"
                                    : "white"
                            : "white",
                        cursor: result ? "default" : "pointer",
                        textAlign: "left",
                        fontSize: "14px",
                    }}
                >
                    {opt}
                </button>
            ))}
        </div>
    );
}

function FillWord({ exercise, onAnswer, result }) {
    const [value, setValue] = useState(result?.userAnswer || "");

    return (
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Введіть відповідь"
                disabled={!!result}
                style={{
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: "1px solid",
                    borderColor: result
                        ? result.correct
                            ? "#4a8a4a"
                            : "#c44a4a"
                        : "#e8ddd2",
                    fontSize: "14px",
                    outline: "none",
                    flex: 1,
                }}
            />

            {!result && (
                <button
                    onClick={() => onAnswer(value)}
                    style={{
                        padding: "8px 16px",
                        borderRadius: "8px",
                        background: "#c47a55",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    Перевірити
                </button>
            )}

            {result && (
                <span style={{ color: result.correct ? "#4a8a4a" : "#c44a4a", fontWeight: "500" }}>
          {result.correct ? "✓ Правильно" : `✗ Неправильно — ${exercise.correctAnswer}`}
        </span>
            )}
        </div>
    );
}

export default function ExerciseBlock({ lessonId, filterType = null }) {
    const { user } = useAuth();
    const [exercises, setExercises] = useState([]);
    const [results, setResults] = useState({});


    useEffect(() => {
        if (!lessonId) return;

        fetch(`http://localhost:8080/api/exercises/lesson/${lessonId}`)
            .then((res) => (res.ok ? res.json() : []))
            .then((data) => {
                let filtered = data;
                if (filterType) {
                    filtered = data.filter((ex) => ex.type === filterType);
                }
                setExercises(filtered);
            });

        if (user) {
            fetch(`http://localhost:8080/api/exercises/lesson/${lessonId}/results`, {
                credentials: "include",
            })
                .then((res) => (res.ok ? res.json() : []))
                .then((data) => {
                    const map = {};
                    data.forEach((r) => {
                        map[r.exercise.id] = r;
                    });
                    setResults(map);
                });
        }
    }, [lessonId, filterType, user]);


    // Показуємо тільки для STUDENT та TEACHER
    if (!user || (user.role !== "STUDENT" && user.role !== "TEACHER")) {
        return null;
    }


    const handleAnswer = async (exerciseId, answer) => {
        const res = await fetch(`http://localhost:8080/api/exercises/${exerciseId}/answer`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ answer }),
        });

        if (res.ok) {
            const data = await res.json();
            setResults((prev) => ({
                ...prev,
                [exerciseId]: {
                    correct: data.correct,
                    userAnswer: answer,
                    exercise: exercises.find((e) => e.id === exerciseId),
                },
            }));
        }
    };

    if (exercises.length === 0) return null;

    return (
        <div style={{ marginTop: "24px" }}>

                <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                    {exercises.map((exercise, i) => (
                        <div
                            key={exercise.id}
                            style={{
                                background: "#fffaf5",
                                border: "1px solid #e8ddd2",
                                borderRadius: "14px",
                                padding: "18px",
                            }}
                        >
                            <p style={{ fontWeight: "600", marginBottom: "14px", fontSize: "15.5px" }}>
                                {i + 1}. {exercise.question}
                            </p>

                            {exercise.type === "MULTIPLE_CHOICE" && (
                                <MultipleChoice
                                    exercise={exercise}
                                    onAnswer={(ans) => handleAnswer(exercise.id, ans)}
                                    result={results[exercise.id]}
                                />
                            )}

                            {(exercise.type === "FILL_WORD" || exercise.type === "TRANSLATE") && (
                                <FillWord
                                    exercise={exercise}
                                    onAnswer={(ans) => handleAnswer(exercise.id, ans)}
                                    result={results[exercise.id]}
                                />
                            )}
                        </div>
                    ))}
                </div>

        </div>
    );
}