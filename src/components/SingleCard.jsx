import React from 'react';
import './singleCard.css';


const SingleCard = ({
    image,
    handleChoice,
    flipped,
    disabled,
    scale

}) => {

    const handleClick = () => {
        if (!disabled) {
            handleChoice(image)
        }
    }
    return (
        <div
            style={{
                flex: `0 1 calc(16rem * ${scale})`
            }}
            className="card">
            <div
                className={flipped ? "flipped" : ""}
            >
                <img
                    className="front"
                    src={image.src}
                    alt='card front'
                    style={{ 'maxHeight': `calc(200px * ${scale})`, 'maxWidth': `calc(250px * ${scale})` }}
                />
                <img
                    className="back"
                    src="https://www.logopik.com/wp-content/uploads/edd/2018/07/Pokeball-Vector-Logo.png"
                    alt="card caver"
                    onClick={handleClick}
                />
            </div>

        </div>
    )


}

export default SingleCard
