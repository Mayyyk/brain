import React from 'react';
import './Rank.css';

const Rank = ({ name, entries }) => {
	return (
		<div className='rank'>
			<div className='rank-text'>
				{`${name}, your current entry count is...`}
			</div>
			<div className='rank-number'>
				{entries}
			</div>
		</div>
	);
};

export default Rank;
