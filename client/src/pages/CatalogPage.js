import {React,  useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import CardFiller from "../components/loadcard";
import styles from "./CatalogPage.module.css"; // Import styles
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../components/LoginButton"
import LogoutButton from "../components/LogoutButton"
import placeholder2 from "../images/placeholder2.png";

const API_URL = "http://localhost:5000/";

function Catalog() {
    const location = useLocation();
    const state = location.state;
    const [flat, setFlat] = useState([]);
    const [hoveredImage, setHoveredImage] = useState(null);
    const [hoveredDescription, sethoveredDescription] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [selectedCard, setSelectedCard] = useState(null);
    const [collectionCards, setCollectionCards] = useState([])

    const navigate = useNavigate();
    const {user, isLoading, isAuthenticated, loginWithRedirect } = useAuth0();

    useEffect(() => {
        console.log(state);
    }, [state]);

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

    function addToCollection(){
        if (!collectionCards.includes(selectedCard)){
            setCollectionCards([...collectionCards, selectedCard]);
        }
    }

    function removeFromCollection(){
        if (collectionCards.includes(selectedCard)){
            setCollectionCards(collectionCards.filter(card => card !== selectedCard));
        }
    }

    const saveCollection = async () => {
        if (!isAuthenticated) {
            return loginWithRedirect();
        }

        const collectionName = `collection${state}`;
        try {
            const response = await axios.patch(API_URL + user.sub.split('|').at(-1) + '/collections', {
                collections: {
                    [collectionName]: collectionCards
                }
            });
            console.log('Collection saved successfully:', response.data);
        } catch (error) {
            console.error('Error saving collection:', error);
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
                            [...flat].sort((a, b) => {
                                const aInCollection = collectionCards.includes(a.name + a.code);
                                const bInCollection = collectionCards.includes(b.name + b.code);
                                if (aInCollection && !bInCollection) return -1;
                                if (!aInCollection && bInCollection) return 1;
                                return 0;
                            }).map(card => (
                                <CardFiller onClick={() => {
                                    setHoveredImage(card.img_src);
                                    sethoveredDescription(card.effect);
                                    setSelectedCard(prevSelected => prevSelected === (card.name + card.code) ? null : (card.name + card.code));}} 
                                    key={card._id} name={card.name} 
                                    set={card.set} code={card.code} 
                                    imageSource={card.img_src} 
                                    color={collectionCards.includes(card.name + card.code) ? '#4CAF50' : selectedCard === (card.name + card.code) ? '#DAF7A6' : '#9699C3'}/>
                            ))
                        }
                    </div>

                    <div className={styles.display}>
                        <img id="hoverDisplay" src={hoveredImage} alt="Hover Card" className={styles.hoverDisplay}></img>

                        <div className={styles.description}>
                            <p id="card-text" className={styles['card-text']}>{hoveredDescription}</p>
                            <div className={styles.buttonContainer}>
                                <button onClick={addToCollection} className={styles.addToCollection}>Add to Collection</button>
                                <button onClick={removeFromCollection} className={styles.removeFromCollection}>Remove from Collection</button>
                                <button onClick={saveCollection} className={styles.saveCollection}>Save Collection</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Catalog;