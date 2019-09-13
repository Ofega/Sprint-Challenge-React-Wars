import React from 'react';
import styled from 'styled-components';

const Character = props => {
	const { name } = props;
	return (
		<Item>{name}</Item>
	)
}

const Characters = props => {
	const { data } = props;

	return (
		<List>
			{ data.map(item => <Character key={item.name} name={item.name} />) }
		</List>
	)
}


// Styling
const List = styled.ul`
	list-style-type: none;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
`

const Item = styled.li`
	list-style-type: none;
	border: 2px solid red;
	width: calc(25% - 2rem);
	min-height: 300px;
	border-radius: 10px;
	margin-top: 4rem;
`

export default Characters;