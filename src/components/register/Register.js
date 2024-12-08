import React from 'react';
import './Register.css';
import { useState } from 'react';
import { isValidEmail, isValidPassword, isValidName } from '../../utils/validation.js';

const Register = ({ onRouteChange }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [errors, setErrors] = useState({});

	const validateForm = () => {
		const newErrors = {};
		
		if (!isValidName(name)) {
			newErrors.name = 'Name must be 2-50 characters long and contain only letters, spaces, or hyphens';
		}
		
		if (!isValidEmail(email)) {
			newErrors.email = 'Please enter a valid email address';
		}
		
		if (!isValidPassword(password)) {
			newErrors.password = 'Password must be at least 8 characters long with 1 uppercase, 1 lowercase, and 1 number';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
		console.log('SignIn: email state updated to:', email);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
		console.log('SignIn: password state updated to:', password);
	};

	const handleNameChange = (event) => {
		setName(event.target.value);
		console.log('SignIn: name state updated to:', name);
	};

	const handleSubmit = () => {
		if (!validateForm()) {
			return;
		}

		console.log('Register: email:', email);
		console.log('Register: password:', password);
		fetch('https://image-gen-backend-production.up.railway.app//register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: name,
				email: email,
				password: password,
			}),
		})
			.then((response) => {
				if (!response.ok) {
					return response.json().then((err) => Promise.reject(err));
				}
				return response.json();
			})
			.then((data) => {
				if (data.id) {
					console.log('Registration successful:', data);
					onRouteChange('signin');
				}
			})
			.catch((error) => {
				setErrors({ submit: error.error || 'Registration failed' });
			});
	};

	return (
		<div className='register'>
			<div className='register-container'>
				<h1>Register</h1>
				<div className='form'>
					{errors.submit && <div className="error-message">{errors.submit}</div>}
					
					<div className='form-group'>
						<label htmlFor='name'>Name</label>
						<input
							type='text'
							name='name'
							id='name'
							placeholder='Enter your name'
							value={name}
							onChange={handleNameChange}
						/>
						{errors.name && <span className="error-text">{errors.name}</span>}
					</div>
					<div className='form-group'>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							name='email'
							id='email'
							placeholder='Enter your email'
							value={email}
							onChange={handleEmailChange}
						/>
						{errors.email && <span className="error-text">{errors.email}</span>}
					</div>
					<div className='form-group'>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							name='password'
							id='password'
							placeholder='Enter your password'
							value={password}
							onChange={handlePasswordChange}
						/>
						{errors.password && <span className="error-text">{errors.password}</span>}
					</div>
					<button className='register-button' onClick={handleSubmit}>
						Register
					</button>
				</div>
				<div className='signin-link'>
					<p>
						Already have an account?{' '}
						<span onClick={() => onRouteChange('signin')}>Sign In</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Register;
