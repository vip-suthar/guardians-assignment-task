import React from "react";
import Profile from "../components/Profile";
import Navbar from "../components/Commons/Navbar";

export default function ProfilePage() {
    return (
        <div className="min-h-full h-screen w-full bg-gray-200">
            <Navbar />
            <Profile />
        </div>


    )
}