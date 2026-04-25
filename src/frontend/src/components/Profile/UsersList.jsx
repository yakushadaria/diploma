import { useState, useEffect } from "react";
import "./styles/UserList.css"

function UsersList() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch("http://localhost:8080/api/users/all", { credentials: "include" })
            .then(res => res.ok ? res.json() : null)
            .then(data => { if (data) setUsers(data); })
            .catch(console.error);
    }, []);

    const filtered = users.filter(u =>
        u.username.toLowerCase().includes(search.toLowerCase())
    );

    const roleLabel = (role) => {
        if (role === "ADMIN") return { label: "Адмін", cls: "role-admin" };
        if (role === "TEACHER") return { label: "Вчитель", cls: "role-teacher" };
        return { label: "Студент", cls: "role-student" };
    };

    const initials = (name) => name?.slice(0, 2).toUpperCase() || "??";

    return (
        <>
            <h2 className="profile-title">Перегляд користувачів</h2>
            <div className="profile-card users-card">
                <input
                    className="profile-card input"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Пошук за нікнеймом..."
                />

                {filtered.length === 0 ? (
                    <p className="users-empty">Користувачів не знайдено</p>
                ) : (
                    <div className="users-list">
                        {filtered.map(u => {
                            const { label, cls } = roleLabel(u.role);
                            return (
                                <div key={u.id} className="user-row">
                                    <div className="user-avatar">{initials(u.username)}</div>
                                    <div className="user-info">
                                        <span className="user-name">{u.username}</span>
                                        <span className="user-email">{u.email}</span>
                                    </div>
                                    <span className={`user-role ${cls}`}>{label}</span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
}

export default UsersList;