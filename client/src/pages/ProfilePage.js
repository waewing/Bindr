import React from 'react';
import {useParams} from 'react-router-dom';

export default function Profile(){
    const params = useParams();
    return(
        <div>
            <header>{params.id}'s Profile Page </header>
        </div>
    )
}