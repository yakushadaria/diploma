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
        if (!result) return null;
        // если общий результат правильный — все пары правильные
        if (result.correct) return true;
        // если неправильный — проверяем конкретную пару
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
                                fontSize: "16px",


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
                                fontSize: "16px",
                                minHeight: "40px",
                                lineHeight: "40px",
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




const langMap = {
    "Англійська": "en-US",
    "Українська": "uk-UA",
    "Іспанська": "es-ES",
    "Французька": "fr-FR",
    "Німецька": "de-DE",
    "Чеська": "cs-CZ",
    "Польська": "pl-PL",
    "Японська": "ja-JP",
    "Китайська": "zh-CN",
    "Італійська": "it-IT",
};

function SpeakingExercise({ exercise, onAnswer, result, language }) {
    const [listening, setListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [error, setError] = useState("");
    const [accuracy, setAccuracy] = useState(null);
    const [attempts, setAttempts] = useState(result?.attempts || 0);
    const [bestAccuracy, setBestAccuracy] = useState(result?.bestAccuracy || 0);

    const calcAccuracy = (correct, spoken) => {
        const c = correct.trim().toLowerCase().replace(/[^a-zA-Zа-яА-ЯіІїЇєЄ]/g, "");
        const s = spoken.trim().toLowerCase().replace(/[^a-zA-Zа-яА-ЯіІїЇєЄ]/g, "");

        if (c === s) return 100;
        if (s.length === 0) return 0;

        const maxLen = Math.max(c.length, s.length);
        let matches = 0;

        for (let i = 0; i < Math.min(c.length, s.length); i++) {
            if (c[i] === s[i]) matches++;
        }

        return Math.round((matches / maxLen) * 100);
    };


    const getAccuracyColor = (acc) => {
        if (acc >= 80) return "#4a8a4a";
        if (acc >= 50) return "#c47a55";
        return "#c44a4a";
    };

    const handleSpeak = () => {
        if (attempts >= 20) { setError("Ви вичерпали всі 20 спроб"); return; }

        if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
            setError("Ваш браузер не підтримує розпізнавання мови. Використовуйте Chrome");
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = langMap[language] || "en-US";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        setListening(true);
        setTranscript("");
        setError("");
        setAccuracy(null);

        recognition.onresult = async (e) => {
            const text = e.results[0][0].transcript;
            const acc = calcAccuracy(exercise.correctAnswer, text);
            setTranscript(text);
            setAccuracy(acc);
            setListening(false);

            const res = await fetch("http://localhost:8080/api/exercises/" + exercise.id + "/answer", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ answer: text }),
            });

            if (res.ok) {
                const data = await res.json();
                setAttempts(data.attempts);
                setBestAccuracy(data.bestAccuracy);
            }
        };

        recognition.onerror = (e) => {
            setListening(false);
            setError("Помилка розпізнавання: " + e.error);
        };

        recognition.onend = () => setListening(false);
        recognition.start();
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ background: "#fdf0ff", border: "1px solid #d4a0f0", borderRadius: "10px", padding: "10px 12px" }}>
                <p style={{ fontSize: "17px", color: "#8a6f63", marginBottom: "2px" }}>Вимовте:</p>
                <p style={{ fontSize: "17px", fontWeight: "600", color: "#2f2a26" }}>{exercise.correctAnswer}</p>
            </div>

            <button
                onClick={handleSpeak}
                disabled={listening || attempts >= 20}
                style={{
                    padding: "12px 20px",
                    borderRadius: "10px",
                    background: listening || attempts >= 20 ? "#e8ddd2" : "#c47a55",
                    color: "white",
                    border: "none",
                    cursor: listening || attempts >= 20 ? "default" : "pointer",
                    fontSize: "14px",
                    fontWeight: "500",
                    width: "fit-content",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                }}
            >
                {listening ? "🎤 Слухаю..." : attempts >= 20 ? "🎤 Спроби вичерпано" : "🎤 Говорити"}
            </button>

            <p style={{ fontSize: "14px", color: "#8a6f63" }}>
                Спроби: {attempts}/20
            </p>

            {transcript && (
                <p style={{ fontSize: "14px", color: "#8a6f63" }}>
                    Ви сказали: <strong>{transcript}</strong>
                </p>
            )}

            {accuracy !== null && (
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <p style={{ fontSize: "13px", color: "#8a6f63" }}>Точність цієї спроби:</p>
                    <div style={{ background: "#e8ddd2", borderRadius: "999px", height: "10px", width: "100%", overflow: "hidden" }}>
                        <div style={{ width: accuracy + "%", height: "100%", background: getAccuracyColor(accuracy), borderRadius: "999px", transition: "width 0.5s ease" }} />
                    </div>
                    <p style={{ fontSize: "14px", fontWeight: "600", color: getAccuracyColor(accuracy) }}>{accuracy}%</p>
                </div>
            )}

            {bestAccuracy > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <p style={{ fontSize: "13px", color: "#8a6f63" }}>Найкращий результат:</p>
                    <div style={{ background: "#e8ddd2", borderRadius: "999px", height: "10px", width: "100%", overflow: "hidden" }}>
                        <div style={{ width: bestAccuracy + "%", height: "100%", background: getAccuracyColor(bestAccuracy), borderRadius: "999px", transition: "width 0.5s ease" }} />
                    </div>
                    <p style={{ fontSize: "14px", fontWeight: "600", color: getAccuracyColor(bestAccuracy) }}>{bestAccuracy}%</p>
                </div>
            )}

            {error && <p style={{ fontSize: "13px", color: "#c44a4a" }}>{error}</p>}
        </div>
    );
}






export default function ExerciseBlock({ lessonId, filterType = null, courseLang, enrolled }) {
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

    // студент не записан — показываем заглушку
    if (user.role === "STUDENT" && !enrolled) {
        return (
            <div style={{ padding: "16px", background: "#fffaf5", border: "1px solid #e8ddd2", borderRadius: "14px", textAlign: "center" }}>
                <p style={{ color: "#8a6f63", fontSize: "14px" }}>
                    Приєднайтесь до курсу щоб виконувати завдання
                </p>
            </div>
        );
    }



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
                        <p style={{ fontWeight: "600", marginBottom: "14px", fontSize: "17.5px" }}>
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

                                {exercise.type === "SPEAKING" && (
                                    <SpeakingExercise
                                        exercise={exercise}
                                        onAnswer={(ans) => handleAnswer(exercise.id, ans)}
                                        result={results[exercise.id]}
                                        language={courseLang}
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






