import React from 'react';

const Connect = () => {
	console.log(process.env.REACT_APP_USER);
	console.log(process.env.REACT_APP_WORD);
	console.log(process.env.REACT_APP_REG);
	return <p>Connect</p>;
};

export default Connect;
