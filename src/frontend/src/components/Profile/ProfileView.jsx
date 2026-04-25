import { useAuth } from "../../context/AuthContext";

function ProfileView() {
    const { user } = useAuth();

    if (!user) return null;

    const getRoleLabel = (role) => {
        switch (role) {
            case "ADMIN":
                return "Адміністратор";
            case "TEACHER":
                return "Викладач";
            case "STUDENT":
                return "Студент";
            default:
                return "Користувач";
        }
    };

    return (
        <>
            <h2 className="profile-title">Вигляд профілю</h2>

            <div className="profile-card profile-view-card">
                <img
                    src={user.avatar ? `http://localhost:8080${user.avatar}` : "/default-avatar.jpg"}
                    className="profile-avatar"
                    alt="avatar"
                />

                <div className="profile-info">
                    <div className="profile-username">
                        {user.username}
                    </div>

                    <div className="profile-email">
                        {user.email || "Email не вказано"}
                    </div>

                    <div className="profile-role">
                        {user.role === "ADMIN" && "Адміністратор"}
                        {user.role === "TEACHER" && "Викладач"}
                        {user.role === "STUDENT" && "Студент"}
                    </div>
                    {user.role === "TEACHER" && user.description && (
                        <div className="profile-description">
                            {user.description}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default ProfileView;