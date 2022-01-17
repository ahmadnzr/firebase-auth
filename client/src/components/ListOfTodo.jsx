import React, { useEffect, useState } from "react";
import axios from "axios";

const ListOfTodo = ({ token }) => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    fetchData(token);
  }, [token]);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:8080/api/todos", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    setTodos(res.data.todos)

  };
  console.log(todos);
  return (
    <div>
      <h1>List Of Todo</h1>
      <ul>
        {todos && todos.map((todo) => <li key={todo.id}>{todo.title}</li>)}
      </ul>
    </div>
  );
};

export default ListOfTodo;
