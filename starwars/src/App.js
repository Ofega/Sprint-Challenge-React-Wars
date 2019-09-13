import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Characters from './components/Characters';

const App = () => {

  const [ characters, setCharacters ] = useState([]);

  useEffect(() => {
    axios.get('https://swapi.co/api/people/')
      .then((response) => {
        setCharacters(response.data.results);
      })

  }, [])

  return (
    <Main>
      <h1>React Wars</h1>

      <Characters data={characters} />
    </Main>
  );
}


// Styling
const Main = styled.div`
  border: 2px solid red;
  height: 100vh;
  overflow-y: hidden;
  max-width: 1140px;
  margin: 0 auto;
  padding: 3rem 2rem;
  font-size: 1.5rem;
  background-image: url("img_parallax.jpg");
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  h1 {
    text-align: center;
  }
`

export default App;
