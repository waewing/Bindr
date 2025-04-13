import React from "react";

const cardFiller = ({onClick, alt, imageSource,}) => {
    const cardStyle = {
        height: "160px",
        width: "100px",
        justifySelf: "center"
    };

    return(
        <img style={cardStyle} onClick={onClick} src={imageSource} alt={"card"+alt}></img>
    );
}

export default cardFiller;
