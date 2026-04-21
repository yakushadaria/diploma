import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import ProfileSidebar from "../../components/Profile/ProfileSidebar";
import ProfileContent from "../../components/Profile/ProfileContent";
import "./ProfilePage.css";

function ProfilePage() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState("view");

    if (!user) {
        window.location.href = "/auth";
        return null;
    }

    return (
        <div className="profile-page">
            <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <ProfileContent activeTab={activeTab} />
        </div>
    );
}

export default ProfilePage;


