import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [cnfPwd, setCnfPwd] = useState("");
  const [err, setErr] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
    axios.get("https://rsonaniya-mock-data.onrender.com/users").then((res) => {
      setAllUsers(res.data);
    });
  }, []);

  const handleSignUp = (e) => {
    e.preventDefault();
    if (name.trim() && email.trim() && pwd.trim() && cnfPwd.trim()) {
      if (pwd === cnfPwd) {
        const foundUser = allUsers.find((user) => user.email === email);
        if (!foundUser) {
          const newuser = {
            id: Date.now(),
            name,
            email,
            password: pwd,
            todos: [],
          };
          axios.post("https://rsonaniya-mock-data.onrender.com/users", newuser).then(() => {
            localStorage.setItem("authUser", JSON.stringify(newuser));
            navigate("/");
          });
        } else {
          setErr("User is Already Registered, Kindly Login");
        }
      } else {
        setErr("Password and Confirm Password Should be same ");
      }
    } else {
      setErr("No Field Shoud be left Blank");
    }
  };
  return (
    <form onSubmit={handleSignUp}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Full Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={() => setErr("")}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setErr("")}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          onFocus={() => setErr("")}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="cnfPwd" className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          className="form-control"
          id="cnfPwd"
          value={cnfPwd}
          onChange={(e) => setCnfPwd(e.target.value)}
          onFocus={() => setErr("")}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
      <p className="text-danger text-center">{err}</p>
    </form>
  );
}
