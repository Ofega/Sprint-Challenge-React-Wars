import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import logo from './assets/starwars-logo.png'
import Characters from './components/Characters';
import ScorePanel from './components/ScorePanel';
import { LevelEndModal, GoodByeModal } from './components/Modals';

const App = () => {

  // Set Game Constants :)
  const MIN_SCORE = 6;
  const CARDS_LIMIT = 9;
  const swapi = 'https://swapi.co/api/people/';
  const characterArray = JSON.parse(localStorage.getItem('characters')) || [];
  const howManyAnsweredCards = JSON.parse(localStorage.getItem('answeredCards')) || 0;
  const initialState = JSON.parse(localStorage.getItem('gameState')) || {
    currentScore: 0,
    previousScore: 0,
    level: 1,
    currentCharacters: swapi,
    hasStarted: false,
    doneWithLevel: false,
    min_score: 6
  };

  // Initialize App data state
  const [ characters, setCharacters ] = useState(characterArray);
  const [ error, setError ] = useState(false);
  const [ isLoading, setLoadingIndicator ] = useState(true);


  // Initialize Game State
  const [ gameEngine, setGameEngine ] = useState(initialState);
  const [ nextPage, setNextPage ] = useState(swapi);
  const [ finalEnd, setFinalEnd ] = useState(false);
  const [ answeredCards, setAnsweredCards ] = useState(howManyAnsweredCards);


  // Start Game when button is clicked.
  const startGame = () => {
    setGameEngine({
      ...gameEngine,
      hasStarted: true,
      min_score: gameEngine.min_score,
      previousScore: gameEngine.currentScore
    })
  }

  // End Game when button in modal is clicked!
  const endGame = () => {
    setGameEngine({
      previousScore: 0,
      currentScore: 0,
      level: 1,
      currentCharacters: swapi,
      hasStarted: false,
      min_score: 6,
      doneWithLevel: false
    });
    setCharacters([]);
  }


  // Reset Game when button in modal is clicked!
  const resetGame = () => {
    setGameEngine({
      previousScore: gameEngine.previousScore,
      currentScore: gameEngine.previousScore,
      level: gameEngine.level,
      min_score: gameEngine.min_score,
      currentCharacters: gameEngine.currentCharacters,
      doneWithLevel: false,
      hasStarted: false
    });
    setCharacters([]);
  }


  // Update to new level is user is above minimum score
  const changeLevel = () => {
    setGameEngine({
      previousScore: gameEngine.previousScore,
      currentScore: gameEngine.currentScore,
      level: gameEngine.level + 1,
      currentCharacters: nextPage,
      hasStarted: false,
      doneWithLevel: false,
      min_score: gameEngine.min_score + MIN_SCORE,
    });
    setCharacters([]);
  }


  // When user submit answer, update answered cards.
  const submitAnswer = () => {
    setAnsweredCards(answeredCards + 1)
  }


  // When user submit answer, if correct, increment current score.
  const addScore = () => {
    setGameEngine({
      ...gameEngine,
      currentScore: gameEngine.currentScore + 1,
    })
  }


  // Each card keeps track of its toggled state
  const toggleAnswered = id => {
    const answeredCardArr = characters.map(item => {
      if(item.id === id) {
        return Object.assign({}, item, {
          isAnswered: true
        })
      }
      return item;
    });

		setCharacters(answeredCardArr);
  }


  // Function to shuffle characters everytime new data is loaded
  const shuffle = array => {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    
    return array;
  }


  // If cards answered is cards limit, then finish level, and show modal.
  useEffect(() => {
    if(answeredCards === CARDS_LIMIT) {
      window.scrollTo(0, 0);
      setAnsweredCards(0);
      setGameEngine({
        ...gameEngine,
        doneWithLevel: true
      })
    }
  }, [answeredCards, gameEngine])


  // Everytime the array variable changes, update localStorage with the new values
  useEffect(() => {
    localStorage.setItem('gameState', JSON.stringify(gameEngine));
  }, [gameEngine])

  useEffect(() => {
    localStorage.setItem('characters', JSON.stringify(characters));
  }, [characters])

  useEffect(() => {
    localStorage.setItem('answeredCards', JSON.stringify(answeredCards));
  }, [answeredCards])
 

  // Get Data from the API
  useEffect(() => { 
    if(gameEngine.level === 3 && (gameEngine.currentScore >= gameEngine.min_score)) {
      // If game level is 3, the end game. Don't do any fetch.
      setFinalEnd(true);
    } 
    
    
    if(localStorage.getItem('characters') === '[]') {
      setLoadingIndicator(true);
      axios.get(gameEngine.currentCharacters || swapi)
        .then((response) => {
          setNextPage(response.data.next);

          // return a new array of promises.
          const newCharacterArray = response.data.results.map(async (item, index) => {      
            const values = await Promise.all([axios.get(item.homeworld), axios.get(item.species)]);
            const dataObject = values.map(item => item.data.name);

            return {
              id: index,
              name: item.name,
              hair_color: item.hair_color.toUpperCase(),
              skin_color: item.skin_color.toUpperCase(),
              gender: item.gender.toUpperCase(),
              homeworld: dataObject[0].toUpperCase(),
              species: dataObject[1].toUpperCase(),
              isAnswered: false
            }
          })

          // resolve promises and return shuffled data
          Promise.all(newCharacterArray)
            .then((response) => {
              setCharacters(shuffle(response));
              setLoadingIndicator(false);
            })
            .catch(() => {
              setLoadingIndicator(false);
              setError(true);
            })
        })
        .catch(() => {
          setLoadingIndicator(false);
          setError(true);
        })
    } else {
      setCharacters(characters);
      setLoadingIndicator(false);
    }

  }, [gameEngine.currentCharacters, gameEngine.currentScore, gameEngine.min_score, characters, gameEngine.level])
  

  return (
    <Main>
      <h1>
        <img src={logo} alt="Starwars Logo" />
      </h1>

      { !isLoading && !error ? 
          <ScorePanel 
            startGame={startGame} 
            minPassScore={gameEngine.min_score}
            hasStarted={gameEngine.hasStarted} 
            gameScore={gameEngine.currentScore} 
            gameLevel={gameEngine.level} 
          /> : null 
      }

      { characters && 
          <Characters 
            data={characters}
            cards_limit={CARDS_LIMIT}
            error={error} 
            isLoading={isLoading} 
            hasStarted={gameEngine.hasStarted} 
            addScore={addScore} 
            doneWithLevel={gameEngine.doneWithLevel}
            submitAnswer={submitAnswer} 
            toggleAnswered={toggleAnswered}
          /> 
      }

      <LevelEndModal 
        endGame={endGame}
        resetGame={resetGame}
        finalEnd={finalEnd}
        changeLevel={changeLevel}
        gameScore={gameEngine.currentScore} 
        gameLevel={gameEngine.level} 
        doneWithLevel={gameEngine.doneWithLevel}
        minPassScore={gameEngine.min_score} 
      />

      <GoodByeModal 
        endGame={endGame}
        resetGame={resetGame}
        finalEnd={finalEnd}
        gameScore={gameEngine.currentScore} 
        gameLevel={gameEngine.level} 
        doneWithLevel={gameEngine.doneWithLevel} 
      />
    </Main>
  );
}


// Styling
const Main = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  padding: 3rem;
  font-size: 1.5rem;

  h1 {
    text-align: center;
    max-width: 400px;
    margin: 0 auto;

    img {
      width: 100%;
      height: 100%;
    }
  }
`

export default App;
