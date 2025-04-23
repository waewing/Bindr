import React from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../components/LoginButton"
import styles from "./LoginPage.module.css";
 

export default function Login(){
    const params = useParams();
    const navigate = useNavigate();

    function toProfile(){
        navigate('/profile/1');
    }
    
    return(
        <div className={styles.container}>
            <div className={styles['login-box']}>
                <header>Welcome Back!</header>
                <header>Log In</header>
                
                <div className={styles.username}>
                    <p>Username / Email:</p>
                    <input className={styles.input} id='username'/>
                </div>
                
                <div className={styles.password}>
                    <p>Password:</p>
                    <input className={styles.input} id='password'/>
                </div>

                <div className={styles.submit}>
                    <LoginButton/>
                </div>
                
            </div>            
        </div>
    )
}

