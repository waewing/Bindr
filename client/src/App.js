import React, { useState, useEffect } from "react";
import axios from "axios";
import CardFiller from "./components/card"; // Import new component
import "./App.css"; // Import styles
import placeholder from "./images/placeholder.jpg";
import placeholder2 from "./images/BT5-112.png";

const API_URL = "http://localhost:5000/";

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
        <body>
            <div className="container">
                <header className="banner">
                    <div className="bannerText">Website Name</div>
                    <div className="userProfile">
                        <img src={placeholder} alt="Avatar" id="avatar"></img>
                    </div>
                </header>
                
                <div className="search-bar">
                    <search>
                        <form>
                            <input name='query' id="query" placeholder="Luffy"></input>
                        </form>
                    </search>
                </div>

                <div className="content-wrapper">
                    
                    <div className="cardCatalog">
                        <CardFiller totalCards={200}/>
                    </div>

                    <div className="display">
                        <img id="hoverDisplay" src={placeholder2} alt="Hover Card"></img>

                        <div className="description">
                            <p id="card-text">There are also two additional keywords you can pair with these values: safe and unsafe.</p>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
}

export default App;