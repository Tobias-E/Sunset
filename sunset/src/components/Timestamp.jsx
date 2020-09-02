// React & Hooks
import React, { useState, useEffect, Suspense } from 'react';
import styled from 'styled-components';

const url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${process.env.REACT_APP_DARK}/55.880340,12.508200`;

const TimeStamp = ({ title, day }) => {
	//eslint-disable-next-line
	const [sunset, setSunset] = useState();
	const [time, setTime] = useState();

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(url);
				const result = await response.json();
				setSunset(result.daily.data[day].sunsetTime);
				let unix = result.daily.data[day].sunsetTime;
				let date = new Date(unix * 1000);
				let hour = date.getHours();
				let minute = date.getMinutes();
				setTime(`${hour}:${minute < 10 ? `0${minute}` : minute}`);
			} catch (e) {
				console.log(e);
			}
		})();
	}, [day]);
	return (
		<Box>
			<Title>Sunset {title}</Title>
			<Suspense fallback={<p>Loading...</p>}>
				<Text>{time}</Text>
			</Suspense>
		</Box>
	);
};

const Box = styled.div`
	width: 200px;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: rgba(255, 255, 255, 0.7);
	backdrop-filter: blur(10px);
	border-radius: 10px;
`;

const Title = styled.h3`
	font-family: Mulish;
`;

const Text = styled.p`
	font-family: Roboto;
	margin-top: 0;
`;

export default TimeStamp;
