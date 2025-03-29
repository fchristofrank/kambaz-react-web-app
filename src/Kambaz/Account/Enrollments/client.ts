import axios from "axios";
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;
const axiosWithCredentials = axios.create({ withCredentials: false });

export const unEnrollUser = async (courseId: any) => {
    const { data } = await axios.delete(`${USERS_API}/current/${courseId}/enrollments`);
    return data;
}

export const enrollUser = async (courseId: any) => {
    const { data } = await axios.post(`${USERS_API}/current/${courseId}/enrollments`);
    return data;
}