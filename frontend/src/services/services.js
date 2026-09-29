import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

export const searchBooks = async (query, lang = "all", page = 1) => {
  const response = await API.get("/books/search", {
    params: {
      q: query,
      lang,
      page,
    },
  });

  return response.data;
};

export default API;
