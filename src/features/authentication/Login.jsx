import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { loginUser } from "../authentication/authSlice";
import { useDispatch, useSelector } from "react-redux";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isUserLoggedIn, status, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isUserLoggedIn) {
      navigate("/");
    }
  }, [isUserLoggedIn, navigate]);

  useEffect(() => {
    if (status === "error" && error) {
      // dispatch(showAlert({ type: "error", data: error }));
      console.log(error);
    }
  }, [error, status, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    let emailRegex = new RegExp(
      /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/
    );
    if (!emailRegex.test(email)) {
      console.log("Invalid email");
      return;
      // return dispatch(showAlert({ type: "error", data: "Invalid email" }));
    }
    dispatch(loginUser({ email, password }));
  };

  const onSubmitTestCreds = (e) => {
    e.preventDefault();
    console.log("TEST LOGIN");
    dispatch(loginUser({ email: "user@gmail.com", password: "abcd@1234" }));
  };

  return (
    <div className="container-auth">
      <header>Login</header>
      <small>
        New here? <Link to="/signup">Sign Up</Link>
      </small>
      <form className="form-login" onSubmit={onSubmit}>
        <label>
          Email
          <input
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Log In</button>
      </form>
      <form className="form-login form-test-creds" onSubmit={onSubmitTestCreds}>
        <button type="submit">Log In with Test Credentials</button>
      </form>
    </div>
  );
};
