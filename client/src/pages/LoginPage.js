import React from 'react';
import {useParams} from 'react-router-dom';
 
export default function Login(){
    const params = useParams();
    return(
        <div>
            <header>Login Page </header>
        </div>
    )
}