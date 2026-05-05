import { useParams, useNavigate } from "react-router-dom";

const templates = [
    {
        type: "MULTIPLE_CHOICE",
        label: "Вибір відповіді",
        icon: "☑",
        desc: "Питання з варіантами відповідей",
        color: "#e8f4fd",
        border: "#b3d4f0",
    },
    {
        type: "FILL_WORD",
        label: "Вписати слово",
        icon: "✏",
        desc: "Студент вводить відповідь вручну",
        color: "#f0faf0",
        border: "#b3d9b3",
    },
    {
        type: "TRANSLATE",
        label: "Переклад",
        icon: "🔤",
        desc: "Перекласти слово або речення",
        color: "#fff5e6",
        border: "#f0d0a0",
    },
];

function TemplateSelector() {
    const { lessonId } = useParams();
    const navigate = useNavigate();

    return (
        <div style={{ padding: "30px", maxWidth: "800px", margin: "0 auto" }}>
            <h2>Додати нове завдання</h2>
            <p style={{ color: "#8a6f63", marginBottom: "24px" }}>
                Оберіть тип завдання
            </p>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                {templates.map((t) => (
                    <div
                        key={t.type}
                        onClick={() => navigate(`/lesson/${lessonId}/add/${t.type}`)}
                        style={{
                            background: "white",
                            border: `2px solid ${t.border}`,
                            borderRadius: "16px",
                            padding: "20px",
                            width: "280px",
                            cursor: "pointer",
                            transition: "0.2s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = t.color)}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
                    >
                        <div style={{ fontSize: "36px", marginBottom: "12px" }}>{t.icon}</div>
                        <h3 style={{ margin: "0 0 8px 0" }}>{t.label}</h3>
                        <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>{t.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TemplateSelector;