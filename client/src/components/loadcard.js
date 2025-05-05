import {React, lazy} from "react";

const CardFiller = ({onClick, imageSource, name, set, code}) => {
    const cardStyle = {
        height: "160px",
        width: "100px",
        justifySelf: "center"
    };

    return(
        <img style={cardStyle} className='card' id={name} set={set} code={code} onClick={onClick} src={imageSource} alt={name} loading="lazy"></img>
    );
}

export default CardFiller;
