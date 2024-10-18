import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';

const Landing = ({ isAuthenticated }) => {
	const navigate = useNavigate();

	// Redirect if logged in
	useEffect(() => {
		if (isAuthenticated) {
			navigate('/dashboard'); // Redirect to dashboard if authenticated
		}
	}, [isAuthenticated, navigate]);
	return (
		<section className='landing'>
			<div>
				<div className='landing-inner'>
					<h1 className='x-large'>Developer Connector</h1>
					<p className='lead'>
						Create a developer profile/profolio, share posts and get
						help from other Developers
					</p>
					<div className='buttons'>
						<Link to='/register'>Sign Up</Link>
						<Link to='/login'>Login</Link>
					</div>
				</div>
			</div>
		</section>
	);
};
Landing.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(Landing);
