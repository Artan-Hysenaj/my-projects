import { useNavigate } from "react-router-dom";
import { initStore } from "./store";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const AUTOLOGIN = "AUTOLOGIN";

let logoutTimer;

const initialState = {
  isAuthenticated: false,
  token: null,
  userId: null,
  refreshToken: null,
  expiresIn: null,
  email: null,
};

const configureStore = () => {
  const actions = {
    LOGIN: (state, payload) => {
      const { loginData } = payload;
      localStorage.setItem("token", loginData.idToken);
      localStorage.setItem("userId", loginData.localId);
      localStorage.setItem("expiresIn", loginData.expiresIn);
      return {
        isAuthenticated: true,
        token: loginData.idToken,
        userId: loginData.localId,
        refreshToken: loginData.refreshToken,
        expiresIn: loginData.expiresIn,
        email: loginData.email,
      };
    },
    LOGOUT: (state, payload) => {
      localStorage.removeItem("token");
      return initialState;
    },
    AUTOLOGIN: (state, payload) => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const expiresIn = localStorage.getItem("expiresIn");
      if (!token) return initialState;
      return {
        isAuthenticated: true,
        token,
        userId,
        refreshToken: null,
        expiresIn,
        email: null,
      };
    },
    AUTOLOGOUT: (state, payload) => {},
  };

  initStore(actions, initialState);
};
export default configureStore;
