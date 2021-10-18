import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { signupUser } from "../authentication/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import "./auth.css";
import { Loader } from "..";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
    if (password.length < 8) {
      alert.error("Passwords should be 8 characters long");
      return;
    }
    if (password !== confirmPassword) {
      alert.error("Passwords don't match");
      return;
    }
    dispatch(signupUser({ name, email, password }));
  };

  return (
    <div className="container-auth">
      {status === "loading" && <Loader text="signing up..." />}
      <header>Login</header>
      <small>
        Already a member? <Link to="/login">Log In</Link>
      </small>
      <form className="form-auth" onSubmit={onSubmit}>
        <label>
          Name
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
        </label>
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
            autoComplete="new-password"
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
          />
        </label>
        <button type="submit" className="btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
};
