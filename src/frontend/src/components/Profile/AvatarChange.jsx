import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./styles/AvatarChange.css";

function AvatarChange() {
    const { user, setUser } = useAuth();

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(
        user?.avatar
            ? `http://localhost:8080${user.avatar}`
            : "/default-avatar.jpg"
    );
    const [msg, setMsg] = useState("");

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (!selected) return;

        setFile(selected);
        setPreview(URL.createObjectURL(selected));
    };

    const handleSubmit = async () => {
        if (!file) {
            setMsg("Виберіть файл");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("http://localhost:8080/api/users/update-avatar", {
                method: "POST",
                credentials: "include",
                body: formData,
            });

            const text = await res.text();

            if (res.ok) {
                setUser({ ...user, avatar: text });
                setPreview(`http://localhost:8080${text}`);
                setMsg("Аватар змінено успішно");
            } else {
                setMsg(text);
            }
        } catch (e) {
            setMsg("Помилка з'єднання");
        }
    };

    return (
        <>
            <h2 className="profile-title">Ваш аватар</h2>

            <div className="profile-card avatar-change-card">

                <p className="avatar-change-hint">
                    Натисніть на іконку олівця, щоб змінити фото профілю
                </p>

                <div className="avatar-change-wrapper">
                    <img
                        src={preview}
                        className="avatar-change-avatar"
                        alt="avatar"
                    />

                    <label className="avatar-change-edit-btn" title="Змінити аватар">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </label>
                </div>

                <div className="avatar-change-divider" />

                <p className="avatar-change-label">Поточне фото</p>
                <p className="avatar-change-meta">
                    Рекомендований розмір: 200×200 px. Формати: JPG, PNG.
                </p>

                <button onClick={handleSubmit}>
                    Зберегти зміни
                </button>

                {msg && (
                    <p className="avatar-change-msg">
                        {msg}
                    </p>
                )}
            </div>
        </>
    );
}

export default AvatarChange;