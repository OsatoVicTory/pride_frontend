import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PlainProfileEdit from "./plainProfile";
import PasswordReset from "./passwordReset";
import "./Profile.css";

const Profile = () => {

    const path = window.location.pathname;
    const navigate = useNavigate();
    const user = useSelector(state => state.user);

    return (
        <div className="profile">
            <div className="profile__Wrapper">
                <ul className="profile__ul">
                    <li className={`profile__li ${!path.includes("password")}`}
                    onClick={() => navigate("/app/profile")}>Edit Profile</li>
                    {user.createdWithProvider==="none" && <li className={`profile__li ${path.includes("password")}`}
                    onClick={() => navigate("/app/profile/reset-password")}>Reset Password</li>}
                </ul>
                <Routes>
                    <Route path="/" element={<PlainProfileEdit />} />
                    <Route path="/reset-password" element={<PasswordReset />} />
                </Routes>
            </div>
        </div>
    )
}

export default Profile;