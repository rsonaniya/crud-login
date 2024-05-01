import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const [loginButton, setLoginButton] = useState("Login");
  const navigate = useNavigate();

  useEffect(() => {
    const localStorageAuthUser = localStorage.getItem("authUser");

    if (localStorageAuthUser) setLoginButton("Logout");
    else setLoginButton("Login");
  }, [navigate]);

  const handleLogout = () => {
    if (loginButton === "Logout") {
      localStorage.clear();
      setLoginButton("Login");
      navigate("login");
    } else {
      navigate("login");
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="">
                  Home
                </Link>
              </li>
              {loginButton === "Logout" && (
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="todos">
                    My To-Dos
                  </Link>
                </li>
              )}
              {loginButton === "Logout" && (
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="addtodo">
                    Add a New Todo
                  </Link>
                </li>
              )}
            </ul>

            <button className="btn btn-outline-success" type="submit" onClick={handleLogout}>
              {loginButton}
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
