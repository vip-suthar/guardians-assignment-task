import React from "react";
import Navbar from "../components/Commons/Navbar";
import Search from "../components/Search";

export default function SearchPage() {

    return (
        <div className="min-h-full h-screen w-full bg-gray-200">
            <Navbar />
            <Search />
        </div >
    )
}