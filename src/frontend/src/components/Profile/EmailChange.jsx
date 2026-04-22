import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

function EmailChange() {
    const { user, setUser } = useAuth();
    const [email, setEmail] = useState(user?.email || "");
    const [msg, setMsg] = useState("");

    const handleSubmit = async () => {
        const res = await fetch("http://localhost:8080/api/users/update-email", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        const text = await res.text();
        if (res.ok) {
            setUser({ ...user, email });
            setMsg("Email змінено успішно");
        } else {
            setMsg(text);
        }
    };

    return (
        <>
            <h2>Змінити пошту</h2>
            <div className="profile-card">
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Новий email"
                />
                <button onClick={handleSubmit}>Змінити</button>
                {msg && <p>{msg}</p>}
            </div>
        </>
    );
}

export default EmailChange;