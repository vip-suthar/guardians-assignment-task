import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL =
    process.env.NODE_ENV === "production" ?
        "/api" : "http://localhost:8000/api";

export async function getSearchData(searchQuery, sortBy, range) {
    try {
        const coords = await new Promise((res, rej) => {
            navigator.geolocation.getCurrentPosition((location) => {
                res({
                    "lat": location.coords.latitude,
                    "lng": location.coords.longitude
                })
            }, (err) => {
                rej(err);
            })
        })

        const query = { ...coords };
        if (searchQuery && typeof searchQuery == 'string' && searchQuery.trim() != "") query.searchQuery = searchQuery;
        if (sortBy && typeof sortBy == 'string' && sortBy.trim() != "") query.sortBy = sortBy;
        if (range && !isNaN(parseInt(range)) && parseInt(range) >= 1 && parseInt(range) <= 100)
            query.range = parseInt(range);

        const userAuthToken = Cookies.get("user_auth_token");

        const { data } = await axios.get(`${API_BASE_URL}/hospitals?` + (new URLSearchParams(query).toString()), {
            headers: {
                Authorization: userAuthToken
            }
        });
        return (dispatch) => {
            dispatch({
                "type": "SET_SEARCH_DATA",
                "payload": data
            });
        }

    } catch (err) {
        if(err.code === 1) throw new Error("Please provide location access to continue");
        else throw err;
    }
}

export function unsetSearchData() {
    return (dispatch) => {
        dispatch({
            "type": "UNSET_SEARCH_DATA"
        });
    }
}