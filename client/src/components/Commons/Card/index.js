import React from "react"

export default function Card({ title, children }) {
    return (
        <div className="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div className="relative mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 bg-clip-border text-white shadow-lg shadow-indigo-500/40">
                <h3 className="block font-sans text-3xl font-semibold leading-snug tracking-normal text-white antialiased">
                    {title}
                </h3>
            </div>
            <div className="p-6">
                {children}
            </div>
        </div>
    )
}