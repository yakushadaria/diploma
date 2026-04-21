import { useAuth } from "../../context/AuthContext";

function AdminPage() {
    const { user, logout } = useAuth();

    if (!user) { window.location.href = "/auth"; return null; }
    if (user.role !== "ADMIN") { window.location.href = "/auth"; return null; }

    return (
        <div>
            <h2>Панель адміністратора</h2>
            <p>Ім'я: {user.username}</p>
            <p>Email: {user.email}</p>
            <button onClick={logout}>Вийти</button>
        </div>
    );
}

export default AdminPage;