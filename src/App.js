import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';
import useLocalStorage from './utils/useLocalStorage';
import breakPointsObserver from './utils/breakPointsObserver'

const breakPoints = {
  mobile: "(max-width:600px)",
  tablet: "(min-width:600px) and (max-width:769px)",
  laptop: "(min-width:770px) and (max-width:1024px)",
  desktop: "(min-width:1025px)",
}

function App() {

  const [breakPoint, isBreakPoint] = useState();
  useEffect(()=>{
    breakPointsObserver(breakPoints, isBreakPoint)
  },[breakPoint]) //media query hook
  
  const [newArray, setNewArray] = useState([]);//Initial array 
  const [pokemonArray, setPokemonArray] = useState([]);// img array
  const [turns, setTurns] = useState(0);

  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const [level, setLevel] = useLocalStorage('level', 1);
  const [levelLength, setLevelLength] = useLocalStorage('levelLength', 3);//1/2 cards in the game
  const [heder, setHeder] = useState("Memory Game");//heder for the page

  const [endThisRound, setEndThisRound] = useState(false);//end of the round = all cards open
  const [scale, setScale] = useLocalStorage('scale', 1);//scale of the cards getting smaller etch round
  const [score, setScore] = useLocalStorage('score', 0);


  //generate the array of cards
  useMemo(() => {
    let pokemonGenerate = [];
    for (let i = 0; i < levelLength; i++) {
      pokemonGenerate[i] = {
        src: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${Math.floor((Math.random() * 648) + 1)}.svg`,
        matched: false,
      }
    }
    setNewArray(pokemonGenerate);
  }, [levelLength])

  // sorting the cards
  const shuffleCards = () => {
    let dabbledArr = [...newArray, ...newArray]
    let numberOfItems = dabbledArr.length, arrItem, randomPlace;
    // While there remain elements to shuffle…
    while (numberOfItems) {
      // Pick a remaining element…
      randomPlace = Math.floor(Math.random() * numberOfItems--)
      // And swap it with the current element.
      arrItem = dabbledArr[numberOfItems];
      dabbledArr[numberOfItems] = dabbledArr[randomPlace]
      dabbledArr[randomPlace] = arrItem
    }
    const shuffleArr = dabbledArr.map(item => ({ ...item, id: Math.floor(Math.random() * 1000) }))
    setPokemonArray(shuffleArr)
    setTurns(0)
    setChoiceOne(null)
    setChoiceTwo(null)
  }

  //handle a choice
  const handleChoice = (image) => {
    choiceOne
      ? setChoiceTwo(image)
      : setChoiceOne(image)
  }

  //matching cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setPokemonArray(prevPokemon => {
          return prevPokemon.map(pokemon => {
            if (pokemon.src === choiceOne.src) {
              return { ...pokemon, matched: true }
            } else {
              return pokemon
            }
          })
        })
        resetTurn()
      }
      else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])


  //setting for the new turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurn => prevTurn + 1)
    setDisabled(false)
  }

  //setting for the new level/round
  const resetLevel = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(0)
    setDisabled(false)
  }

  //Chekiang if this round is over and moving to the next round
  useEffect(() => {
    let matchedChecker = pokemonArray.every((pokemon) => {
      return pokemon.matched === true
    })

    if (turns && matchedChecker === true) {
      setTimeout(() => setEndThisRound(true), 3000)
      setTimeout(() => setHeder("Good Job! Next Level"), 1500)

    }
    return () => clearTimeout()
  }, [pokemonArray, turns])

  //starting new round more cards 
  useEffect(() => {
    if (endThisRound) {
      setEndThisRound(false)
      resetLevel()
      setLevel(prevLevel => prevLevel + 1)
      setLevelLength(prevLevelLength => prevLevelLength + 1)
      setScale(prevScale => prevScale - 0.075)
      setScore(prevScore => prevScore + Math.floor(((pokemonArray.length / 2) / turns) * 100))
      shuffleCards()
    }
  }, [endThisRound])

  //starting the game automatically
  useEffect(() => {
    shuffleCards()
    setTimeout(() => setHeder(""), 3500)
    return () => clearTimeout()

  }, [levelLength])


  return (
    <div className="game">
      <div className="heder"> {heder}</div>
      <div className="game-data">
        <div>Turns: {turns}</div>
        <div>Level: {level}</div>
        <div>Score: {score}</div>
      </div>

      <div className="card-grid">
        {pokemonArray.map(pokemon => (
          <SingleCard
            image={pokemon}
            key={pokemon.id}
            handleChoice={handleChoice}
            flipped={pokemon === choiceOne || pokemon === choiceTwo || pokemon.matched}
            disabled={disabled}
            scale={scale}
            breakPoint={breakPoint}
          />
        ))}
      </div>

    </div>
  );
}

export default App;

