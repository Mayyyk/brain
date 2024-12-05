import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css';

const Input = () => {
	return (
		<div className='input-container'>
			<Tilt className='tilt'>
				<div className='tilt-inner'>
					<h1>React Parallax Tilt 👀</h1>
				</div>
			</Tilt>
		</div>
	);
};

export default Input;
