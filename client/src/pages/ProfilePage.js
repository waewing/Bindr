import {React,  useState, useEffect, useRef } from "react";
import AWS from 'aws-sdk';
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./ProfilePage.module.css";
import placeholder from "../images/placeholder.jpg";

const API_URL = "http://localhost:5000/";

const S3_BUCKET = 'binderprofile-images';
const REGION = 'us-east-2';

AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    region: REGION
});

const s3 = new AWS.S3();

export default function Profile(){
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [hasProfile, setProfileStatus] = useState(false);
    const [profileImage, setProfileImage] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [collections, setCollections] = useState([]);
    const navigate = useNavigate();
    const fileInput = useRef(null);
    const isInitialMount = useRef(true);

    //Load in profile information from db
    useEffect(() => {
        const runProfileCheck = async () => {
            try {
                const res = await axios.get(API_URL + user.sub.split('|').at(-1));
                if(res.data){
                    console.log(res.data);
                    setProfileStatus(true);
                    setProfileImage(res.data.profileImagePath);
                    setDisplayName(res.data.displayName);
                    setEmail(res.data.email);
                    setCollections(res.data.collections)
                }
            } catch (err) {
                try {
                    await axios.post(API_URL + user.sub.split('|').at(-1), {
                        userID: user.sub,   //Auth0 ID
                        displayName: user.name,
                        profileImagePath: placeholder,
                        email: user.email,
                        collections: {}
                    });
                    setProfileImage(placeholder);

                } catch (err) {
                    console.error('Error creating profile:', err);
                }
            }
            isInitialMount.current = false;
        };
    
        if (!isLoading && isAuthenticated && !hasProfile) {
            runProfileCheck();
        }
    }, [isLoading, isAuthenticated, user, hasProfile]);

    
    //Handle Profile Image update
    const handleButtonClick = () => {
      fileInput.current.click();
    };
  
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
    
        try {
            // Create a unique file name
            const fileName = `${user.sub.split('|').at(-1)}/${file.name}`;
            
            // Upload to S3
            const uploadParams = {
                Bucket: S3_BUCKET,
                Key: fileName,
                Body: file,
                ContentType: file.type,
            };
    
            const uploadResult = await s3.upload(uploadParams).promise();
            
            // Update the profile image in your database
            try {
                await axios.patch(API_URL + user.sub.split('|').at(-1) + '/avatar', {
                    profileImagePath: uploadResult.Location, // This is the S3 URL
                });
                
                // Update the local state
                setProfileImage(uploadResult.Location);
            } catch (err) {
                console.error('Error updating avatar in database:', err);
            }
        } catch (err) {
            console.error('Error uploading to S3:', err);
        }
    };

    useEffect(() => {
        if(isInitialMount.current){
            return;
        }

        const updateAvatar = async () => {
            try {
                    await axios.patch(API_URL + user.sub.split('|').at(-1) + '/avatar', {
                    profileImagePath: profileImage,
                });
                
            } catch(err){
                console.error('Error updating avatar:', err);
            }
        };

        updateAvatar();
    }, [profileImage, user])

    
    const handleNameChange = (event) => {
        setDisplayName(event.target.value);
    }

    const nameChange = () => {
        if(isInitialMount.current){
            return;
        }
        try {
                axios.patch(API_URL + user.sub.split('|').at(-1) + '/name', {
                displayName: displayName,
            });
        } catch (err) {
            console.error('Error updating display name:', err);
        }
    }


    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const emailChange = () => {
        if(isInitialMount.current){
            return;
        }
        try {
                axios.patch(API_URL + user.sub.split('|').at(-1) + '/email', {
                email: email,
            });
        } catch (err) {
            console.error('Error updating email:', err);
        }
    }

    //Navigate to catalog via catalog button
    function toCatalog(){
        navigate('/');
    }

    //Navigate to catalog via collection
    function toCatalogCollection(){
        let collectionNumber;
        collections ? collectionNumber = Object.keys(collections).length : collectionNumber = 0;
        navigate('/', {state: collectionNumber});
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }



    return(
        isAuthenticated && (
        <div className={styles.container}>
            <header className={styles.banner}>
                <div className={styles.bannerText}>Binder.io</div>
                <button id="catalog" onClick={toCatalog}>Catalog</button>
                <div className={styles.userProfile}>
                    <img src={profileImage} alt="Avatar" id="avatar" className={styles.avatar}></img>
                </div>
            </header>

            <div className={styles.contentWrapper}>
                <div className={styles.user}>
                    <img className={styles.enlargedAvatar} src={profileImage} alt="Avatar" id="enlargedAvatar"/>

                    <div className={styles.settings}>
                        <span className={styles.changeNameText}>Username:</span>
                        <input className={styles.changeName}  onChange={handleNameChange} placeholder={displayName}/>
                        <button className={styles.submitName} onClick={nameChange}>Submit</button>

                        {/* <span className={styles.changePasswordText}>Password:</span>
                        <input className={styles.changePassword} placeholder={"******************"}/>
                        <button className={styles.submitPassword}>Submit</button> */}

                        <span className={styles.changeEmailText}>Email:</span>
                        <input className={styles.changeEmail} onChange={handleEmailChange} placeholder={email}/>
                        <button className={styles.submitEmail} onClick={emailChange}>Submit</button>

                        <span className={styles.changeProfile}>Change Profile:</span>
                        <button className={styles.browse} onClick={handleButtonClick}>Browse...</button>
                        <input type="file" style={{ display: 'none' }} ref={fileInput} onChange={handleFileChange}/>

                    </div>
                </div>

                <div className={styles.collections}>
                        <button className={styles.addNewCollection} onClick={toCatalogCollection}>Add New Collection</button>
                </div>
            </div>


        </div>
        ))
}