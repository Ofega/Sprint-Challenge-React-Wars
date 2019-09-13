import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import logo from './assets/starwars-logo.png'
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
      <h1><img src={logo} alt="Starwars Logo" /></h1>

      <Characters data={characters} />
    </Main>
  );
}


// Styling
const Main = styled.div`
  height: 100%;
  max-width: 1140px;
  margin: 0 auto;
  padding: 3rem 2rem;
  font-size: 1.5rem;

  h1 {
    text-align: center;
  }
`

export default App;
