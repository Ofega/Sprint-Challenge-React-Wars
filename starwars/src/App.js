import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import logo from './assets/starwars-logo.png'
import Characters from './components/Characters';

const App = () => {

  const [ characters, setCharacters ] = useState([]);
  const [isLoading, setLoadingIndicator] = useState(true);
  const [ pagination, setPagination ] = useState({})

  useEffect(() => {
    axios.get('https://swapi.co/api/people/')
      .then((response) => {
        setCharacters(response.data.results);
        setPagination({
          next: response.data.results.next,
          previous: response.data.results.previous
        });
        setLoadingIndicator(false);
      })
  }, [])

  return (
    <Main onScroll={() => console.log('scrolled')}>
      <h1>
        <img src={logo} alt="Starwars Logo" />
      </h1>
      <Characters data={characters} isLoading={isLoading} />
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
