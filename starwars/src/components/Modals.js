import React from 'react';
import styled from 'styled-components';

export const LevelEndModal = props => {
    const { endGame, resetGame, minPassScore, finalEnd, changeLevel, doneWithLevel, gameScore, gameLevel } = props;

    return (
        doneWithLevel && !finalEnd ?
            <Modal>
                <div className="modal-container">
                    {
                        gameScore >= minPassScore ? 
                            <>
                                <div className="text-container">
                                    <h1>You're Amazing!!!</h1>
                                    <p className="summary">Congratulations! You've proved to be a worthy Star Wars Guru.</p>
                                    
                                    <div className="stats">
                                        <p>Level: <span>{gameLevel}</span></p>
                                        <p>Score: <span>{gameScore}</span></p>
                                    </div>
                                </div>
                                
                                <div className="button-container">
                                    <button onClick={endGame}>End Game</button>
                                    <button onClick={resetGame}>Reset Level</button>
                                    <button onClick={changeLevel}>Next Level</button>
                                </div>
                            </>
                        :
                            <>
                                <div className="text-container">
                                    <h1>Awwn!</h1>
                                    <p className="summary">Your score is below the minimum score, ({minPassScore}). Don't feel bad. Try your luck again?</p>

                                    <div className="stats">
                                        <p>Level: <span>{gameLevel}</span></p>
                                        <p>Score: <span>{gameScore}</span></p>
                                    </div>
                                </div>
                                
                                <div className="button-container">
                                    <button onClick={endGame}>End Game</button>
                                    <button onClick={resetGame}>Reset Level</button>
                                </div>
                            </>
                    }
                </div>
            </Modal>
        : null
    )
}

export const GoodByeModal = props => {
    const { endGame, resetGame, finalEnd, doneWithLevel, gameScore, gameLevel } = props;

    return (
        doneWithLevel && finalEnd ?
            <Modal>
                <div className="modal-container">
                    <div className="text-container">
                        <h1>Glorious!!!</h1>
                        <p className="summary">Congratulations! You've survived all three rounds, thanks for playing.</p>
                        
                        <div className="stats">
                            <p>Level: <span>{gameLevel}</span></p>
                            <p>Score: <span>{gameScore}</span></p>
                        </div>
                    </div>
                    
                    <div className="button-container">
                        <button onClick={endGame}>End Game</button>
                        <button onClick={resetGame}>Reset Level</button>
                    </div>
                </div>
            </Modal>
        : null
    )
}

export const InstructionModal = props => {
    const { minPassScore, isInstructionClicked, handleInstructionClicked } = props;

    return (
        isInstructionClicked ?
            <Modal>
                <div className="modal-container longer">
                    <button className="close-btn" onClick={handleInstructionClicked}>Close</button>
                    <p className="instruction">To win points, guess the correct star wars character based on the character stats provided. Write your answer in the input field. If you score above {minPassScore}, you get to advance to the next level!</p>
                </div>
            </Modal>
        : null
    )
}

const Modal = styled.div`
    position: fixed;
    top: 0;
    background: rgba(0, 0, 0, .5);
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1.5rem;

    .modal-container {
        max-width: 400px;
        width: 100%;
        min-height: 200px;
        background: #fff;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 3rem 3rem 3rem;

        &.longer {
            max-width: 650px;
        }

        .close-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            color: #000;
            background: #fff;
            border: 1px solid #000;
            outline: none;
            padding: .75rem 1.5rem;

            &:hover {
                color: white;
                background: black;
            }
        }

        .instruction {
            margin-top: 2rem;
            font-size: 1.7rem;
            text-align: center;
            line-height: 1.4;
        }
    }

    .text-container {
        margin-bottom: 1rem;
        text-align: center;

        h1 {
            font-size: 3rem;
        }

        p.summary {
            margin-top: 1rem;
            font-size: 1.4rem;
            max-width: 250px;
        }

        .stats {
                width: 100%;
    margin-top: 2rem;
    display: flex;
    justify-content: center;

            p {
                font-weight: 600;
                margin-left: 1.5rem;
                font-size: 2rem;

                &:nth-of-type(1) {
                    margin-left: 0;
                }
            }
        }
    }

    .button-container {
        display: flex;
        flex-direction: column;
        align-items: center; 
        width: 100%;
        max-width: 250px;

        button {
            color: #000;
            background: #fff;
            border: 1px solid #000;
            outline: none;
            padding: .75rem 1.5rem;
            min-width: 100%;
            margin-top: 2rem;
            min-height: 40px;

            &:hover {
                color: white;
                background: black;
            }
        }
    }
`