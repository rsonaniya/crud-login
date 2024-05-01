import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContextProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authUser, setAuthUser } = useContext(UserContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    localStorage.clear();
    axios.get("https://rsonaniya-mock-data.onrender.com/users").then((res) => setAllUsers(res.data));
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const signedUser = allUsers.find((user) => user.email === email);
    if (signedUser) {
      if (signedUser.password === password) {
        setAuthUser(signedUser);
        localStorage.setItem("authUser", JSON.stringify(signedUser));
        navigate("/");
      } else {
        setError("Wrong Password Entered");
      }
    } else {
      setError("Entered Email is not registered with us");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleLogin} className="my-3">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <button className="btn btn-primary mx-2" onClick={() => navigate("/signup")}>
          New user? Sign Up
        </button>
      </form>
      <p className="text-danger text-center">{error}</p>
    </div>
  );
}
