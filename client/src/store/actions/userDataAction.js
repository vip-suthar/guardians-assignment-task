import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL =
    process.env.NODE_ENV === "production" ?
        "/api" : "http://localhost:8000/api";

export async function login({ email, password, rememberMe }) {
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/login`, {
            email,
            password,
            rememberMe
        });

        Cookies.set("user_auth_token", data.token);

        return (dispatch) => {
            dispatch({
                "type": "SET_USER_LOGGED_IN",
                "payload": data.userData
            })
        }
    } catch (err) {
        throw new Error(err.response? err.response.data.error : err.message);
    }
}

export async function register(formData) {
    try {

        const email = formData.basicInfo.email;
        const password = formData.basicInfo.password;
        const userData = {
            basicInfo: {
                name: formData.basicInfo.name,
                phoneNumber: formData.basicInfo.phoneNumber
            },
            ...formData
        };

        const { data } = await axios.post(`${API_BASE_URL}/auth/register`, {
            email,
            password,
            data: userData
        });

        Cookies.set("user_auth_token", data.token);

        return (dispatch) => {
            dispatch({
                "type": "SET_USER_LOGGED_IN",
                "payload": data.userData
            })
        }
    } catch (err) {
        throw new Error(err.response? err.response.data.error : err.message);
    }
}

export async function checkLoggedIn() {
    try {
        const token = Cookies.get('user_auth_token');

        if (!token) {
            return {
                "type": "SET_USER_LOGGED_OUT"
            }
        }

        const { data } = await axios.get(`${API_BASE_URL}/user`, {
            headers: {
                Authorization: token
            }
        });

        return (dispatch) => {
            dispatch({
                "type": "SET_USER_LOGGED_IN",
                "payload": data
            })
        }
    } catch (err) {
        Cookies.remove('user_auth_token');
        alert(err.response? err.response.data.error : err.message);
        return {
            "type": "SET_USER_LOGGED_OUT"
        }
    }
}

export async function forgotPass(email) {
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/forgot`, { email });
    } catch (err) {
        throw new Error(err.response? err.response.data.error : err.message);
    }
}

export async function resetPassword({ password, token }) {
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/reset`, {
            password,
            token
        });
        
    } catch (err) {
        console.log(err);
        throw new Error(err.response? err.response.data.error : err.message);
    }
}

export async function updateUserData(userData) {
    try {
        const token = Cookies.get('user_auth_token');

        if (!token) return;

        if (!userData || typeof userData !== 'object') return;

        const { data } = await axios.post(`${API_BASE_URL}/user`, {
            basicInfo: {
                name: userData.basicInfo.name,
                phoneNumber: userData.basicInfo.phoneNumber
            },
            medicalInfo: userData.medicalInfo,
            emergencyContact: userData.emergencyContact
        }, {
            headers: {
                Authorization: token
            }
        });

        return (dispatch) => {
            dispatch({
                "type": "SET_USER_LOGGED_IN",
                "payload": data
            })
        }
    } catch (err) {
        throw err;
    }
}