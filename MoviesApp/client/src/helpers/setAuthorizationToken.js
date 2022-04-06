import { axiosInstance } from "../api/api";

export default function setAuthorizationToken(token) {
  axiosInstance.defaults.headers.common.authorization = `Bearer ${token}`;
}
