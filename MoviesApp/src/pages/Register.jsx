import React from "react";
import RegisterForm from "../components/user/RegisterFrom";
const Register = (props) => {
  return (
    <RegisterForm
      onSubmit={() => {
        props.history.push("/login");
      }}
    />
  );
};

export default Register;
