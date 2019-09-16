import React, { useState } from "react";
import styled from "styled-components";
import { InstructionModal } from './Modals';

const ScorePanel = props => {
    const { startGame, minPassScore, gameScore, gameLevel, hasStarted } = props;
    const [ isInstructionClicked, setInstructionClicked ] = useState(false)

    const handleInstructionClicked = () => {
        setInstructionClicked(!isInstructionClicked);
    }

    return (
        <>
            <ScoreContainer>
                <div className="container">
                    <p>Level: <span>{gameLevel}</span></p>
                    <p>Score: <span>{gameScore}</span></p>
                </div>

                <div className="container">
                    <button onClick={handleInstructionClicked}>Instructions</button>
                    {
                        !hasStarted ? 
                            <button onClick={startGame}>Start Game</button>
                        : null
                    }
                </div>
            </ScoreContainer>

            <InstructionModal minPassScore={minPassScore} isInstructionClicked={isInstructionClicked} handleInstructionClicked={handleInstructionClicked} />
        </>
    )
}

const ScoreContainer = styled.div`
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.8rem;
    margin-top: 6rem;
    margin-bottom: 3rem;
    font-weight: bold;
    flex-wrap: wrap;

    @media (min-width: 750px) {
        font-size: 2.5rem;
    }

    .container {
        display: flex;
        max-width: 300px;
        margin: 0 auto;
        width: 100%;

        @media (min-width: 600px) {
            max-width: 100%;
            margin: 0;
            width: auto;
        }
    }

    p {
        padding-right: 3rem;
    }

    button {
        background: transparent;
        border: none;
        outline: none;
        color: white;
        padding-left: 3rem;
        font-weight: bold;
        padding-top: 2rem;
        font-size: 1.8rem;

        &:nth-of-type(1) {
            padding-left: 0
        }

        @media (min-width: 600px) {
            padding-top: 0
        }

        @media (min-width: 750px) {
            font-size: 2.5rem;
        }

        &:hover {
            color: gold;
        }
    }
`

export default ScorePanel;