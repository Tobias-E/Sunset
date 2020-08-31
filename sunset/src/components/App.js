// React & Hooks
import React from 'react';
import styled from 'styled-components';

// Components
import Fetch from './Fetch';
import Connect from './Connect';

function App() {
	return (
		<Main className='App'>
			<Fetch />
			<Connect />
		</Main>
	);
}

const Main = styled.main`
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #4ca9df;
	background: linear-gradient(
			341.49deg,
			#292e91 -4.23%,
			rgba(255, 255, 255, 0) 100%
		),
		#4ca9df;
`;

export default App;
