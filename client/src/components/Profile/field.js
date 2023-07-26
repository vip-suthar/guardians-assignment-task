import React from "react";

export default function Fields({ fields, handleFieldChange, editMode = false }) {

    const fieldKeys = Object.keys(fields);

    function titleCase(str) {
        str = str.replace(/([A-Z])/g, " $1");
        let splitStr = str.toLowerCase().split(' ');
        for (let i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }

    const handleChange = (key, val) => {
        handleFieldChange(key, val);
    }

    return (
        <div className="border-gray-200 px-4 py-5 sm:p-0 -mt-6">
            <dl className="sm:divide-y sm:divide-gray-200">
                {fieldKeys.map(key => {
                    return (
                        <div key={key} className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ">
                            <dt className="text-sm font-medium text-gray-500">
                                {titleCase(key)}
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <input
                                    placeholder={titleCase(key)}
                                    className="h-full w-full border-b border-blue-gray-200 bg-transparent py-1 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-indigo-500 focus:outline-0 disabled:border-transparent disabled:bg-blue-gray-50"
                                    disabled={!editMode || key === 'email'}
                                    value={fields[key] || ""}
                                    onChange={(e)=> {handleChange(key, e.target.value)}}
                                />
                            </dd>
                        </div>
                    )
                })}
            </dl>
        </div>
    )
}