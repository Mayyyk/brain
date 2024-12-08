import React, { useState } from 'react';
import './SignIn.css';
import { isValidEmail, isValidPassword } from '../../utils/validation.js';

const SignIn = ({ onRouteChange, setUser }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState({});

	const validateForm = () => {
		const newErrors = {};

		if (!isValidEmail(email)) {
			newErrors.email = 'Please enter a valid email address';
		}

		if (!isValidPassword(password)) {
			newErrors.password = 'Invalid password format';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = () => {
		if (!validateForm()) {
			return;
		}

		fetch('https://brain-app-server-production.up.railway.app/signin', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		})
			.then((response) => response.json())
			.then((user) => {
				if (user.id) {
					setUser(user);
					onRouteChange('home');
				} else {
					console.error('wrong credentials:', user);
					setErrors({ submit: 'Invalid credentials' });
				}
			})
			.catch((error) => {
				console.error('Sign in error:', error);
				setErrors({ submit: 'Sign in failed. Please try again.' });
			});
	};

	return (
		<div className='signin'>
			<div className='signin-container'>
				<h1>Sign In</h1>
				<div className='form'>
					{errors.submit && (
						<div className='error-message'>{errors.submit}</div>
					)}

					<div className='form-group'>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							name='email'
							id='email'
							placeholder='Enter your email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className={errors.email ? 'error' : ''}
						/>
						{errors.email && <span className='error-text'>{errors.email}</span>}
					</div>
					<div className='form-group'>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							name='password'
							id='password'
							placeholder='Enter your password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className={errors.password ? 'error' : ''}
						/>
						{errors.password && (
							<span className='error-text'>{errors.password}</span>
						)}
					</div>
					<button className='signin-button' onClick={handleSubmit}>
						Sign In
					</button>
				</div>
				<div className='register-link'>
					<p>
						Don't have an account?{' '}
						<span onClick={() => onRouteChange('register')}>Register</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
