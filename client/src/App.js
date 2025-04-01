import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/todos";

function App() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");

    // Fetch all todos
    useEffect(() => {
        axios.get(API_URL)
            .then(res => setTodos(res.data))
            .catch(err => console.error(err));
    }, []);

    // Add a new todo
    const addTodo = () => {
        if (!newTodo.trim()) return;
        axios.post(API_URL, { text: newTodo })
            .then(res => setTodos([...todos, res.data]))
            .catch(err => console.error(err));
        setNewTodo("");
    };

    // Toggle todo completion
    const toggleTodo = (id, completed) => {
        axios.patch(`${API_URL}/${id}`, { completed: !completed })
            .then(res => {
                setTodos(todos.map(todo => todo._id === id ? res.data : todo));
            })
            .catch(err => console.error(err));
    };

    // Delete a todo
    const deleteTodo = (id) => {
        axios.delete(`${API_URL}/${id}`)
            .then(() => {
                setTodos(todos.filter(todo => todo._id !== id));
            })
            .catch(err => console.error(err));
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>To-Do List</h1>
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new task"
            />
            <button onClick={addTodo}>Add</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo._id}>
                        <span 
                            style={{ textDecoration: todo.completed ? "line-through" : "none", cursor: "pointer" }}
                            onClick={() => toggleTodo(todo._id, todo.completed)}
                        >
                            {todo.text}
                        </span>
                        <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
