import React, { useState, useEffect, Suspense } from 'react';
import styled from 'styled-components';

const url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${process.env.REACT_APP_DARK}/55.880340,12.508200`;

const Fetch = () => {
	//eslint-disable-next-line
	const [sunset, setSunset] = useState();
	const [time, setTime] = useState();

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(url, {
					method: 'GET',
				});
				const result = await response.json();
				setSunset(result.daily.data[0].sunsetTime);
				let unix = result.daily.data[0].sunsetTime;
				let date = new Date(unix * 1000);
				let hour = date.getHours();
				let minute = date.getMinutes();
				setTime(`${hour}:${minute < 10 ? `0${minute}` : minute}`);
			} catch (e) {
				console.log(e);
			}
		})();
	}, []);
	return (
		<Suspense fallback={<p>Loading...</p>}>
			<Box>
				<h4>Sunset today</h4>
				<p>{time}</p>
			</Box>
		</Suspense>
	);
};

const Box = styled.div`
	width: 200px;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: rgba(255, 255, 255, 0.4);
	backdrop-filter: blur(10px);
	border-radius: 10px;
	margin-top: 100px;
`;

export default Fetch;
