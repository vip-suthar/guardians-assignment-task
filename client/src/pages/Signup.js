import React, { useEffect } from "react";
import Signup from "../components/Signup";
import { checkLoggedIn } from "../store/actions/userDataAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userData);

    useEffect(() => {
        if (userData) {
            navigate('/profile');
        } else {
            checkLoggedIn().then(action => {
                dispatch(action);
            })
        }
    }, [userData]);

    return (
        <div className="min-h-full h-screen w-full bg-gray-200 flex items-center justify-around py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full">
                <Signup />
            </div>
        </div>
    )
}