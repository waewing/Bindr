import React, { useState, useEffect } from "react";
import axios from "axios";
import CardFiller from "./components/loadcard"; // Import new component
import "./App.css"; // Import styles
import placeholder from "./images/placeholder.jpg";

const API_URL = "http://localhost:5000/";

function App() {
    const [data, setData] = useState([]);
    const [flat, setFlat] = useState([]);
    const [hoveredImage, setHoveredImage] = useState(null);
    const [hoveredDescription, sethoveredDescription] = useState("");

    useEffect(() => {
        axios.get(API_URL)
            .then(res => {
                setData(res.data);
                setFlat(res.data.flat());
                setHoveredImage(res.data.flat()[0].img_src);
                sethoveredDescription(res.data.flat()[0].effect);
            })

            .catch(err => 
                console.error(err)
            );
    }, []);



    return (
        <div>
            <div className="container">
                <header className="banner">
                    <div className="bannerText">Binder.io</div>
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
                        {
                            flat.map(card => (
                                <CardFiller onClick={() => {setHoveredImage(card.img_src);sethoveredDescription(card.effect);}} key={card._id}  alt = {card.name}  imageSource={card.img_src}/>
                            ))
                        }
                    </div>

                    <div className="display">
                        <img id="hoverDisplay" src={hoveredImage} alt="Hover Card"></img>

                        <div className="description">
                            <p id="card-text">{hoveredDescription}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;