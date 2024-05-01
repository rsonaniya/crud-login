import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContextProvider";

export default function Todos() {
  const { authUser, setAuthUser } = useContext(UserContext);
  const [todoLoading, setTodoLoading] = useState(true);
  const [loading, setLoading] = useState({
    doneBtn: false,
    editBtn: false,
    dltBtn: false,
  });

  // useEffect(() => {}, [console.log(authUser.todos)]);

  const handleCompleteTodo = (id) => {
    setTodoLoading({ ...todoLoading, doneBtn: true });
    const newTodos = authUser.todos.map((todo) => {
      if (todo.todoId === id) {
        todo.isCompleted = !todo.isCompleted;
        return todo;
      }
      return todo;
    });
    axios.patch("https://rsonaniya-mock-data.onrender.com/users/" + authUser.id, { todos: newTodos }).then(() => {
      setAuthUser({ ...authUser, todos: newTodos });
      localStorage.setItem("authUser", JSON.stringify({ ...authUser, todos: newTodos }));
      setTodoLoading({ ...todoLoading, doneBtn: false });
    });
  };

  const handleStartEditing = (id) => {
    const newTodos = authUser.todos.map((todo) => {
      if (todo.todoId === id) {
        todo.isEditing = true;
        return todo;
      }
      return todo;
    });
    setAuthUser({ ...authUser, todos: newTodos });
  };
  const handleEditChange = (id, value) => {
    const newTodos = authUser.todos.map((todo) => {
      if (todo.todoId === id) {
        todo.task = value;
        return todo;
      }
      return todo;
    });
    setAuthUser({ ...authUser, todos: newTodos });
  };
  const handleFinishEditing = (id) => {
    const newTodos = authUser.todos.map((todo) => {
      if (todo.todoId === id) {
        delete todo.isEditing;
        return todo;
      }
      return todo;
    });
    axios.patch("https://rsonaniya-mock-data.onrender.com/users/" + authUser.id, { todos: newTodos }).then(() => {
      setAuthUser({ ...authUser, todos: newTodos });
      localStorage.setItem("authUser", JSON.stringify({ ...authUser, todos: newTodos }));
    });
  };

  const handleDeleteTask = (id) => {
    const newTodos = authUser.todos.filter((todo) => todo.todoId !== id);
    axios.patch("https://rsonaniya-mock-data.onrender.com/users/" + authUser.id, { todos: newTodos }).then(() => {
      setAuthUser({ ...authUser, todos: newTodos });
      localStorage.setItem("authUser", JSON.stringify({ ...authUser, todos: newTodos }));
    });
  };

  return (
    <div>
      {authUser.todos.map((todo) => (
        <div key={todo.todoId} className="d-flex justify-content-between align-items-center shadow my-2 p-3">
          {todo.isEditing ? (
            <>
              <input
                value={todo.task}
                onChange={(e) => handleEditChange(todo.todoId, e.target.value)}
                className="form-control"
              />
              <button
                className={`btn btn-outline-success mx-1 ${loading.editBtn ? "" : "bi bi-check-lg"}`}
                onClick={() => handleFinishEditing(todo.todoId)}
              ></button>
            </>
          ) : (
            <>
              <div style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}>{todo.task}</div>
              <div>
                <button
                  className={` btn btn-outline-success mx-1 ${
                    loading.doneBtn
                      ? "spinner-border"
                      : todo.isCompleted
                      ? "bi bi-arrow-counterclockwise"
                      : "bi bi-check-lg"
                  }`}
                  onClick={() => handleCompleteTodo(todo.todoId)}
                ></button>

                <button
                  className="bi bi-pencil-fill btn btn-outline-warning mx-1"
                  onClick={() => handleStartEditing(todo.todoId)}
                ></button>
                <button
                  className={` btn btn-outline-danger mx-1 ${loading.dltBtn ? "spinner-border" : "bi bi-trash-fill"}`}
                  onClick={() => handleDeleteTask(todo.todoId)}
                ></button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
