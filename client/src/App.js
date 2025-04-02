import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoItem from "./components/ToDoItem"; // Import new component
import "./App.css"; // Import styles

const API_URL = "http://localhost:5000/api/todos";

function App() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");

    useEffect(() => {
        axios.get(API_URL)
            .then(res => setTodos(res.data))
            .catch(err => console.error(err));
    }, []);

    const addTodo = () => {
        if (!newTodo.trim()) return;
        axios.post(API_URL, { text: newTodo })
            .then(res => setTodos([...todos, res.data]))
            .catch(err => console.error(err));
        setNewTodo("");
    };

    const toggleTodo = async (id, completed) => {
        try {
            const response = await axios.patch(`${API_URL}/${id}`, { completed: !completed });
            setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
        } catch (error) {
            console.error("Error updating todo:", error.response ? error.response.data : error.message);
        }
    };

    const deleteTodo = (id) => {
        axios.delete(`${API_URL}/${id}`)
            .then(() => {
                setTodos(todos.filter(todo => todo._id !== id));
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="container">
            <h1>To-Do List</h1>
            <div className="todo-input">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new task"
                />
                <button onClick={addTodo}>Add</button>
            </div>
            <ul className="todo-list">
                {todos.map(todo => (
                    <TodoItem key={todo._id} todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
                ))}
            </ul>
        </div>
    );
}

export default App;