import { useState } from "react";
import { Button } from "reactstrap";
import Input from "../shared/Input";
import Api from "../../api/api";
import Toaster from "../shared/Toaster";
import classes from "./LoginForm.module.css";
import { Link } from "react-router-dom";

const LoginForm = (props) => {
  const [responseMessage, setResponseMessage] = useState(null);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const validate = () => {
    const tempErrors = {};
    Object.keys(formData).map((key) => {
      return !formData[key] && (tempErrors[key] = `${key} field is required`);
    });
    setErrors(tempErrors);
    return Boolean(Object.keys(tempErrors).length !== 0);
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const hasErrors = validate();
    if (hasErrors) {
      return;
    }
    Api.auth
      .register(formData)
      .then((response) => {
        if (response.status !== 200) {
          return;
        }
        props.onSubmit();
      })
      .catch((error) => {
        setResponseMessage(error.message);
      });
  };

  const handleOnChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className={classes["form-container"]}>
      <Toaster
        isOpen={!!responseMessage}
        icon="danger"
        title={responseMessage}
      />
      <h2>Register</h2>
      <form onSubmit={handleOnSubmit}>
        <Input
          placeholder="Email"
          name="email"
          error={errors.email}
          value={formData.email}
          onChange={handleOnChange}
        />

        <Input
          placeholder="Password"
          type="password"
          name="password"
          error={errors.password}
          value={formData.password}
          onChange={handleOnChange}
        />
        <Input
          placeholder="Confirm Password"
          type="password"
          name="passwordConfirmation"
          error={errors.passwordConfirmation}
          value={formData.passwordConfirmation}
          onChange={handleOnChange}
        />

        <div className="d-flex justify-content-between">
          <Button color="success" >
            Register
          </Button>
          <Link className="align-self-end" to="/login">
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
