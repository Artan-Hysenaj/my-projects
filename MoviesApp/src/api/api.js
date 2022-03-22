import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/",
});

const Api = {
  auth: {
    login: (credentials) =>
      axiosInstance.post("auth", {
        credentials,
      }),
    register: (credentials) =>
      axiosInstance.post("users", {
        user: credentials,
      }),
  },

  users: {},

  movies: {
    getMovies: async () => {
      const response = await axiosInstance.get("authfilms");
      return response.data.films;
    },

    deleteMovie: (movieId) => axiosInstance.delete(`authfilms/${movieId}`),

    addMovie: (movieData) =>
      axiosInstance.post("authfilms", {
        film: movieData,
      }),

    updateMovie: (movieData) =>
      axiosInstance.put(`authfilms/${movieData._id}`, {
        film: movieData,
      }),
  },
};

export default Api;
