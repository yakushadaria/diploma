import { useState, useEffect } from "react";

function RoleChange() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [selectedRole, setSelectedRole] = useState("STUDENT");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        fetch("http://localhost:8080/api/users/all", {
            credentials: "include",
        })
            .then(res => res.ok ? res.json() : null)
            .then(data => { if (data) setUsers(data); })
            .catch(console.error);
    }, []);

    const handleSubmit = async () => {
        if (!selectedUser) { setMsg("Виберіть користувача"); return; }

        const res = await fetch("http://localhost:8080/api/users/update-role", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: selectedUser, role: selectedRole }),
        });

        const text = await res.text();
        if (res.ok) {
            setMsg("Роль змінено успішно");
        } else {
            setMsg(text);
        }
    };

    return (
        <>
            <h2>Надати роль</h2>
            <div className="profile-card">
                <select
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                >
                    <option value="">Виберіть користувача</option>
                    {users.map(u => (
                        <option key={u.id} value={u.username}>
                            {u.username} ({u.role})
                        </option>
                    ))}
                </select>

                <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                >
                    <option value="STUDENT">Студент</option>
                    <option value="TEACHER">Викладач</option>
                    <option value="ADMIN">Адміністратор</option>
                </select>

                <button onClick={handleSubmit}>Змінити роль</button>
                {msg && <p>{msg}</p>}
            </div>
        </>
    );
}

export default RoleChange;