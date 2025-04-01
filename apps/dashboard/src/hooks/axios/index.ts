import axios from "axios";
// export const BASE_URL = "http://ec2-13-60-172-68.eu-north-1.compute.amazonaws.com:8080/api/v1";
export const BASE_URL = "http://localhost:8080/api/v1";

export default axios.create({ baseURL: BASE_URL });
export const axiosPrivate = axios.create({ baseURL: BASE_URL, withCredentials: true });
