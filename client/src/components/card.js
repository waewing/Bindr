import React from "react";
import placeholder2 from "../images/BT5-112.png";


const cardFiller = ({totalCards}) => {
    const Cards = new Array(totalCards).fill(placeholder2);

    const cardStyle = {
        height: "160px",
        width: "100px",
        justifySelf: "center"
    };

    return(
        Cards.map((card, index) => (
        <img style={cardStyle}  id={index} src={card} alt={"card"+index}></img>
         ))
    );
}

export default cardFiller;
