import axios from "axios";

const instance = axios.create({ baseURL: "http://localhost:8000/otros" });

const getNewsArticles = async (id) => {
  try {
    const response = await instance.get();
    return response;
  } catch (error) {
    console.error("Error fetching news articles:", error.message);
    return null;
  }
};

export { getNewsArticles };
