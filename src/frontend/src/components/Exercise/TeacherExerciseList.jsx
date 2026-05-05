import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const typeLabels = {
    "MULTIPLE_CHOICE": "Вибір відповіді",
    "FILL_WORD": "Вписати слово",
    "TRANSLATE": "Переклад",
};

const typeColors = {
    "MULTIPLE_CHOICE": "#e8f4fd",
    "FILL_WORD": "#f0faf0",
    "TRANSLATE": "#fff5e6",
};

function TeacherExerciseList({ lessonId }) {
    const { user } = useAuth();
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/exercises/lesson/" + lessonId)
            .then(res => res.ok ? res.json() : [])
            .then(setExercises);
    }, [lessonId]);


    const handleDelete = async (id) => {
        await fetch("http://localhost:8080/api/exercises/" + id, {
            method: "DELETE",
            credentials: "include",
        });
        setExercises(exercises.filter(e => e.id !== id));
    };


    if (exercises.length === 0) return <p style={{ fontSize: "17px", color: "#8a6f63" }}>Завдань поки немає</p>;

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {exercises.map((ex, i) => (
                <div key={ex.id} style={{
                    background: typeColors[ex.type] || "#fffaf5",
                    border: "1px solid #e8ddd2",
                    borderRadius: "12px",
                    padding: "14px 16px",
                    position: "relative",
                }}>
                    {user?.role === "TEACHER" && (
                        <button
                            onClick={() => handleDelete(ex.id)}
                            title="Видалити завдання"
                            style={{
                                position: "absolute",
                                top: "10px",
                                right: "12px",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                fontSize: "16px",
                                color: "#c0392b",
                                lineHeight: 1,
                                padding: "2px 4px",
                                borderRadius: "4px",
                            }}
                        >
                            ✕
                        </button>
                    )}
                    <span style={{ fontSize: "11px", fontWeight: "600", color: "#8a6f63", textTransform: "uppercase" }}>
                        {typeLabels[ex.type]}
                    </span>
                    <p style={{ fontSize: "14px", color: "#2f2a26", marginTop: "4px" }}>
                        {i + 1}. {ex.question}
                    </p>
                    <p style={{ fontSize: "12px", color: "#4a8a4a", marginTop: "4px" }}>
                        ✓ {ex.correctAnswer}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default TeacherExerciseList;