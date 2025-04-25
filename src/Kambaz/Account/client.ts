import axios from "axios";
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;
const axiosWithCredentials = axios.create({ withCredentials: true });

export const findAllUsers = async () => {
    const response = await axiosWithCredentials.get(USERS_API);
    return response.data;
};

export const findUsersByRole = async (role: string) => {
    const response = await
        axios.get(`${USERS_API}?role=${role}`);
    return response.data;
};

export const findUsersByPartialName = async (name: string) => {
    const response = await axios.get(`${USERS_API}?name=${name}`);
    return response.data;
};


export const signin = async (credentials: any) => {
    console.log("User API", USERS_API);
    const response = await axiosWithCredentials.post(`${USERS_API}/signin`, credentials);
    return response.data;
};

export const signup = async (user: any) => {
    const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
    return response.data;
};

export const signout = async () => {
    const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
    return response.data;
};

export const profile = async () => {
    const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
    return response.data;
};

export const findMyCourses = async () => {
    const { data } = await axiosWithCredentials.get(`${USERS_API}/current/courses`);
    return data;
};

export const fetchAllCourses = async () => {
    const { data } = await axiosWithCredentials.get(`${REMOTE_SERVER}/api/courses`);
    return data;
}

export const createCourse = async (course: any) => {
    const { data } = await axiosWithCredentials.post(`${USERS_API}/current/courses`, course);
    return data;
};

export const fetchEnrollmentsForUser = async () => {
    const { data } = await axiosWithCredentials.get(`${USERS_API}/current/enrollments`);
    return data;
};

export const findUserById = async (id: string) => {
    const response = await axios.get(`${USERS_API}/${id}`);
    return response.data;
};

export const deleteUser = async (userId: string) => {
    const response = await axios.delete(`${USERS_API}/${userId}`);
    return response.data;
};

export const updateUser = async (user: any) => {
    const response = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
    return response.data;
};

export const createUser = async (user: any) => {
    const response = await axios.post(`${USERS_API}`, user);
    return response.data;
};


export const findCoursesForUser = async (userId: string) => {
    console.log("User API", userId);
    return [
        {
            "_id": "67f7ff62672bea90d9685327",
            "name": "Aerodynamics Engineer",
            "number": "RS4560",
            "credits": 3,
            "description": "Job Description: We’re seeking an Aerodynamics Engineer to design, analyze and optimize airflow systems for next-generation aircraft. You’ll apply computational fluid dynamics (CFD) techniques, develop airfoil geometries, and collaborate with structural and systems teams to enhance lift, minimize drag, and ensure overall flight stability.",
            "imgSource": "/images/aerodynamics.jpg",
            "__v": 0,
            "likes": 5,
            "creatorId": "674910e555bec5e3517ee479",
            "creatorName": "Strider",
            "demands": [],
            "skills": []
        },
        {
            "_id": "674e3bae6697f727d82038cb",
            "name": "Web Developer",
            "number": "New Number",
            "description": "Job Description: Looking for a Web Developer to build and maintain modern, responsive web applications. You will work closely with designers and backend engineers to deliver seamless user experiences, write clean, well-tested code, and optimize front-end performance.",
            "imgSource": "/images/reactjs.png",
            "__v": 0,
            "likes": 4,
            "creatorId": "674e9c2f75f220b7216cda14",
            "creatorName": "Danny",
            "demands": [],
            "skills": []
        }
    ];
};

export const enrollIntoCourse = async (userId: string, courseId: string) => {
    const response = await axiosWithCredentials.post(`${USERS_API}/${userId}/courses/${courseId}`);
    return response.data;
};
export const unenrollFromCourse = async (userId: string, courseId: string) => {
    const response = await axiosWithCredentials.delete(`${USERS_API}/${userId}/courses/${courseId}`);
    return response.data;
};

