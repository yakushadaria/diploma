import { useAuth } from "../../context/AuthContext";
import EmailChange from "../Profile/EmailChange";
import AvatarChange from "../Profile/AvatarChange";

function ProfileContent({ activeTab }) {
  const { user, logout } = useAuth();

  const renderContent = () => {
    switch (activeTab) {

      case "view":
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
                </div>
            </div>
            </>
        );


        case "email":
            return <EmailChange />;

        case "avatar":
            return <AvatarChange />;



      case "active":
        return <h2>Активні курси</h2>;

      case "completed":
        return <h2>Завершені курси</h2>;

      case "progress":
        return <h2>Перегляд прогресу</h2>;

      case "users":
        return <h2>Перегляд користувачів</h2>;

      case "roles":
        return <h2>Надати роль</h2>;

      case "delete-course":
        return <h2>Видалити курс</h2>;

      case "delete-user":
        return <h2>Видалити користувача</h2>;

      case "description":
        return (
          <>
            <h2>Змінити опис</h2>
            <div className="profile-card">
              <input defaultValue="Опис..." />
              <button>Змінити</button>
            </div>
          </>
        );



      case "add-course":
        return <h2>Додати курс</h2>;


        case "logout":
            return (
                <>
                    <h2>Вихід</h2>
                    <div className="profile-card">
                        <button onClick={logout}>Вийти</button>
                    </div>
                </>
            );

      default:
        return <h2>Виберіть пункт меню</h2>;
    }
  };

  return <div className="profile-content-inner">{renderContent()}</div>;
}

export default ProfileContent;