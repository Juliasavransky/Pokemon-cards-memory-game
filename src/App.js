import React, { useState, useEffect } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';
import useLocalStorage from './utils/useLocalStorage';

const breakPoints = {
  mobile: '(max-width:600px)',
  tablet: '(min-width:600px) and (max-width:900px)',
  laptop: '(min-width:901px) and (max-width:1281px)',
  desktop: '(min-width:1282px)',
};

const getRandomPokemonUrl = () => {
  const randomId = Math.floor(Math.random() * 648) + 1;
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${randomId}.svg`;
};

export const shuffleArray = (array) => {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[randomIndex]] = [copy[randomIndex], copy[i]];
  }

  return copy;
};

export const createDeck = (levelLength) => {
  const uniqueCards = Array.from({ length: levelLength }, () => ({
    src: getRandomPokemonUrl(),
    matched: false,
  }));

  return shuffleArray(
    uniqueCards.flatMap((card) => [
      { ...card, id: `${card.src}-a-${Math.random().toString(16).slice(2)}` },
      { ...card, id: `${card.src}-b-${Math.random().toString(16).slice(2)}` },
    ])
  );
};

function App() {
  const [breakPoint, setBreakPoint] = useState('desktop');

  useEffect(() => {
    const updateBreakPoint = () => {
      const current = Object.entries(breakPoints).find(([, query]) =>
        window.matchMedia(query).matches
      );

      setBreakPoint(current ? current[0] : 'desktop');
    };

    updateBreakPoint();
    window.addEventListener('resize', updateBreakPoint);

    return () => window.removeEventListener('resize', updateBreakPoint);
  }, []);

  const [pokemonArray, setPokemonArray] = useState(() => createDeck(3));
  const [turns, setTurns] = useState(0);

  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const [level, setLevel] = useLocalStorage('level', 1);
  const [levelLength, setLevelLength] = useLocalStorage('levelLength', 3);
  const [heder, setHeder] = useState('Memory Game');

  const [endThisRound, setEndThisRound] = useState(false);
  const [scale, setScale] = useLocalStorage('scale', 1);
  const [score, setScore] = useLocalStorage('score', 0);

  const columns = Math.ceil(Math.sqrt(pokemonArray.length || 1));
  const effectiveColumns = breakPoint === 'mobile' ? Math.min(columns, 3) : columns;

  useEffect(() => {
    setPokemonArray(createDeck(levelLength));
    setTurns(0);
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
  }, [levelLength]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurn) => prevTurn + 1);
    setDisabled(false);
  };

  const resetLevel = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
    setDisabled(false);
  };

  const handleChoice = (image) => {
    if (choiceOne) {
      setChoiceTwo(image);
      return;
    }

    setChoiceOne(image);
  };

  useEffect(() => {
    if (!choiceOne || !choiceTwo) {
      return undefined;
    }

    setDisabled(true);

    if (choiceOne.src === choiceTwo.src) {
      setPokemonArray((prevPokemon) =>
        prevPokemon.map((pokemon) =>
          pokemon.src === choiceOne.src ? { ...pokemon, matched: true } : pokemon
        )
      );
      resetTurn();
      return undefined;
    }

    const timeoutId = setTimeout(() => resetTurn(), 1000);
    return () => clearTimeout(timeoutId);
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    if (pokemonArray.length === 0 || !pokemonArray.every((pokemon) => pokemon.matched)) {
      return undefined;
    }

    const successTimer = setTimeout(() => setHeder('Good Job! Next Level'), 1500);
    const nextRoundTimer = setTimeout(() => setEndThisRound(true), 3000);

    return () => {
      clearTimeout(successTimer);
      clearTimeout(nextRoundTimer);
    };
  }, [pokemonArray]);

  useEffect(() => {
    if (!endThisRound) {
      return undefined;
    }

    const nextLevelTimer = setTimeout(() => {
      setEndThisRound(false);
      resetLevel();
      setHeder('Memory Game');
      setLevel((prevLevel) => prevLevel + 1);
      setLevelLength((prevLevelLength) => {
        const nextLevelLength = prevLevelLength + 1;
        setPokemonArray(createDeck(nextLevelLength));
        return nextLevelLength;
      });
      setScale((prevScale) => Math.max(0.72, Number((prevScale - 0.05).toFixed(2))));
      setScore((prevScore) => prevScore + Math.floor(((pokemonArray.length / 2) / Math.max(turns, 1)) * 100));
    }, 1000);

    return () => clearTimeout(nextLevelTimer);
  }, [endThisRound, pokemonArray.length, turns, setLevel, setLevelLength, setScale, setScore]);

  useEffect(() => {
    const introTimer = setTimeout(() => setHeder(''), 3500);
    return () => clearTimeout(introTimer);
  }, [levelLength]);

  const clearHandler = () => {
    window.localStorage.clear();
    setEndThisRound(false);
    resetLevel();
    setHeder('Memory Game');
    setLevel(1);
    setLevelLength(3);
    setScale(1);
    setScore(0);
    setPokemonArray(createDeck(3));
  };

  return (
    <div
      className="game"
      style={{
        '--columns': effectiveColumns,
        '--rows': Math.ceil((pokemonArray.length || 1) / effectiveColumns),
      }}
    >
      <div className="game-shell">
        <div className="game-board">
          <div className="heder"> {heder}</div>

          <div className="card-grid">
            {pokemonArray.map((pokemon) => (
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

        <aside className="game-data" aria-label="Game stats">
          <div className="stat">
            <span>Turns</span>
            <strong>{turns}</strong>
          </div>
          <div className="stat">
            <span>Level</span>
            <strong>{level}</strong>
          </div>
          <div className="stat">
            <span>Score</span>
            <strong>{score}</strong>
          </div>
          <button type="button" className="btn" onClick={clearHandler} aria-label="Clear game">
            <span>Clear</span>
            C
          </button>
        </aside>
      </div>
    </div>
  );
}

export default App;

