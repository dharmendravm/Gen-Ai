import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

export const generateReportApi = async (formData) => {
  try {
    const res = await api.post("/interview", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.log("generateReportApi error: ", error);
    throw error;
  }
};
