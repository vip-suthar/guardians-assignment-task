import React, { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import ResetPassword from "../components/ResetPassword";

export default function ResetPasswordPage() {

    const [searchParams, setSearchParams] = useSearchParams();
    const token = searchParams.get("token");

    return (
        <div className="min-h-full h-screen w-full bg-gray-200 flex items-center justify-around py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full">
                <ResetPassword token={token} />
            </div>
        </div>
    )
}