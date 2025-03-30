import axios from "axios";
export const BASE_URL = "13.60.172.68:3000/api/v1";

export default axios.create({ baseURL: BASE_URL });
export const axiosPrivate = axios.create({ baseURL: BASE_URL, withCredentials: true });
