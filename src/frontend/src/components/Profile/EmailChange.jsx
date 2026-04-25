import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./styles/EmailChange.css";

function EmailChange() {
    const { user, setUser } = useAuth();

    const [email, setEmail] = useState(user?.email || "");
    const [msg, setMsg] = useState("");

    const handleSubmit = async () => {
        if (!email) {
            setMsg("Введіть email");
            return;
        }

        try {
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
        } catch (e) {
            setMsg("Помилка з'єднання");
        }
    };

    return (
        <>
            <h2 className="profile-title">Змінити пошту</h2>

            <div className="profile-card email-change-card">

                <p className="email-change-hint">
                    Введіть нову електронну пошту для вашого акаунта
                </p>

                <div className="email-change-field">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@email.com"
                    />
                </div>

                <button onClick={handleSubmit}>
                    Зберегти зміни
                </button>

                {msg && (
                    <p className="email-change-msg">
                        {msg}
                    </p>
                )}
            </div>
        </>
    );
}

export default EmailChange;