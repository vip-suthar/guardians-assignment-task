import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {

    const navigate = useNavigate();
    const userData = useSelector(state => state.userData);

    useEffect(() => {
        if (!userData) {
            navigate("/login");
        }
    })


    return (
        <nav className="mx-auto block w-full max-w-screen-xl rounded-xl border border-white/80 bg-white bg-opacity-80 py-2 px-4 text-white shadow-md backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4">
            <div className="container mx-auto flex items-center justify-between text-gray-900">
                <h3 className="block font-sans text-3xl font-semibold leading-tight tracking-normal text-indigo-500 antialiased">
                    Guardians
                </h3>
                <div className="flex justify-between gap-4">
                    <button
                        className="rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-400 py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-indigo-500/20 transition-all hover:shadow-lg hover:shadow-indigo-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                        type="button"
                        data-ripple-light="true"
                    >
                        <Link to="/">
                            Search
                        </Link>
                    </button>
                    <button
                        className="rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-400 py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-indigo-500/20 transition-all hover:shadow-lg hover:shadow-indigo-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                        type="button"
                        data-ripple-light="true"
                    >
                        <Link to="/profile">
                            Profile
                        </Link>
                    </button>
                </div>
            </div>
        </nav>
    )
}