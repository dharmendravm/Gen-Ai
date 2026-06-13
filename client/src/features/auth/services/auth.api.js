import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

export const registerApi = async ({ username, email, password }) => {
  try {
    const res = await api.post("/auth/register", {
      username,
      email,
      password,
    });

    return res.data;
  } catch (error) {
    console.log("register api error: ", error);
    throw error;
  }
};

export const loginApi = async ({ email, password }) => {
  try {
    const res = await api.post("/auth/login", {
      email,
      password,
    });

    return res.data;
  } catch (error) {
    console.log("login api error: ", error);
    throw error;
  }
};

export const logoutApi = async () => {
  try {
    const res = await api.get("/auth/logout");
    return res.data;
  } catch (error) {
    console.log("logout api error", error);
    throw error;
  }
};

export const getMeApi = async () => {
  try {
    const res = await api.get("/auth/get-me");
    return res.data;
  } catch (error) {
    console.log("get-me api error", error);
    throw error;
  }
};
