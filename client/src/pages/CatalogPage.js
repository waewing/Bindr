import {React,  useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CardFiller from "../components/loadcard";
import styles from "./CatalogPage.module.css"; // Import styles
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../components/LoginButton"
import LogoutButton from "../components/LogoutButton"
import placeholder2 from "../images/placeholder2.png";

const API_URL = "http://localhost:5000/";

function Catalog() {
    const [flat, setFlat] = useState([]);
    const [hoveredImage, setHoveredImage] = useState(null);
    const [hoveredDescription, sethoveredDescription] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [selectedCard, setSelectedCard] = useState(null);

    const navigate = useNavigate();
    const {user, isLoading, isAuthenticated, loginWithRedirect } = useAuth0();

    useEffect(() => {
        axios.get(API_URL)
            .then(res => {
                setFlat(res.data.flat());
                setHoveredImage(res.data.flat()[0].img_src);
                sethoveredDescription(res.data.flat()[0].effect);
            })

            .catch(err => 
                console.error(err)
            );
    }, []);

    useEffect(() => {
        const runProfileCheck = async () => {
            try {
                const res = await axios.get(API_URL + user.sub.split('|').at(-1));
                if(res.data){
                    setProfileImage(res.data.profileImagePath);
                }
            } catch (err) {
                console.error('Error creating profile:', err);
                }
            }
        
        if (!isLoading && isAuthenticated) {
            runProfileCheck();
        }
        }, [isLoading, isAuthenticated, user]);


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

    function toProfile(){
        if(isAuthenticated){
            navigate('/profile');
        }
        else{
            return loginWithRedirect();
        }
    }

    return (
        <div>
            <div className={styles.container}>
                <header className={styles.banner}>
                    <div className={styles.bannerText}>Binder.io</div>
                    <LoginButton/>
                    <LogoutButton/>
                    <div className={styles.userProfile}>
                        <img src={isAuthenticated ? profileImage : placeholder2} onClick={toProfile} alt="Avatar" id="avatar" className={styles.avatar}></img>
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
                                <CardFiller onClick={() => {
                                    setHoveredImage(card.img_src);
                                    sethoveredDescription(card.effect);
                                    setSelectedCard(prevSelected => prevSelected === (card.name + card.code) ? null : (card.name + card.code));}} 
                                    key={card._id} name={card.name} 
                                    set={card.set} code={card.code} 
                                    imageSource={card.img_src} 
                                    color={selectedCard === (card.name + card.code) ? '#4CAF50' : '#9699C3'}/>
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