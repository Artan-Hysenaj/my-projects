import { useEffect, useState } from "react";
import { Button } from "reactstrap";
import Toaster from "../shared/Toaster";
import Input from "../shared/Input";
import Api from "../../api/api";
import { Link } from "react-router-dom";
import classes from "./LoginForm.module.css";
import useHttp from "../../hooks/useHttp";

const LoginForm = ({ onSubmit }) => {
  const {
    sendRequest,
    status,
    error,
    data: response,
  } = useHttp(Api.auth.login, { startWithPending: true });

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (status === "completed" && !error) {
      onSubmit(response.data.token);
    }
  }, [status, onSubmit, response, error]);

  const validate = () => {
    const tempErrors = {};
    Object.keys(formData).map((key) => {
      return !formData[key] && (tempErrors[key] = `${key} field is required`);
    });
    setErrors(tempErrors);
    return Boolean(Object.keys(tempErrors).length !== 0);
  };
  const handleOnSubmit = (event) => {
    event.preventDefault();
    const hasErrors = validate();
    if (hasErrors) {
      return;
    }
    sendRequest(formData);
  };

  const handleOnChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className={classes["form-container"]}>
      <Toaster isOpen={!!error} icon="danger" title={error} />
      <h2>Login</h2>
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
          onBlur={() => validate()}
          onChange={handleOnChange}
        />
        <div className="d-flex justify-content-between">
          <Button color="success">Login</Button>
          <Link className="align-self-end" to="/register">
            Create Account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
