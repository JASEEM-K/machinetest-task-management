import axios from "axios";

export const axiosInstance = new axios.Axios({
    baseURL: import.meta.env.DEV ? "http://localhost:5000/" : "/",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});
