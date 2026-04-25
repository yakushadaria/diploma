import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./styles/DescriptionChange.css";

function DescriptionChange() {
    const { user, setUser } = useAuth();

    const [description, setDescription] = useState(user?.description || "");
    const [msg, setMsg] = useState("");

    const maxLength = 200;

    const handleSubmit = async () => {
        if (!description.trim()) {
            setMsg("Опис не може бути порожнім");
            return;
        }

        try {
            const res = await fetch("http://localhost:8080/api/users/update-description", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ description }),
            });

            const text = await res.text();

            if (res.ok) {
                setUser({ ...user, description });
                setMsg("Опис змінено успішно");
            } else {
                setMsg(text);
            }
        } catch (e) {
            setMsg("Помилка з'єднання");
        }
    };

    return (
        <>
            <h2 className="profile-title">Змінити опис</h2>

            <div className="profile-card description-change-card">

                <p className="description-change-hint">
                    Розкажіть трохи про себе (макс. {maxLength} символів)
                </p>

                <div className="description-change-field">
                    <textarea
                        value={description}
                        maxLength={maxLength}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Наприклад: Я люблю програмування, каву та нічні дедлайни..."
                        rows={4}
                    />

                    <div className="description-change-counter">
                        {description.length} / {maxLength}
                    </div>
                </div>

                <button onClick={handleSubmit}>
                    Зберегти зміни
                </button>

                {msg && (
                    <p className="description-change-msg">
                        {msg}
                    </p>
                )}
            </div>
        </>
    );
}

export default DescriptionChange;