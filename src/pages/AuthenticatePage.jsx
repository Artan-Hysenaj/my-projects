import React, { useState } from "react";
import Login from "../components/Authenticate/Login/Login";
import Register from "../components/Authenticate/Register/Register";
import Wrapper from "../components/UI/Wrapper/Wrapper";
const AuthenticatePage = (props) => {
  const [login, setLogin] = useState(true);
  const toggleAuthModeHandler = () => {
    setLogin((prevState) => !prevState);
  };
  return (
    <>
      <Wrapper>
        {login ? (
          <section>
            <Login toggleAuthMode={toggleAuthModeHandler} />
          </section>
        ) : (
          <section>
            <Register toggleAuthMode={toggleAuthModeHandler} />
          </section>
        )}
      </Wrapper>
    </>
  );
};

export default AuthenticatePage;
