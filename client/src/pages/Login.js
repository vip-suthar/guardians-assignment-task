import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Login from "../components/Login";
import { checkLoggedIn } from "../store/actions/userDataAction";

export default function LoginPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector(state => state.userData);

    useEffect(() => {
        if (userData) {
            navigate('/');
        } else {
            checkLoggedIn().then(action => {
                dispatch(action);
            })
        }
    }, [userData]);

    return (
        <div className="min-h-full h-screen w-full bg-gray-200 flex items-center justify-around py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full">
                <Login />
            </div>
        </div>
    )
}