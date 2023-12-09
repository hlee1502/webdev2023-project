import axios from "axios";

const request = axios.create({
    withCredentials: true,
  });

export const BASE_API = process.env.REACT_APP_BASE_API_URL;
//export const USERS_API = `${BASE_API}/api/users`;

export const USERS_API = "http://localhost:4000/api/users";
export const EXERCISE_API = "http://localhost:4000/api/exercises";

export const searchExercise = async (query) => {
    try {
        const response = await request.post(`${EXERCISE_API}`, query)
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export const signin = async (credentials) => {
    try {
        const response = await request.post(`${USERS_API}/signin`, credentials);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const account = async () => {
    const response = await request.post(`${USERS_API}/account`);
    return response.data;
};

export const updateUser = async (user) => {
    const response = await request.put(`${USERS_API}/${user._id}`, user);
    return response.data;
};

export const findAllUsers = async () => {
    const response = await request.get(`${USERS_API}`);
    return response.data;
};

export const createUser = async (user) => {
    const response = await request.post(`${USERS_API}`, user);
    return response.data;
};

export const findUserById = async (id) => {
    const response = await request.get(`${USERS_API}/${id}`);
    return response.data;
};

export const findUserByUsername = async (username) => {
    const response = await request.get(`${USERS_API}/${username}`);
    return response.data;
};

export const deleteUser = async (user) => {
    const response = await request.delete(`${USERS_API}/${user._id}`);
    return response.data;
};

export const signup = async (credentials) => {
    const response = await request.post(`${USERS_API}/signup`, credentials);
    return response.data;
};  

export const signout = async () => {
    const response = await request.post(`${USERS_API}/signout`);
    return response.data;
};
  