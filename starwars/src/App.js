import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import logo from './assets/starwars-logo.png'
import Characters from './components/Characters';
import ScorePanel from './components/ScorePanel';

const App = () => {

  const startBtn = useRef();
  const [ placeholderArray, setplaceholderArray ] = useState([]);
  const [ characters, setCharacters ] = useState([]);
  const [ isLoading, setLoadingIndicator ] = useState(true);

  const [ gameEngine, setGameEngine ] = useState({
    score: 0,
    level: 1,
    answeredCards: 0,
    hasStarted: false,
    doneWithLevel: false
  })

  const startGame = () => {
    setGameEngine({
      ...gameEngine,
      hasStarted: true
    })

    startBtn.current.remove();
  }

  const addPoints = () => {
    setGameEngine({
      ...gameEngine,
      score: gameEngine.score + 1
    })
  }

  useEffect(() => {
    localStorage.setItem('gameState', JSON.stringify(gameEngine));
  }, [gameEngine])
 

  useEffect(() => {
    if(placeholderArray.length === 0) {
      axios.get('https://swapi.co/api/people/')
        .then((response) => {
          setplaceholderArray(response.data.results);
        })
    } else {
      const newCharacterArray = placeholderArray.map(async item => {      
        const values = await Promise.all([axios.get(item.homeworld), axios.get(item.species)]);
        const dataObject = values.map(item => item.data.name);

        return {
          name: item.name,
          hair_color: item.hair_color.toUpperCase(),
          skin_color: item.skin_color.toUpperCase(),
          gender: item.gender.toUpperCase(),
          homeworld: dataObject[0].toUpperCase(),
          species: dataObject[1].toUpperCase(),
        }
      })

      Promise.all(newCharacterArray)
        .then((response) => {
          setCharacters(response);
          setLoadingIndicator(false);
        })
    }
  }, [placeholderArray])

  return (
    <Main onScroll={() => console.log('scrolled')}>
      <h1>
        <img src={logo} alt="Starwars Logo" />
      </h1>
      { !isLoading ? <ScorePanel gameScore={gameEngine.score} timer={gameEngine.timer} startGame={startGame} startBtn={startBtn} /> : null }
      { characters && <Characters data={characters} isLoading={isLoading} hasStarted={gameEngine.hasStarted} addPoints={addPoints} /> }
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
