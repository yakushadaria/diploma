import { useState } from "react";
import ProfileSidebar from "../../components/Profile/ProfileSidebar";
import ProfileContent from "../../components/Profile/ProfileContent";
import "./ProfilePage.css";

function ProfilePage() {
  const [activeTab, setActiveTab] = useState("view");

  return (
    <div className="profile-page">
      <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <ProfileContent activeTab={activeTab} />
    </div>
  );
}

export default ProfilePage;