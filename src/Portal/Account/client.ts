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
    const response = await axiosWithCredentials.get(`${USERS_API}/${userId}/courses`);
    return response.data;
};

export const enrollIntoCourse = async (userId: string, courseId: string) => {
    const response = await axiosWithCredentials.post(`${USERS_API}/${userId}/courses/${courseId}`);
    return response.data;
};
export const unenrollFromCourse = async (userId: string, courseId: string) => {
    const response = await axiosWithCredentials.delete(`${USERS_API}/${userId}/courses/${courseId}`);
    return response.data;
};

export const updateLikesInPost = async (likes: Number, courseId: string) => {
    const body = { "likes" : likes };
    const response = await axiosWithCredentials.post(`${USERS_API}/courses/${courseId}`,body);
    return response.data;
};

/**
 * Search for job posts based on query
 * @param query - Search query string for jobs
 * @returns Promise with job search results
 */
export const searchJobs = async (query: string) => {
    const jobs = await fetchAllCourses();
    console.log("Jobs", jobs);
    const similarity = (str1: string, str2: string) => {
        let matches = 0;
        const len = Math.min(str1.length, str2.length);
        for (let i = 0; i < len; i++) {
            if (str1[i] === str2[i]) matches++;
        }
        return (matches / Math.max(str1.length, str2.length)) * 100;
    };

    const allJobs = await jobs;
    const exactMatches = allJobs.filter((job: any) => job.name && job.name.toLowerCase() === query.toLowerCase());
    const similarJobs = allJobs.filter((job: any) => {
        if (!job.name) return false;
        const similarityScore = similarity(job.name.toLowerCase(), query.toLowerCase());
        return job.name.toLowerCase() !== query.toLowerCase() && similarityScore >= 10;
    });

    return [...exactMatches, ...similarJobs];
};

/**
 * Search for people based on query
 * @param query - Search query string for people
 * @returns Promise with people search results
 */
export const searchPeople = async (query: string) => {
    const peoples = await findAllUsers(); // Fetch all users

    const similarity = (str1: string, str2: string) => {
        let matches = 0;
        const len = Math.min(str1.length, str2.length);
        for (let i = 0; i < len; i++) {
            if (str1[i] === str2[i]) matches++;
        }
        return (matches / Math.max(str1.length, str2.length)) * 100;
    };

    const filteredPeople = peoples.filter((person: any) => {
        const fullName = `${person.firstName} ${person.lastName}`.toLowerCase();
        const similarityScore = similarity(fullName, query.toLowerCase());
        //console.log(`Comparing "${query}" with "${fullName}" - Similarity: ${similarityScore}%`);
        return (
            person.firstName &&
            person.lastName &&
            similarityScore >= 10
        );
    });

    return filteredPeople;
};