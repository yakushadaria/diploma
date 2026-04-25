import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import ProfileSidebar from "../../layouts/Profile/ProfileSidebar";
import ProfileContent from "../../layouts/Profile/ProfileContent";
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
            <ProfileContent activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
    );
}

export default ProfilePage;


// <ProfileContent activeTab={activeTab} />