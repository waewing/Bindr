import {React} from "react";

const CardFiller = ({onClick, imageSource, name, set, code, color}) => {
    const cardStyle = {
        height: "160px",
        width: "100px",
        justifySelf: "center",
        borderRadius: "11px",
        border: `5px solid ${color}`
    };

    return(
        <img style={cardStyle} className='card' id={name} set={set} code={code} onClick={onClick} src={imageSource} alt={name} loading="lazy"></img>
    );
}

export default CardFiller;
