import React, { Fragment, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;
	const navigate = useNavigate();
	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		login({ email, password });
	};

	// Redirect if logged in
	useEffect(() => {
		if (isAuthenticated) {
			navigate('/dashboard'); // Redirect to dashboard if authenticated
		}
	}, [isAuthenticated, navigate]);

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

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
