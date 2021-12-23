import React from 'react';
import './singleCard.css';


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

    const desktop = { flex: `0 1 calc(18rem * ${scale})` }
    const tablet = { flex: `0 1 calc(12rem * ${scale})` }
    const laptop = { flex: `0 1 calc(14rem * ${scale})` }
    const mobile = { flex: `0 1 calc(6rem * ${scale})` }

    console.log(breakPoint)
    const imgScale = { 'maxHeight': `calc(12.5rem * ${scale})`, 'maxWidth': `calc(16.625rem * ${scale})` }
    return (
        <div
            style={
                (breakPoint === 'mobile' && mobile) ||
                (breakPoint === 'tablet' && tablet) ||
                (breakPoint === 'laptop' && laptop) ||
                (breakPoint === 'desktop' && desktop)

            }
            className="card">
            <div
                className={flipped ? "flipped" : ""}
            >
                <img
                    className="front"
                    src={image.src}
                    alt='card front'
                    style={imgScale}
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
