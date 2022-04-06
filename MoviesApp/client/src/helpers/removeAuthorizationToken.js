import { axiosInstance } from "../api/api";

export default function removeAuthorizationToken() {
  delete axiosInstance.defaults.headers.common.authorization;
}
