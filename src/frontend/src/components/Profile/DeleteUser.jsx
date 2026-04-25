import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./styles/DeleteUser.css"

function DeleteUser({ setActiveTab }) {
    const { user } = useAuth();
    const [search, setSearch] = useState("");
    const [foundUser, setFoundUser] = useState(null);
    const [msg, setMsg] = useState("");
    const [msgType, setMsgType] = useState("error");

    const showMsg = (text, type = "error") => { setMsg(text); setMsgType(type); };

    const handleSearch = async () => {
        if (!search) { showMsg("Введіть ім'я користувача"); return; }
        const res = await fetch("http://localhost:8080/api/users/find/" + search, { credentials: "include" });
        if (res.ok) { setFoundUser(await res.json()); setMsg(""); }
        else { setFoundUser(null); showMsg("Користувача не знайдено"); }
    };

    const handleDelete = async () => {
        if (!foundUser) return;
        if (foundUser.username === user.username) { showMsg("Не можна видалити себе"); return; }
        if (!window.confirm("Видалити користувача " + foundUser.username + "?")) return;
        const res = await fetch("http://localhost:8080/api/users/delete/" + foundUser.username, {
            method: "DELETE", credentials: "include",
        });
        const text = await res.text();
        if (res.ok) { setFoundUser(null); setSearch(""); showMsg("Користувача видалено", "success"); }
        else showMsg(text || "Помилка видалення");
    };

    const initials = (name) => name?.slice(0, 2).toUpperCase() || "??";
    const roleLabel = (role) => {
        if (role === "ADMIN") return { label: "Адмін", cls: "role-admin" };
        if (role === "TEACHER") return { label: "Вчитель", cls: "role-teacher" };
        return { label: "Студент", cls: "role-student" };
    };

    return (
        <>
            <h2 className="profile-title">Видалити користувача</h2>

            <div className="profile-card">
                <div className="search-row">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        placeholder="Введіть ім'я користувача"
                    />
                    <button className="btn-search" onClick={handleSearch}>Знайти</button>
                </div>
                {msg && <p className={`users-msg ${msgType === "success" ? "msg-success" : "msg-error"}`}>{msg}</p>}
            </div>

            {foundUser && (() => {
                const { label, cls } = roleLabel(foundUser.role);
                return (
                    <div className="profile-card found-user-card">
                        <div className="found-user-top">
                            <div className="found-user-avatar">{initials(foundUser.username)}</div>
                            <div className="found-user-info">
                                <span className="found-user-name">{foundUser.username}</span>
                                <span className="found-user-email">{foundUser.email}</span>
                                <span className={`user-role ${cls}`}>{label}</span>
                            </div>
                        </div>
                        <button className="btn-delete-user" onClick={handleDelete}>
                            Видалити користувача
                        </button>
                    </div>
                );
            })()}
        </>
    );
}

export default DeleteUser;