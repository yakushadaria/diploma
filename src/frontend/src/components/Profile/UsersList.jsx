import { useState, useEffect } from "react";

function UsersList() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    const loadUsers = () => {
        fetch("http://localhost:8080/api/users/all", {
            credentials: "include",
        })
            .then(res => res.ok ? res.json() : null)
            .then(data => { if (data) setUsers(data); })
            .catch(console.error);
    };




    useEffect(() => {
        fetch("http://localhost:8080/api/users/all", {
            credentials: "include",
        })
            .then(res => res.ok ? res.json() : null)
            .then(data => { if (data) setUsers(data); })
            .catch(console.error);
    }, []);

    const filtered = users.filter(u =>
        u.username.toLowerCase().includes(search.toLowerCase())
    );



    return (
        <>
            <h2>Перегляд користувачів</h2>
            <div className="profile-card">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Пошук за нікнеймом..."
                />
                <table className="users-table">
                    <thead>
                    <tr>
                        <th>Ім'я</th>
                        <th>Email</th>
                        <th>Роль</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filtered.map(u => (
                        <tr key={u.id}>
                            <td>{u.username}</td>
                            <td>{u.email}</td>
                            <td>{u.role}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {filtered.length === 0 && <p>Користувачів не знайдено</p>}
            </div>
        </>
    );
}

export default UsersList;