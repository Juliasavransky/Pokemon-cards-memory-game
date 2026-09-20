import React from 'react';
import './singleCard.css';
import logo from '../utils/img/logo.png';

const SingleCard = ({
    image,
    handleChoice,
    flipped,
    disabled,
    scale,
    breakPoint

}) => {

    const handleClick = () => {
        if (!disabled) {
            handleChoice(image)
        }
    }

    const cardSize = {
        transform: `scale(${Math.max(0.55, scale)})`,
    };

    return (
        <div className="card" style={cardSize}>
            <div className={flipped ? 'flipped' : ''}>
                <img
                    decoding='async'
                    className="front"
                    src={image.src}
                    alt='card front'
                />
                <img
                    className="back"
                    src={logo}
                    alt="card caver"
                    onClick={handleClick}
                />
            </div>
        </div>
    );


}

export default SingleCard
