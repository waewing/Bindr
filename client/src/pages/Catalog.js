import {React,  useState, useEffect } from "react";
import axios from "axios";
import CardFiller from "../components/loadcard"; // Import new component
import "./Catalog.css"; // Import styles
import placeholder from "../images/placeholder.jpg";
import { Button } from "bootstrap";

const API_URL = "http://localhost:5000/";

function Catalog() {
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


    function filterCards(){
        var input, filter, cardCatalog, list, image, id, set, code;

        input = document.getElementById('query');
        filter = input.value.toUpperCase();
        cardCatalog = document.getElementsByClassName('cardCatalog');
        list = cardCatalog[0].getElementsByClassName('card');

        for (let i = 0; i < list.length; i++){
            image = list[i];
            id = image.id;
            set = image.getAttribute('set');
            code = image.getAttribute('code');

            if (id.toUpperCase().indexOf(filter) > -1 || set.toUpperCase().indexOf(filter) > -1 || code.toUpperCase().indexOf(filter) > -1) {
                list[i].style.display = "";
            } else {
                list[i].style.display = "none";
            }
        }
    }

    return (
        <div>
            <div className="container">
                <header className="banner">
                    <div className="bannerText">Binder.io</div>
                    <button id="Collections" textContent="Collections"/>
                    <div className="userProfile">
                        <img src={placeholder} onClick="" alt="Avatar" id="avatar"></img>
                    </div>
                </header>
                
                <div className="search-bar">
                    <search>
                            <input name='query' id="query" onKeyUp={filterCards} placeholder="Luffy"></input>
                    </search>
                </div>

                <div className="content-wrapper">
                    
                    <div className="cardCatalog">
                        {
                            flat.map(card => (
                                <CardFiller onClick={() => {setHoveredImage(card.img_src);sethoveredDescription(card.effect);}} key={card._id} name={card.name} set={card.set} code={card.code} imageSource={card.img_src}/>
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

export default Catalog;