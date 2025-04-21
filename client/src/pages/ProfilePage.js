import React from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import styles from "./ProfilePage.module.css";
import placeholder from "../images/placeholder.jpg";

export default function Profile(){
    const params = useParams();
    return(
        <div className={styles.container}>
            <header className={styles.banner}>
                <div className={styles.bannerText}>Binder.io</div>
                <button id="collections" >Collections</button>
                <div className={styles.userProfile}>
                    <img src={placeholder} alt="Avatar" id="avatar" className={styles.avatar}></img>
                </div>
            </header>

            <div className={styles.contentWrapper}>
                <div className={styles.user}>
                    <img className={styles.enlargedAvatar} src={placeholder} alt="Avatar" id="enlargedAvatar"/>

                    <div className={styles.settings}>

                    </div>
                </div>

                <div className={styles.collections}>

                </div>
            </div>


        </div>
    )
}