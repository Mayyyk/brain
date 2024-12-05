import React from 'react';
import './InputForm.css';

const InputForm = () => {
	return (
		<div className='form-container'>
			<p className='form-title'>This Magic Brain will detect faces in your pictures. Give it a try!</p>
			<div className='form-input-container'>
				<input 
					type="text" 
					className='form-input'
					placeholder='Enter image URL here...' 
				/>
				<button className='form-button'>Detect</button>
			</div>
		</div>
	);
};

export default InputForm;
