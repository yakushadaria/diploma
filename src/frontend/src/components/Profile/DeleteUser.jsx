import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

function DeleteUser({ setActiveTab }) {
    const { user } = useAuth();
    const [search, setSearch] = useState("");
    const [foundUser, setFoundUser] = useState(null);
    const [msg, setMsg] = useState("");

    const handleSearch = async () => {
        if (!search) { setMsg("Введіть ім'я користувача"); return; }

        const res = await fetch("http://localhost:8080/api/users/find/" + search, {
            credentials: "include",
        });

        if (res.ok) {
            const data = await res.json();
            setFoundUser(data);
            setMsg("");
        } else {
            setFoundUser(null);
            setMsg("Користувача не знайдено");
        }
    };

    const handleDelete = async () => {
        if (!foundUser) return;

        if (foundUser.username === user.username) {
            setMsg("Не можна видалити себе");
            return;
        }

        const ok = window.confirm("Видалити користувача " + foundUser.username + "?");
        if (!ok) return;

        const res = await fetch("http://localhost:8080/api/users/delete/" + foundUser.username, {
            method: "DELETE",
            credentials: "include",
        });

        const text = await res.text();
        console.log("status:", res.status, "response:", text);

        if (res.ok) {
            setFoundUser(null);
            setSearch("");
            setMsg("Користувача видалено");
        } else {
            setMsg(text || "Помилка видалення");
        }
    };

    return (
        <>
            <h2>Видалити користувача</h2>
            <div className="profile-card">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Введіть ім'я користувача"
                />
                <button onClick={handleSearch}>Знайти</button>

                {foundUser && (
                    <div className="found-user">
                        <p>Ім'я: {foundUser.username}</p>
                        <p>Email: {foundUser.email}</p>
                        <p>Роль: {foundUser.role}</p>
                        <button onClick={handleDelete}>Видалити</button>
                    </div>
                )}

                {msg && <p>{msg}</p>}
            </div>
        </>
    );
}

export default DeleteUser;