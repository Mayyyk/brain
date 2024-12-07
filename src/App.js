import React, { useState, useEffect } from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation.js';
import Logo from './components/logo/Logo.js';
import InputForm from './components/input/InputForm.js';
import Rank from './components/rank/Rank.js';
import ParticlesBg from 'particles-bg';
import ImageGeneration from './components/imagegeneration/ImageGeneration.js';
import SignIn from './components/signin/SignIn.js';
import Register from './components/register/Register.js';

function App() {
	const [input, setInput] = useState('');
	const [generatedImage, setGeneratedImage] = useState(null);
	const [isGenerating, setIsGenerating] = useState(false);
	const [route, setRoute] = useState('signin');
	const [user, setUser] = useState(null);

	const resetState = () => {
		setUser(null);
		setInput('');
		setGeneratedImage(null);
		// Reset any other states you need to clear
	};

	const setUserData = (userData) => {
		setUser(userData);
	};

	const handleGenerate = () => {
		if (!input || !user?.id) {
			console.log('App: No input or user ID provided');
			return;
		}
		
		console.log('Starting image generation with prompt:', input);
		setIsGenerating(true);
		fetch('http://localhost:3000/generate-image', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				prompt: input,
				id: user.id
			})
		})
		.then(response => response.json())
		.then(data => {
			if (data.error) {
				throw new Error(data.error);
			}
			setGeneratedImage(data.imageUrl);
			setUser(prevUser => ({
				...prevUser,
				entries: data.entries
			}));
			setIsGenerating(false);
		})
		.catch(error => {
			console.error('Image generation error:', error);
			setIsGenerating(false);
		});
	};

	const onRouteChange = (route) => {
		if (route === 'signin') {
			resetState();
		}
		setRoute(route);
	};

	return (
		<div className='App'>
			<Logo />
			{route === 'signin' ? (
				<SignIn onRouteChange={onRouteChange} setUser={setUserData} />
			) : route === 'register' ? (
				<Register onRouteChange={onRouteChange} />
			) : (
				<div>
					<Navigation onRouteChange={onRouteChange} />
					<Rank name={user?.name} entries={user?.entries} />
					<InputForm 
						onInputChange={setInput} 
						onGenerate={handleGenerate}
						isGenerating={isGenerating}
					/>
					<ParticlesBg className='particles' type='circle' bg={true} />
					<ImageGeneration 
						imageUrl={generatedImage} 
						isLoading={isGenerating}
					/>
				</div>
			)}
		</div>
	);
}

export default App;
