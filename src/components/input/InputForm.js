import React, { useState } from 'react';
import './InputForm.css';
import { isValidPrompt } from '../../utils/validation.js';

const InputForm = ({ onInputChange, onGenerate, isGenerating }) => {
	const [prompt, setPrompt] = useState('');
	const [error, setError] = useState('');

	const handleInputChange = (e) => {
		const value = e.target.value;
		setPrompt(value);
		onInputChange(value);
		
		// Clear error when user starts typing
		if (error) setError('');
	};

	const handleGenerate = () => {
		if (!prompt.trim()) {
			setError('Please enter a prompt');
			return;
		}

		if (!isValidPrompt(prompt)) {
			setError('Prompt contains invalid characters');
			return;
		}

		onGenerate();
	};

	return (
		<div className='form-container'>
			<p className='form-title'>This Magic Brain will generate images based on your prompt!</p>
			<div className='form-input-container'>
				<div className='input-wrapper'>
					<input 
						type='text'
						className={`form-input ${error ? 'error' : ''}`}
						placeholder='Enter generation prompt...'
						value={prompt}
						onChange={handleInputChange}
						disabled={isGenerating}
					/>
					{error && <span className="error-text">{error}</span>}
				</div>
				<button 
					className='form-button' 
					onClick={handleGenerate}
					disabled={isGenerating}
				>
					{isGenerating ? 'Generating...' : 'Generate'}
				</button>
			</div>
		</div>
	);
};

export default InputForm;
