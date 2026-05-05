
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

function ExerciseBlock({ lessonId}) {
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









/*
// +++

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
                <span style={{ color: result.correct ? "#4a8a4a" : "#c44a4a" }}>
                    {result.correct
                        ? "✓ Правильно"
                        : "✗ Неправильно — " + exercise.correctAnswer}
                </span>
            )}
        </div>
    );
}


function ExerciseBlock({ lessonId, filterType }) {
    const { user } = useAuth();
    const [exercises, setExercises] = useState([]);
    const [results, setResults] = useState({});

    useEffect(() => {
        // загрузка упражнений
        fetch("http://localhost:8080/api/exercises/lesson/" + lessonId)
            .then(res => res.ok ? res.json() : [])
            .then(setExercises);

        // загрузка результатов пользователя
        if (user) {
            fetch("http://localhost:8080/api/exercises/lesson/" + lessonId + "/results", {
                credentials: "include",
            })
                .then(res => res.ok ? res.json() : [])
                .then(data => {
                    const map = {};
                    data.forEach(r => {
                        map[r.exercise.id] = r;
                    });
                    setResults(map);
                });
        }
    }, [lessonId, user]);

    const handleAnswer = async (exerciseId, answer) => {
        const res = await fetch(
            "http://localhost:8080/api/exercises/" + exerciseId + "/answer",
            {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ answer }),
            }
        );

        if (res.ok) {
            const data = await res.json();
            const exercise = exercises.find(e => e.id === exerciseId);

            setResults(prev => ({
                ...prev,
                [exerciseId]: {
                    correct: data.correct,
                    userAnswer: answer,
                    exercise,
                },
            }));
        }
    };

    // фильтрация по типу
    const filteredExercises = filterType
        ? exercises.filter(ex => ex.type === filterType)
        : exercises;

    if (filteredExercises.length === 0) {
        return <p>Немає завдань</p>;
    }



    const handleDelete = async (id) => {
        if (!window.confirm("Видалити це завдання?")) return;

        const res = await fetch(
            "http://localhost:8080/api/exercises/" + id,
            {
                method: "DELETE",
                credentials: "include",
            }
        );

        if (res.ok) {
            setExercises(prev => prev.filter(ex => ex.id !== id));
        }
    };


    if (exercises.length === 0) return <p style={{ fontSize: "13px", color: "#8a6f63" }}>Завдань поки немає</p>;

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


                        {user?.role === "TEACHER" ? (
                            <p style={{ fontSize: "14px", color: "#4a8a4a", background: "#f0faf0", padding: "8px 12px", borderRadius: "8px", border: "1px solid #c8e6c8" }}>
                                ✓ Правильна відповідь: <strong>{exercise.correctAnswer}</strong>
                            </p>
                        ) : (
                            <>
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
                            </>
                        )}
                    </div>
                ))}
            </div>
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
                    flex: 1,
                }}
            />
            {!result && (
                <button
                    onClick={() => onAnswer(value)}
                    style={{ padding: "8px 16px", borderRadius: "8px", background: "#c47a55", color: "white", border: "none", cursor: "pointer" }}
                >
                    Перевірити
                </button>
            )}
            {result && (
                <span style={{ color: result.correct ? "#4a8a4a" : "#c44a4a", fontWeight: "500" }}>
                    {result.correct ? "✓ Правильно" : "✗ Неправильно — " + exercise.correctAnswer}
                </span>
            )}
        </div>
    );
}

function MatchExercise({ exercise, onAnswer, result }) {
    const pairs = exercise.correctAnswer.split(",").map(p => {
        const [left, right] = p.trim().split("=");
        return { left: left?.trim(), right: right?.trim() };
    });

    const [lefts] = useState(pairs.map(p => p.left));
    const [rights] = useState([...pairs.map(p => p.right)].sort(() => Math.random() - 0.5));
    const [matches, setMatches] = useState({});
    const [dragging, setDragging] = useState(null);

    const handleDrop = (left) => {
        if (!dragging || result) return;
        setMatches(prev => ({ ...prev, [left]: dragging }));
        setDragging(null);
    };

    const handleCheck = () => {
        const answer = lefts.map(l => l + "=" + (matches[l] || "")).join(",");
        onAnswer(answer);
    };

    const isCorrect = (left) => {
        const correct = pairs.find(p => p.left === left);
        return matches[left] === correct?.right;
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ display: "flex", gap: "20px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
                    {lefts.map(left => (
                        <div
                            key={left}
                            onDragOver={e => e.preventDefault()}
                            onDrop={() => handleDrop(left)}
                            style={{
                                padding: "10px 14px",
                                borderRadius: "10px",
                                border: "1px solid",
                                borderColor: result
                                    ? isCorrect(left) ? "#4a8a4a" : "#c44a4a"
                                    : "#e8ddd2",
                                background: result
                                    ? isCorrect(left) ? "#f0faf0" : "#fff0f0"
                                    : "#fffaf5",
                                minHeight: "40px",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                fontSize: "14px",
                            }}
                        >
                            <span>{left}</span>
                            {matches[left] && (
                                <span style={{ color: "#c47a55", fontWeight: "500" }}>→ {matches[left]}</span>
                            )}
                        </div>
                    ))}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
                    {rights.map(right => (
                        <div
                            key={right}
                            draggable={!result}
                            onDragStart={() => setDragging(right)}
                            style={{
                                padding: "10px 14px",
                                borderRadius: "10px",
                                border: "1px solid #e8ddd2",
                                background: "white",
                                cursor: result ? "default" : "grab",
                                fontSize: "14px",
                                opacity: Object.values(matches).includes(right) ? 0.4 : 1,
                            }}
                        >
                            {right}
                        </div>
                    ))}
                </div>
            </div>

            {!result && (
                <button
                    onClick={handleCheck}
                    style={{ padding: "8px 16px", borderRadius: "8px", background: "#c47a55", color: "white", border: "none", cursor: "pointer", width: "fit-content" }}
                >
                    Перевірити
                </button>
            )}

            {result && (
                <p style={{ color: result.correct ? "#4a8a4a" : "#c44a4a", fontWeight: "500" }}>
                    {result.correct ? "✓ Правильно" : "✗ Не всі пари правильні"}
                </p>
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

        fetch("http://localhost:8080/api/exercises/lesson/" + lessonId)
            .then(res => res.ok ? res.json() : [])
            .then(data => {
                setExercises(filterType ? data.filter(ex => ex.type === filterType) : data);
            });

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
    }, [lessonId, filterType]);

    if (!user || (user.role !== "STUDENT" && user.role !== "TEACHER")) return null;

    const handleAnswer = async (exerciseId, answer) => {
        const res = await fetch("http://localhost:8080/api/exercises/" + exerciseId + "/answer", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ answer }),
        });

        if (res.ok) {
            const data = await res.json();
            setResults(prev => ({
                ...prev,
                [exerciseId]: {
                    correct: data.correct,
                    userAnswer: answer,
                    exercise: exercises.find(e => e.id === exerciseId),
                },
            }));
        }
    };

    if (exercises.length === 0) return <p style={{ fontSize: "13px", color: "#8a6f63" }}>Завдань поки немає</p>;

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

                        {user?.role === "TEACHER" ? (
                            <p style={{ fontSize: "14px", color: "#4a8a4a", background: "#f0faf0", padding: "8px 12px", borderRadius: "8px", border: "1px solid #c8e6c8" }}>
                                ✓ Правильна відповідь: <strong>{exercise.correctAnswer}</strong>
                            </p>
                        ) : (
                            <>
                                {exercise.type === "MULTIPLE_CHOICE" && (
                                    <MultipleChoice
                                        exercise={exercise}
                                        onAnswer={(ans) => handleAnswer(exercise.id, ans)}
                                        result={results[exercise.id]}
                                    />
                                )}

                                {exercise.type === "FILL_WORD" && (
                                    <FillWord
                                        exercise={exercise}
                                        onAnswer={(ans) => handleAnswer(exercise.id, ans)}
                                        result={results[exercise.id]}
                                    />
                                )}

                                {exercise.type === "MATCH" && (
                                    <MatchExercise
                                        exercise={exercise}
                                        onAnswer={(ans) => handleAnswer(exercise.id, ans)}
                                        result={results[exercise.id]}
                                    />
                                )}
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}






