import { useAuth } from "../../context/AuthContext";
import EmailChange from "../Profile/EmailChange";
import AvatarChange from "../Profile/AvatarChange";
import UsersList from "../Profile/UsersList";
import RoleChange from "../Profile/RoleChange";
import DeleteUser from "../Profile/DeleteUser";
import DescriptionChange from "../Profile/DescriptionChange";


function ProfileContent({ activeTab, setActiveTab }) {
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
                    {user.role === "TEACHER" && user.description && (
                        <div className="profile-description">
                            {user.description}
                        </div>
                    )}
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
            return <UsersList key={Date.now()} />;

      case "roles":
            return <RoleChange />;




      case "delete-course":
        return <h2>Видалити курс</h2>;




        case "delete-user":
            return <DeleteUser setActiveTab={setActiveTab} />;



        case "description":
            return <DescriptionChange />;



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