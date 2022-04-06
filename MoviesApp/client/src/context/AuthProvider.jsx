import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import removeAuthorizationToken from "../helpers/removeAuthorizationToken";
import setAuthorizationToken from "../helpers/setAuthorizationToken";
import AuthContext from "./AuthContext";
const AuthProvider = (props) => {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ??
  // const checkAuthentication = useCallback(() => {
  //   return new Promise((resolve, reject) => {
  //     const token = localStorage.getItem("user");
  //     if (!token) {
  //       reject();
  //     }
  //     setLoggedInUser(token);
  //     resolve();
  //   });
  // }, []);
  // useEffect(() => {
  //   checkAuthentication()
  //     .then(() => {
  //       setLoading(false);
  //     })
  //     .catch(() => {
  //       setLoading(false);
  //     });
  // }, [checkAuthentication]);

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (!!token) {
      setLoggedInUser(token);
    }
    setLoading(false);
  }, []);

  const setLoggedInUser = (token) => {
    localStorage.setItem("user", token);
    setAuthorizationToken(token);
    const response = jwtDecode(token);
    setUser(response.user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    removeAuthorizationToken();
    history.push("/login");
  };
  const authContext = {
    isAuthenticated: Boolean(user),
    isAdmin: user && user.role === "admin",
    user,
    loading,
    setLoading,
    setLoggedInUser,
    logout,
  };
  if (loading) {
    return null;
  }
  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
