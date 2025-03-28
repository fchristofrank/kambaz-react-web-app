import axios from "axios";
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;
const axiosWithCredentials = axios.create({ withCredentials: true });

export const unEnrollUser = async (courseId: any) => {
    const { data } = await axiosWithCredentials.delete(`${USERS_API}/current/${courseId}/enrollments`);
    return data;
}

export const enrollUser = async (courseId: any) => {
    const { data } = await axiosWithCredentials.post(`${USERS_API}/current/${courseId}/enrollments`);
    return data;
}