import { useAuth } from "../../context/AuthContext";
import EmailChange from "../../components/Profile/EmailChange";
import AvatarChange from "../../components/Profile/AvatarChange";
import UsersList from "../../components/Profile/UsersList";
import RoleChange from "../../components/Profile/RoleChange";
import DeleteUser from "../../components/Profile/DeleteUser";
import DescriptionChange from "../../components/Profile/DescriptionChange";
import AddCourse from "../../components/Profile/AddCourse";
import DeleteCourse from "../../components/Profile/DeleteCourse";
import ProfileView from "../../components/Profile/ProfileView";
import NewsList from "../../components/Profile/NewsList.jsx";
import NewsCreate from "../../components/Profile/NewsCreate.jsx";

function ProfileContent({ activeTab, setActiveTab }) {
  const { user, logout } = useAuth();

  const renderContent = () => {
    switch (activeTab) {

      case "view":
        return <ProfileView/>;


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
            return <DeleteCourse />;




        case "delete-user":
            return <DeleteUser setActiveTab={setActiveTab} />;



        case "description":
            return <DescriptionChange />;



        case "add-course":
            return <AddCourse />;


        // список новостей
        case "news-list":
            return <NewsList />;

        // НОВОЕ — создание новости
        case "news-add":
            return <NewsCreate />;





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