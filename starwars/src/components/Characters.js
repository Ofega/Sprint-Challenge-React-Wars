import React from 'react';
import styled from 'styled-components';
import LoadingIndicator from "./LoadingIndicator";

const Character = props => {
	const { name } = props;
	return (
		<Item>
			<h2>{name}</h2>
		</Item>
	)
}

const Characters = props => {
	const { data, isLoading } = props;

	return (
		<List>
			{ 
					isLoading ? 
						<LoadingIndicator /> :
						data.map(item => <Character key={item.name} name={item.name} />) 
			}
		</List>
	)
}


// Styling
const List = styled.ul`
	list-style-type: none;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	max-width: 300px;
	margin: 0 auto;
	min-height: 300px;

	@media (min-width: 500px) {
		max-width: 500px;
		justify-content: space-between;
	}

	@media (min-width: 768px) {
		max-width: 100%;
	}
`

const Item = styled.li`
	list-style-type: none;
	width: 100%;
	max-width: 500px;
	min-height: 300px;
	margin-top: 6rem;
  position: relative;
  border: 5px;
  color: #FFF;
  background: #000;
  background-clip: padding-box;
  border: solid -5px transparent;
	border-radius: 1em;
	padding: 1rem 1.5rem;
	display: flex;
	flex-direction: column;
	align-items: center
	
	@media (min-width: 500px) {
		width: calc(50% - 2rem);
	}

	@media (min-width: 768px) {
		width: calc(33.33% - 3rem);
	}

	@media (min-width: 1024px) {
		width: calc(33.33% - 4rem);
	}

  &:before {
    content: '';
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    z-index: -1;
    margin: -5px;
    border-radius: inherit;
    background: linear-gradient(to right, red, orange);
	}
	
	h2 {
		font-size: 2rem;
	}
`

export default Characters;