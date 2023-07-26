import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { getSearchData } from "../../store/actions/searchDataAction";
import Table from "./table";

export default function SearchSort() {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [range, setRange] = useState(100);
    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch();

    const handleSearching = async (sort) => {
        setIsLoading(true);
        try {
            dispatch(
                await getSearchData(searchQuery, sort || sortBy, range)
            );
        } catch (error) {
            alert(error.message);
        }
        setIsLoading(false);
    }

    const handleSorting = (e) => {
        setSortBy(e.target.value);
        handleSearching(e.target.value);
    }



    return (
        <div className="w-[95%] h-[calc(100%-100px)] mx-auto mt-2 overflow-hidden">
            <div className="flex flex-col lg:flex-row justify-around">
                <div className="relative w-full lg:w-2/3">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-blue-gray-500 dark:text-blue-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        onChange={(e) => { setSearchQuery(e.target.value) }}
                        value={searchQuery}
                        className="block w-full p-4 pl-10 text-sm text-gray-900 border border-indigo-200 outline-none rounded-lg"
                        placeholder="Search by Name, Location..."
                        required
                    />
                    <button
                        className="text-white absolute right-2.5 bottom-2.5 rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-400 py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-indigo-500/20 transition-all hover:shadow-lg hover:shadow-indigo-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                        type="button"
                        data-ripple-light="true"
                        onClick={handleSearching}
                    >
                        Search
                    </button>
                </div>
                <div className="w-full lg:w-1/3 gap-4 flex justify-around py-2">

                    <div className="relative h-10 min-w-[200px]">
                        <select value={sortBy} onChange={handleSorting}
                            className="peer h-full w-full rounded-[7px] border border-gray-400 border-t-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
                            <option value="dist">Distance</option>
                            <option value="name">Name</option>
                        </select>
                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-gray-400 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-gray-400 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Sort by
                        </label>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="inline-block text-sm font-medium text-gray-900 mr-2">Range: </div>
                        <input
                            type="number"
                            value={range}
                            min="1"
                            max="100"
                            step="1"
                            onChange={(e) => { setRange(e.target.value) }}
                            className="peer h-full w-full rounded-[7px] border-2 border-blue-gray-200 px-2 py-1 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        />
                    </div>
                </div>
            </div>
            <Table isLoading={isLoading} setIsLoading={setIsLoading} />
        </div>
    )
}