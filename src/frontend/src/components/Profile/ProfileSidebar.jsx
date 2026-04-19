import { useAuth } from "../../context/AuthContext";
import { sidebarItems } from "./SidebarConfig.jsx";

function ProfileSidebar({ activeTab, setActiveTab }) {
  const { user } = useAuth();

  const sections = sidebarItems[user.role] || [];

  return (
    <div className="profile-sidebar">
      {sections.map((section, sIndex) => (
        <div key={sIndex} className="profile-sidebar-section">
          {section.title && (
            <div className="profile-sidebar-title">
              {section.title}
            </div>
          )}

          {section.items.map((item) => (
            <div
              key={item.id}
              className={`profile-sidebar-item ${
                activeTab === item.id ? "active" : ""
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.label}
            </div>
          ))}

          {sIndex !== sections.length - 1 && (
            <div className="profile-sidebar-divider" />
          )}
        </div>
      ))}
    </div>
  );
}

export default ProfileSidebar;