import React from "react";
import styled from "styled-components";

const ScorePanel = props => {
    const { startGame, startBtn } = props;

    return (
        <ScoreContainer>
            <div className="container">
                <p>Score: <span>{JSON.parse(localStorage.getItem('gameState')).score}</span></p>
            </div>

            <div className="container">
                <button>Instructions</button>
                <button onClick={startGame} ref={startBtn}>Start Game</button>
            </div>
        </ScoreContainer>
    )
}

const ScoreContainer = styled.div`
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 2.5rem;
    margin-top: 6rem;
    margin-bottom: 3rem;
    font-weight: bold;

    .container {
        display: flex;
    }

    p {
        padding-right: 3rem;
    }

    button {
        background: transparent;
        border: none;
        outline: none;
        color: white;
        font-size: 2.5rem;
        padding-left: 3rem;
        font-weight: bold;

        &:hover {
            color: gold;
        }
    }
`

export default ScorePanel;