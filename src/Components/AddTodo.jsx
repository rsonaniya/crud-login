import axios from "axios";
import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContextProvider";

export default function AddTodo() {
  const { authUser, setAuthUser } = useContext(UserContext);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [err, setErr] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setLoading(true);
      const newTodo = {
        todoId: Date.now(),
        task: input,
        isCompleted: false,
      };
      const newTodos = [...authUser.todos, newTodo];

      axios.patch("https://rsonaniya-mock-data.onrender.com/users/" + authUser.id, { todos: newTodos }).then(() => {
        setAuthUser({ ...authUser, todos: newTodos });
        localStorage.setItem("authUser", JSON.stringify({ ...authUser, todos: newTodos }));
        setLoading(false);
        setInput("");
      });
    } else setErr("Input can not be blank");
  };
  return (
    <form className="my-3" onSubmit={handleFormSubmit}>
      <div className="form-group my-2">
        <label htmlFor="todo" className="my-2">
          Add a new Todo
        </label>
        <div className="d-flex">
          <input
            type="text"
            className="form-control mr-2"
            id="todo"
            placeholder="Enter Todo"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setErr("");
            }}
            onFocus={() => setErr("")}
          />
          <button
            className={` btn btn-outline-success mx-1 ${loading ? "spinner-border" : "bi bi-check-lg"}`}
            disabled={loading}
          ></button>
        </div>
      </div>
      <p className="text-danger text-center">{err}</p>
    </form>
  );
}
