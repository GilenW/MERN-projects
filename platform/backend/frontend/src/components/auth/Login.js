import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const {  email, password } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) =>
  {
    e.preventDefault(); 
		console.log('Login Successfully!');

		// e.preventDefault();
		// if (password !== password2) {
		// 	console.log('passwords do not match');
		// } else {
		// 	const newUser = {
		// 		name,
		// 		email,
		// 		password,
		// 	};

		// 	try {
		// 		const config = {
		// 			headers: {
		// 				// <-- Corrected from 'header' to 'headers'
		// 				'Content-Type': 'application/json',
		// 			},
		// 		};
		// 		const body = JSON.stringify(newUser);
		// 		const res = await axios.post('/api/user', body, config);
		// 		console.log(res.data);
		// 	} catch (error) {
		// 		console.error(error.response.data); // <-- Log the full error response
		// 	}
		// }
	};

	return (
		<Fragment>
			<h1> Sign In</h1>
			<p className='lead'>
				<i>Login Your Account</i>
			</p>
			<form className='form' onSubmit={(e) => onSubmit(e)}>
				<div className='form-group'>
					<input
						type='email'
						placeholder='Email Address'
						name='email'
						value={email}
						onChange={(e) => onChange(e)}
					/>
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

				<input type='submit' value='Sign In' />
			</form>
			<p>
				Do not have an account? <Link to='/register'>Sign Up </Link>
			</p>
		</Fragment>
	);
};



export default Login
