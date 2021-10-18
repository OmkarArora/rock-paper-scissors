import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { loginUser } from "../authentication/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import "./auth.css";
import { Loader } from "..";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { isUserLoggedIn, status, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isUserLoggedIn) {
      navigate("/");
    }
  }, [isUserLoggedIn, navigate]);

  useEffect(() => {
    if (status === "error" && error) {
      alert.error(error);
    }
  }, [error, status, alert, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    let emailRegex = new RegExp(
      /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/
    );
    if (!emailRegex.test(email)) {
      alert.error("Invalid email");
      return;
    }
    dispatch(loginUser({ email, password }));
  };

  const onSubmitTestCreds = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email: "user@gmail.com", password: "abcd@1234" }));
  };

  return (
    <div className="container-auth">
      {status === "loading" && <Loader text="logging in..." />}
      <header>Login</header>
      <small>
        New here? <Link to="/signup">Sign Up</Link>
      </small>
      <form className="form-auth" onSubmit={onSubmit}>
        <label>
          Email
          <input
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          />
        </label>
        <label>
          Password
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </label>
        <button type="submit" className="btn-primary">
          Log In
        </button>
      </form>
      <form className="form-auth form-test-creds" onSubmit={onSubmitTestCreds}>
        <button type="submit" className="btn-secondary">
          Log In with Test Credentials
        </button>
      </form>
    </div>
  );
};
