import React, { useState, useEffect, Suspense } from 'react';

const url =
	'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/9bff6245c145509291fedb80938d5d80/55.880340,12.508200';

const Fetch = () => {
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
			<p>{sunset}</p>
			<p>{time}</p>
		</Suspense>
	);
};

export default Fetch;
