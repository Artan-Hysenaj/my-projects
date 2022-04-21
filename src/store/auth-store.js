import { EMAIL, EXPIRES_IN, TOKEN, USER_ID } from "../constants";
import { localStorageHelper } from "../helpers/localStorageHelper";
import { initStore } from "./store";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const AUTOLOGIN = "AUTOLOGIN";

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
      localStorageHelper.set(TOKEN, authData.idToken);
      localStorageHelper.set(USER_ID, authData.localId);
      localStorageHelper.set(EXPIRES_IN, authData.expiresIn);
      localStorageHelper.set(EMAIL, authData.email);
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
      localStorageHelper.remove(TOKEN);
      localStorageHelper.remove(USER_ID);
      localStorageHelper.remove(EXPIRES_IN);
      localStorageHelper.remove(EMAIL);
      return initialState;
    },
    AUTOLOGIN: (state, payload) => {
      const token = localStorageHelper.get(TOKEN);
      const userId = localStorageHelper.get(USER_ID);
      const expiresIn = localStorageHelper.get(EXPIRES_IN);
      const email = localStorageHelper.get(EMAIL);
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
