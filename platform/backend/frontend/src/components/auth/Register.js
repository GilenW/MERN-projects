import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	});

	const { name, email, password, password2 } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		if (password !== password2) {
			console.log('passwords do not match');
		} else {
			const newUser = {
				name,
				email,
				password,
			};

			try {
				const config = {
					headers: {
						// <-- Corrected from 'header' to 'headers'
						'Content-Type': 'application/json',
					},
				};
				const body = JSON.stringify(newUser);
				const res = await axios.post('/api/user', body, config);
				console.log(res.data);
			} catch (error) {
				console.error(error.response.data); // <-- Log the full error response
			}
		}
	};

	return (
		<Fragment>
			<h1> Sign Up</h1>
			<p className='lead'>
				<i>Create Your Account</i>
			</p>
			<form className='form' onSubmit={(e) => onSubmit(e)}>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Name'
						name='name'
						value={name}
						onChange={(e) => onChange(e)}
						required
					></input>
				</div>
				<div className='form-group'>
					<input
						type='email'
						placeholder='Email Address'
						name='email'
						value={email}
						onChange={(e) => onChange(e)}
					/>
					<small className='form-text'>
						This site uses Gravatar so if you want a profile image,
						use a Gravatar email
					</small>
				</div>
				<div className='form-group'>
					<input
						type='password'
						placeholder='Password'
						name='password'
						minLength={3}
						value={password}
						onChange={(e) => onChange(e)}
					></input>
				</div>
				<div className='form-group'>
					<input
						type='password'
						placeholder='Confirm Password'
						name='password2'
						value={password2}
						onChange={(e) => onChange(e)}
						minLength={3}
					></input>
				</div>
				<input type='submit' value='Register' />
			</form>
			<p>
				Already have an account? <Link to='login'>Sign In </Link>
			</p>
		</Fragment>
	);
};

export default Register;
