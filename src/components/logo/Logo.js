import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css';

const Logo = () => {
	return (
		<div className='logo-container'>
			<Tilt className='tilt'>
				<div className='tilt-inner'>
					<h1>🧠</h1>
				</div>
			</Tilt>
		</div>
	);
};

export default Logo;
