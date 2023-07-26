import React from "react";

import ForgotPassword from "../components/ForgotPassword";

export default function ForgotPasswordPage() {

    return (
        <div className="min-h-full h-screen w-full bg-gray-200 flex items-center justify-around py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full">
                <ForgotPassword />
            </div>
        </div>
    )
}