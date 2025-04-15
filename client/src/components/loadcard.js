import React from "react";

const cardFiller = ({onClick, imageSource, name, set, code}) => {
    const cardStyle = {
        height: "160px",
        width: "100px",
        justifySelf: "center"
    };

    return(
        <img style={cardStyle} className='card' id={name} set={set} code={code} onClick={onClick} src={imageSource} alt={name}></img>
    );
}

export default cardFiller;
