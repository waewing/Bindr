import React from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./ProfilePage.module.css";
import placeholder from "../images/placeholder.jpg";

export default function Profile(){
    const params = useParams();
    const navigate = useNavigate();
    function toCatalog(){
        navigate('/');
    }
    
    const {user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
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
                        <p>{user.name}</p>
                    </div>
                </div>

                <div className={styles.collections}>

                </div>
            </div>


        </div>
        ))
}