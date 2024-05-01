import React from "react";
import Todos from "./Components/Todos";
import AddTodo from "./Components/AddTodo";
import Login from "./Components/Login";

import { Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import NavBar from "./Components/NavBar";
import Signup from "./Components/Signup";

export default function App() {
  return (
    <div>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="todos" element={<Todos />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="addtodo" element={<AddTodo />} />
        </Routes>
      </div>
    </div>
  );
}
