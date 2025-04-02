import React from "react";

const TodoItem = ({ todo, toggleTodo, deleteTodo }) => {
    return (
        <li className="todo-item">
            <span 
                style={{ textDecoration: todo.completed ? "line-through" : "none", cursor: "pointer" }}
                onClick={() => toggleTodo(todo._id, todo.completed)}
            >
                {todo.text}
            </span>
            <button className="delete-btn" onClick={() => deleteTodo(todo._id)}>Delete</button>
        </li>
    );
};

export default TodoItem;
