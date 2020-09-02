// React & Hooks
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Components
import Timestamp from './Timestamp';

// Images
import background from '../assets/2244.jpg';

const url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${process.env.REACT_APP_DARK}/55.880340,12.508200`;

function App() {
	const [sun, setSun] = useState({ rise: undefined, set: undefined });

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(url);
				const result = await response.json();
				setSun({
					rise: new Date(result.daily.data[0].sunriseTime * 1000),
					set: new Date(result.daily.data[0].sunsetTime * 1000),
				});
			} catch (e) {
				console.log(e);
			}
		})();
	}, []);
	console.log(sun.set, sun.rise);
	console.log(convert(sun.set - sun.rise));

	Notification.requestPermission(function (status) {
		console.log('Notification permission status:', status);
		displayNotification(status);
	});
	function displayNotification() {
		if (Notification.permission === 'granted') {
			navigator.serviceWorker.getRegistration().then(function (reg) {
				reg.showNotification(
					`Today the sun is up ${convert(
						sun.set - sun.rise
					)} hours, enjoy`
				);
			});
		}
	}
	return (
		<Container className='App'>
			<Timestamp title={'today'} day={0} />
			<Timestamp title={'tomorrow'} day={1} />
			<Timestamp title={'in a week'} day={6} />
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
	font-family: Roboto;
	text-align: center;
	color: #292e91;
	text-decoration: none;
	:hover {
		cursor: pointer;
		text-decoration: underline;
	}
`;

function convert(time) {
	let rest = time;
	const SECOND = 1000;
	const MINUTE = 60 * SECOND;
	const HOUR = 60 * MINUTE;

	let hours = Math.floor(rest / HOUR);
	rest = rest % HOUR;

	let minutes = Math.floor(rest / MINUTE);
	rest = rest % MINUTE;

	let seconds = Math.floor(rest / SECOND);
	rest = rest % SECOND;

	if (hours < 10) {
		hours = '0' + hours;
	}
	if (minutes < 10) {
		minutes = '0' + minutes;
	}
	if (seconds < 10) {
		seconds = '0' + seconds;
	}
	return hours + ':' + minutes + ':' + seconds;
}

export default App;
