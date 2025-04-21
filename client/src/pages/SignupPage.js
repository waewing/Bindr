import React from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import styles from "./SignupPage.module.css";
 
export default function SignUp(){
    const params = useParams();
    const navigate = useNavigate();

    function toProfile(){
        navigate('/profile/1');
    }
    return(
        <div className={styles.container}>
            <div className={styles['login-box']}>
                <header>Welcome!</header>
                <header>Sign Up</header>
                
                <div className={styles.username}>
                    <p>Username / Email:</p>
                    <input className={styles.input} id='username'/>
                </div>
                
                <div className={styles.password}>
                    <p>Password:</p>
                    <input className={styles.input} id='password'/>
                </div>

                <div className={styles.password}>
                    <p>Verify Password:</p>
                    <input className={styles.input} id='verify-password'/>
                </div>

                <div className={styles.submit}>
                    <button id='log-in-button' onClick={toProfile}>Sign Up</button>
                </div>
            </div>            
        </div>
    )
}