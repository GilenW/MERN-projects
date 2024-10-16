import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import axios from 'axios';

import PropTypes from 'prop-types';

const Register = ({ setAlert }) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	});

	const { name, email, password, password2 } = formData;

	// Handle form input changes
	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	// Handle form submission
	const onSubmit = async (e) => {
		e.preventDefault();

		// Check if passwords match
		if (password !== password2) {
			setAlert('Passwords do not match', 'danger');
		} else {
			console.log('success')
		}
	};

	return (
		<Fragment>
			<h1>Sign Up</h1>
			<p className='lead'>
				<i>Create Your Account</i>
			</p>
			<form className='form' onSubmit={onSubmit}>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Name'
						name='name'
						value={name}
						onChange={onChange}
						required
					/>
				</div>
				<div className='form-group'>
					<input
						type='email'
						placeholder='Email Address'
						name='email'
						value={email}
						onChange={onChange}
					/>
					<small className='form-text'>
						This site uses Gravatar so if you want a profile image,
						use a Gravatar email.
					</small>
				</div>
				<div className='form-group'>
					<input
						type='password'
						placeholder='Password'
						name='password'
						value={password}
						onChange={onChange}
						minLength={3}
						required
					/>
				</div>
				<div className='form-group'>
					<input
						type='password'
						placeholder='Confirm Password'
						name='password2'
						value={password2}
						onChange={onChange}
						minLength={3}
						required
					/>
				</div>
				<input
					type='submit'
					value='Register'
					className='btn btn-primary'
				/>
			</form>
			<p>
				Already have an account? <Link to='/login'>Sign In</Link>
			</p>
		</Fragment>
	);
};
Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
};
// Connect Redux `setAlert` action to the component
export default connect(null, { setAlert })(Register);
