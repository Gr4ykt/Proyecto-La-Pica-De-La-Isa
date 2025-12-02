import axios from "./axiosAuthUser.js"

export const registerRequest = user => axios.post("/register", user);
export const loginRequest = user => axios.post("/login", user);
export const logoutRequest = user => axios.post("/logout", user);

export const updateProfileRequest = (id, profile) => axios.put(`/profile/${id}`, profile);
export const profileRequest = () => axios.get('/profile');
export const loginGoogle = () => axios.get("google");
export const verifyTokenRequest = () => axios.get('/verify');

// FOR ADMIN
export const getUsersRequestAdmin = () => axios.get('/admin/getUsers');