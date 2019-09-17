import React, { useState } from 'react';
import styled from 'styled-components';
import LoadingIndicator from "./LoadingIndicator";

const Character = props => {
	const { 
		id,
		name,
		hair_color, 
		skin_color, 
		gender, 
		homeworld, 
		hasStarted,
		species, 
		addScore,
		submitAnswer,
		isAnswered,
		toggleAnswered
	} = props;


	// Individaual Cards are managing their own state.
	const [ inputValue, setInputValue ] = useState('');
	const [ answer, setAnswer ] = useState('');

	
	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	}

	const handleSubmit = (e) => {
		const valueOfInput = inputValue.replace(/-|\s/g,"").toUpperCase();
		const characterName = name.replace(/-|\s/g,"").toUpperCase();

		e.preventDefault();
		toggleAnswered(id);

		submitAnswer();

		if( valueOfInput === characterName ) {
			addScore();
			setAnswer('right');
		} else {
			setAnswer('wrong');
		}

		setInputValue('');
	}

	return (
		<Item>
			<div className="content-wrapper">
				{
					hasStarted ?
						!isAnswered ?
							<div>
								<div className="character-stats">
									<p>HAIR COLOR: <span>{hair_color}</span></p>	
									<p>SKIN COLOR: <span>{skin_color}</span></p>	
									<p>GENDER: <span>{gender}</span></p>	
									<p>SPECIES: <span>{species}</span></p>	
									<p>HOME WORLD: <span>{homeworld}</span></p>	
								</div>
								<form onSubmit={handleSubmit}>
									<input type="text" onChange={handleInputChange} value={inputValue} />
								</form>
							</div> 
						:
							<div className="show-answer">
								<h3>{answer === 'right' ? 'You win!' : 'You lose!'}</h3>
								<p>The Answer is <span>{name.toUpperCase()}</span></p>
								<p className="score-addition">{answer === 'right' ? '+1' : '+0'}</p>
							</div>
					: null
			}
			</div>
		</Item>
	)
}


const Characters = props => {
	const { 
		data, 
		error,
		isLoading,
		submitAnswer,
		addScore,
		cards_limit,
		hasStarted,
		toggleAnswered
	} = props;

	return (
		<List>
			{ 
				isLoading ? 
					<LoadingIndicator /> :
						error ?
							<Error>Seems like the server is down. Please refresh the page :)</Error>
						: 
							data.slice(0, cards_limit).map(({ id, name, hair_color, skin_color, gender, homeworld, species, isAnswered }) => <Character 
									key={id} 
									id={id}
									name={name}
									gender={gender} 
									species={species} 
									homeworld={homeworld} 
									hair_color={hair_color}
									skin_color={skin_color}
									hasStarted={hasStarted}
									addScore={addScore}
									submitAnswer={submitAnswer}
									isAnswered={isAnswered}
									toggleAnswered={toggleAnswered}
								/>) 
			}
		</List>
	)
}


// Styling

const Error = styled.h2`
  min-height: 300px;
  display: flex;
  align-items: center;
  max-width: 500px;
  color: #fff;
  line-height: 1.4;
  margin: 0 auto;
  text-align: center;
  font-size: 3rem;
`

const List = styled.ul`
	list-style-type: none;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	max-width: 300px;
	margin: 0 auto;
	min-height: 300px;

	@media (min-width: 600px) {
		max-width: 100%;
		justify-content: space-between;
	}
`

const Item = styled.li`
	list-style-type: none;
	width: 100%;
	max-width: 500px;
	min-height: 350px;
	margin-top: 6rem;
	z-index: 3;
	padding: 5px;
	border-radius: 15px;
	background: linear-gradient(to right, red, orange);
	-webkit-animation: slide-in-bottom 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
					animation: slide-in-bottom 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
				
	@keyframes slide-in-bottom {
		0% {
			-webkit-transform: translateY(300px);
							transform: translateY(300px);
			opacity: 0;
		}
		100% {
			-webkit-transform: translateY(0);
							transform: translateY(0);
			opacity: 1;
		}				
	}
					
	&:nth-of-type(1) {
		margin-top: 0;
	}

	@media (min-width: 600px) {
		width: calc(50% - 3rem);

		&:nth-of-type(2) {
			margin-top: 0;
		}
	}

	@media (min-width: 1024px) {
		width: calc(33.33% - 4rem);

		&:nth-of-type(3) {
			margin-top: 0;
		}
	}

  .content-wrapper {
    border-radius: 15px;
		background: linear-gradient(to right, red, orange);
		position: relative;
		border: 5px;
		color: #FFF;
		background: #000;
		background-clip: padding-box;
		border: solid -5px transparent;
		border-radius: 1em;
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		height: 100%;

		& > div {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}

		form {
			width: 100%;

			input {
				border: 2px solid gold;
				padding: .75rem 1rem;
				width: 100%;
				border-radius: 10px;
				background: transparent;
				color: #fff;
				text-align: center;
				outline: none;
				font-size: 1.5rem;
				position: relative;
				z-index: 2;
				text-transform: uppercase;
			}
		}
	}

	.character-stats {
		padding: 4rem 0;

		p {
			margin-bottom: 10px;
			font-weight: 600;
		}

		span {
			color: gold;
			margin-left: 1rem;	
		}
	}

	.show-answer {
		text-align: center; 
		-webkit-animation: slide-in-bottom .5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
					animation: slide-in-bottom .5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
				
		@keyframes slide-in-bottom {
			0% {
				-webkit-transform: translateY(300px);
								transform: translateY(300px);
				opacity: 0;
			}
			100% {
				-webkit-transform: translateY(0);
								transform: translateY(0);
				opacity: 1;
			}				
		}
		
		h3 {
			font-size: 1.8rem;
			margin-bottom: 10px;	
		}

		p {
			font-size: 1.5rem;
			margin-bottom: 25px;
			font-weight: 600;
			
			&.score-addition {
				font-size: 15rem;
				-webkit-animation: scale-in-center .5s cubic-bezier(0.250, 0.460, 0.450, 0.940) .5s both;
								animation: scale-in-center .5s cubic-bezier(0.250, 0.460, 0.450, 0.940) .5s both;
				
				@keyframes scale-in-center {
					0% {
						-webkit-transform: scale(0);
										transform: scale(0);
						opacity: 1;
					}
					100% {
						-webkit-transform: scale(1);
										transform: scale(1);
						opacity: 1;
					}
				}
				
			}

			span {
				color: gold;
			}
		}
	}
`

export default Characters;