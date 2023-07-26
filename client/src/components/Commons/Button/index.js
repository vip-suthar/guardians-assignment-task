import React from "react";

export default function Button({
    action,
    handleClick, 
    text, 
    isDisabled = false
}) {
    return (
        <button
            type={action}
            className="block w-full select-none rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-400 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-indigo-500/20 transition-all hover:shadow-lg hover:shadow-indigo-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            onClick={handleClick}
            disabled={isDisabled}
        >
            {text}
        </button>
    )
}