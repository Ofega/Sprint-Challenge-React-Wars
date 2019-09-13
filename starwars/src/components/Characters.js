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
	width: calc(25% - 4rem);
	min-height: 300px;
	margin-top: 6rem;
  position: relative;
  border: 5px;
  color: #FFF;
  background: #000;
  background-clip: padding-box;
  border: solid -5px transparent;
  border-radius: 1em;

  &:before {
    content: '';
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    z-index: -1;
    margin: -5px;
    border-radius: inherit;
    background: linear-gradient(to right, red, orange);
  }
`

export default Characters;