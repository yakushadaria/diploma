import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

function DescriptionChange() {
    const { user, setUser } = useAuth();
    const [description, setDescription] = useState(user?.description || "");
    const [msg, setMsg] = useState("");

    const handleSubmit = async () => {
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
    };

    return (
        <>
            <h2>Змінити опис</h2>
            <div className="profile-card">
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Введіть опис..."
                    rows={5}
                />
                <button onClick={handleSubmit}>Зберегти</button>
                {msg && <p>{msg}</p>}
            </div>
        </>
    );
}

export default DescriptionChange;