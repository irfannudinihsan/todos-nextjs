
'use client'

import { Suspense } from "react";
import { useState, useEffect } from 'react';

function getData() {
  return fetch("https://dummyjson.com/todos")
    .then(res => {
      if (!res.ok) {
        throw new Error("failed to fetch data");
      }
      return res.json();
    });
}

function addTodo(todo,userId) {

  const todoWithUserId = { ...todo, userId };
  return fetch("https://dummyjson.com/todos/add", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ todo : todoWithUserId })
  })
  .then(res => {
    if (!res.ok) {
      throw new Error("failed to add todo");
    }
    return res.json();
  });
}

export default function Page() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    getData()
      .then(data => setTodos(data.todos))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const handleAddTodo = () => {
    addTodo(newTodo)
      .then(newTodoData => {
        setTodos([...todos, newTodoData]);
        setNewTodo("");
      })
      .catch(error => console.error("Error adding todo:", error));
  };

  return (
    <div className="max-w-3xl mx-auto mt-20">
      <input
        type="text"
        id="newTodo"
        className="bg-slate-100 my-3 p-4 text-gray-900 text-sm rounded-lg block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="input todolist"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        required
      />
      <button className="button-complete task-button text-blue-500 mx-1" onClick={handleAddTodo}>
        <h6> Add Todo</h6>
      </button>

      <ul className=" ">
        <Suspense fallback={<p>Loading...</p>}>
          {todos.map((item) => (
            <li
              key={item.id}
              className="  flex items-center bg-slate-100 my-3 p-4 justify-between ">
              {item.completed ? (
                <div className="w-1/5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-green-500 mr-2">
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              ) : (
                <div className="w-1/5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-gray-300 mr-2">
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}

              <h3 className="ml-4 mx-8 w-3/5">{item.todo}</h3>

              <div className="w-1/5">
                <button className="button-complete task-button text-blue-500 mx-1">
                  <h6> Edit</h6>
                </button>
                <button className="button-complete task-button text-red-500 mx-1">
                  <h6> Delete</h6>
                </button>
              </div>
            </li>
          ))}
        </Suspense>
      </ul>
    </div>
  );
}
