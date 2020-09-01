// React & Hooks
import React from 'react';
import styled from 'styled-components';

// Components
import Fetch from './Fetch';

// Images
import background from '../assets/2244.jpg';

function App() {
	Notification.requestPermission(function (status) {
		console.log('Notification permission status:', status);
		displayNotification(status);
	});
	function displayNotification() {
		if (Notification.permission == 'granted') {
			navigator.serviceWorker.getRegistration().then(function (reg) {
				reg.showNotification('Hello world!');
			});
		}
	}
	return (
		<Container className='App'>
			<Fetch title={'today'} day={0} />
			<Fetch title={'tomorrow'} day={1} />
			<Fetch title={'in a week'} day={6} />
			<Footer>
				<Links href='https://www.freepik.com/vectors/abstract'>
					Abstract vector created by vectorpouch
				</Links>
				<Links href='https://darksky.net/poweredby/'>
					Powered by Dark Sky
				</Links>
			</Footer>
		</Container>
	);
}

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	background-image: url(${background});
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
	/* background-color: #4ca9df;
	background: linear-gradient(
			341.49deg,
			#292e91 -4.23%,
			rgba(255, 255, 255, 0) 100%
		),
		#4ca9df; */
`;

const Footer = styled.footer`
	height: 2rem;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	background-color: rgba(255, 255, 255, 0.7);
	backdrop-filter: blur(10px);
	border-radius: 10px;
`;

const Links = styled.a`
	text-align: center;
	color: #292e91;
	text-decoration: none;
	:hover {
		cursor: pointer;
		text-decoration: underline;
	}
`;

export default App;
