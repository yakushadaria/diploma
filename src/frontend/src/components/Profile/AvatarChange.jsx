import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

function AvatarChange() {
    const { user, setUser } = useAuth();
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(
        user?.avatar ? `http://localhost:8080${user.avatar}` : "/default-avatar.jpg"
    );
    const [msg, setMsg] = useState("");


    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (!selected) return;
        setFile(selected);
        setPreview(URL.createObjectURL(selected)); // превью до загрузки
    };

    const handleSubmit = async () => {
        if (!file) { setMsg("Виберіть файл"); return; }

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("http://localhost:8080/api/users/update-avatar", {
            method: "POST",
            credentials: "include",
            body: formData,
        });

        const text = await res.text();
        if (res.ok) {
            setUser({ ...user, avatar: text });
            setPreview(`http://localhost:8080${text}`); // ← обновляем превью
            setMsg("Аватар змінено успішно");
        } else {
            setMsg(text);
        }
    };

    return (
        <>
            <h2>Змінити аватар</h2>
            <div className="profile-card">
                <img
                    src={preview}
                    className="profile-avatar"
                    alt="avatar"
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <button onClick={handleSubmit}>Змінити</button>
                {msg && <p>{msg}</p>}
            </div>
        </>
    );
}

export default AvatarChange;