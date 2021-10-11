import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { signupUser } from "../authentication/authSlice";
import { useDispatch, useSelector } from "react-redux";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
    if (password !== confirmPassword) {
      console.log("Password should match Confirm password");
      return;
    }
    dispatch(signupUser({ name, email, password }));
  };

  return (
    <div className="container-auth">
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
          />
        </label>
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
        <label>
          Confirm Password
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};
