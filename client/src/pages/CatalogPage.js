import {React,  useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CardFiller from "../components/loadcard";
import styles from "./CatalogPage.module.css"; // Import styles
import placeholder from "../images/placeholder.jpg";

const API_URL = "http://localhost:5000/";

function Catalog() {
    const [data, setData] = useState([]);
    const [flat, setFlat] = useState([]);
    const [hoveredImage, setHoveredImage] = useState(null);
    const [hoveredDescription, sethoveredDescription] = useState("");
    const navigate = useNavigate();

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
        cardCatalog = document.getElementsByClassName(styles.cardCatalog);
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

    function toLogin(){
        navigate('/login');
    }

    function toProfile(){
        navigate('/profile/1');
    }

    return (
        <div>
            <div className={styles.container}>
                <header className={styles.banner}>
                    <div className={styles.bannerText}>Binder.io</div>
                    <button id="collections" onClick={toLogin}>Collections</button>
                    <div className={styles.userProfile}>
                        <img src={placeholder} onClick={toProfile} alt="Avatar" id="avatar" className={styles.avatar}></img>
                    </div>
                </header>
                
                <div className={styles.searchBar}>
                    <search>
                            <input name='query' id="query" className={styles.query} onKeyUp={filterCards} placeholder="Luffy"></input>
                    </search>
                </div>

                <div className={styles.contentWrapper}>
                    
                    <div className={styles.cardCatalog}>
                        {
                            flat.map(card => (
                                <CardFiller onClick={() => {setHoveredImage(card.img_src);sethoveredDescription(card.effect);}} key={card._id} name={card.name} set={card.set} code={card.code} imageSource={card.img_src}/>
                            ))
                        }
                    </div>

                    <div className={styles.display}>
                        <img id="hoverDisplay" src={hoveredImage} alt="Hover Card" className={styles.hoverDisplay}></img>

                        <div className={styles.description}>
                            <p id="card-text" className={styles['card-text']}>{hoveredDescription}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Catalog;