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
      const { authData } = payload;
      localStorage.setItem("token", authData.idToken);
      localStorage.setItem("userId", authData.localId);
      localStorage.setItem("expiresIn", authData.expiresIn);
      localStorage.setItem("email", authData.email);
      return {
        isAuthenticated: true,
        token: authData.idToken,
        userId: authData.localId,
        refreshToken: authData.refreshToken,
        expiresIn: authData.expiresIn,
        email: authData.email,
      };
    },
    LOGOUT: (state, payload) => {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("expiresIn");
      localStorage.removeItem("email");
      return initialState;
    },
    AUTOLOGIN: (state, payload) => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const expiresIn = localStorage.getItem("expiresIn");
      const email = localStorage.getItem("email");
      if (!token) return initialState;
      return {
        isAuthenticated: true,
        token,
        userId,
        refreshToken: null,
        expiresIn,
        email,
      };
    },
    AUTOLOGOUT: (state, payload) => {},
  };

  initStore(actions, initialState);
};
export default configureStore;
