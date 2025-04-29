import {React,  useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./ProfilePage.module.css";
import placeholder from "../images/placeholder.jpg";

const API_URL = "http://localhost:5000/";

export default function Profile(){
    const [name, setUserName] = useState("");
    const [profileInformation, setProfileInformation] = ([]);
    const { user, isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        const addProfile = async () => {
            try {
                await axios.post(API_URL + user.sub.split('|')[1], {
                    userID: user.sub,        // Auth0 user ID (e.g., auth0|abc123)
                    displayName: user.name
                });
            } catch (err) {
                console.error('Error creating profile:', err);
            }
        };

        if (!isLoading && isAuthenticated) {
            addProfile();
        }
    }, [isLoading, isAuthenticated, user]); // Depend on auth state

    

    function toCatalog(){
        navigate('/');
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }



    return(
        isAuthenticated && (
        <div className={styles.container}>
            <header className={styles.banner}>
                <div className={styles.bannerText}>Binder.io</div>
                <button id="collections" onClick={toCatalog}>Collections</button>
                <div className={styles.userProfile}>
                    <img src={placeholder} alt="Avatar" id="avatar" className={styles.avatar}></img>
                </div>
            </header>

            <div className={styles.contentWrapper}>
                <div className={styles.user}>
                    <img className={styles.enlargedAvatar} src={placeholder} alt="Avatar" id="enlargedAvatar"/>

                    <div className={styles.settings}>
                        <p>{user.sub.split('|')[1]}</p>
                    </div>
                </div>

                <div className={styles.collections}>

                </div>
            </div>


        </div>
        ))
}