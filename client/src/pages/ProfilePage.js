import {React,  useState, useEffect, useRef } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./ProfilePage.module.css";
import placeholder from "../images/placeholder.jpg";

const API_URL = "http://localhost:5000/";

export default function Profile(){
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [hasProfile, setProfileStatus] = useState(false);
    const [profileInfo, setProfileInfo] = useState([]);
    const [profileImage, setProfileImage] = useState("");
    const navigate = useNavigate();
    const fileInput = useRef(null);

    //Load in profile information from db
    useEffect(() => {
        const runProfileCheck = async () => {
            try {
                const res = await axios.get(API_URL + user.sub.split('|')[1]);
                if(res.data){
                    setProfileStatus(true);
                    setProfileInfo(res.data);
                }
            } catch (err) {
                try {
                    await axios.post(API_URL + user.sub.split('|')[1], {
                        userID: user.sub,   //Auth0 ID
                        displayName: user.name,
                        profileImagePath: placeholder,
                        email: user.email,
                    });
                    setProfileImage(placeholder);

                } catch (err) {
                    console.error('Error creating profile:', err);
                }
            }
        };
    
        if (!isLoading && isAuthenticated && !hasProfile) {
            runProfileCheck();
        }
    }, [isLoading, isAuthenticated, user]);

    //When profile information is loaded in load profile image saved
    useEffect(() => {
        setProfileImage(profileInfo.profileImagePath);
    }, [profileInfo])

    
    //Handle Profile Image update
    const handleButtonClick = () => {
      fileInput.current.click();
    };
  
    const handleFileChange = (event) => {
      const selectedFile = event.target.files[0].path || URL.createObjectURL(event.target.files[0]);
      if (selectedFile) {
        // Handle the selected file here
        setProfileImage(selectedFile);
      }
    };

    useEffect(() => {
        if (user){
        const updateAvatar = async () => {
            try {
                const res = await axios.patch(API_URL + user.sub.split('|')[1] + '/avatar', {
                    profileImagePath: profileImage,
                });
                
            } catch(err){
                console.error('Error updating profile:', err);
            }
        };

        updateAvatar();
    }
    }, [profileImage])

    

    //Navigate to catalog
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
                    <img src={profileImage} alt="Avatar" id="avatar" className={styles.avatar}></img>
                </div>
            </header>

            <div className={styles.contentWrapper}>
                <div className={styles.user}>
                    <img className={styles.enlargedAvatar} src={profileImage} alt="Avatar" id="enlargedAvatar"/>

                    <div className={styles.settings}>
                        <span className={styles.changeNameText}>Username:</span>
                        <input className={styles.changeName} placeholder={user.name}/>
                        <button className={styles.submitName}>Submit</button>

                        <span className={styles.changePasswordText}>Password:</span>
                        <input className={styles.changePassword} placeholder={"******************"}/>
                        <button className={styles.submitPassword}>Submit</button>

                        <span className={styles.changeEmailText}>Email:</span>
                        <input className={styles.changeEmail} placeholder={user.email}/>
                        <button className={styles.submitEmail}>Submit</button>

                        <span className={styles.changeProfile}>Change Profile:</span>
                        <button className={styles.browse} onClick={handleButtonClick}>Browse...</button>
                        <input type="file" style={{ display: 'none' }} ref={fileInput} onChange={handleFileChange}/>

                    </div>
                </div>

                <div className={styles.collections}>

                </div>
            </div>


        </div>
        ))
}