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

    const mobile = { flex: `0 1 calc(11rem * ${scale})` }
    const tablet = { flex: `0 1 calc(16rem * ${scale})` }
    const laptop = { flex: `0 1 calc(18rem * ${scale})` }
    const desktop = { flex: `0 1 calc(24rem * ${scale})` }

    const imgMobile = { 'maxHeight': `calc(9rem * ${scale})`, 'maxWidth': `calc(11rem * ${scale})` }
    const imgTablet = { 'maxHeight': `calc(12.5rem * ${scale})`, 'maxWidth': `calc(16rem * ${scale})` }
    const imgLaptop = { 'maxHeight': `calc(14rem * ${scale})`, 'maxWidth': `calc(18rem * ${scale})` }
    const imgDesktop = { 'maxHeight': `calc(18rem * ${scale})`, 'maxWidth': `calc(24rem * ${scale})` }

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
                    decoding='async'
                    className="front"
                    src={image.src}
                    alt='card front'
                    style={
                        (breakPoint === 'mobile' && imgMobile) ||
                        (breakPoint === 'tablet' && imgTablet) ||
                        (breakPoint === 'laptop' && imgLaptop) ||
                        (breakPoint === 'desktop' && imgDesktop)

                    }
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
