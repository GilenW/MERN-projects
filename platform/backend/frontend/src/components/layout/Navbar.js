import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth';
const Navbar = ({ isAuthenticated, loading, logout }) => {
	const authLinks = (
		<ul>
			<li>
				<Link to='/profiles'>Developers</Link>
			</li>
			<li>
				<Link to='/dashboard'>Dashboard</Link>
			</li>
			<li>
				<Link to='/posts'>Posts</Link>
			</li>
			<li>
				<a onClick={logout} href='#!'>
					<i className='fas fa-sign-out-alt' /> Logout
				</a>
			</li>
		</ul>
	);

	const guestLinks = (
		<ul>
			<li>
				<Link to='/profiles'>Developers</Link>
			</li>
			<li>
				<Link to='/register'>Register</Link>
			</li>
			<li>
				<Link to='/login'>login</Link>
			</li>
		</ul>
	);

	return (
		<nav className='navbar bg-dark'>
			<h1>
				<Link to='index.html'>
					<i className='fas fa-code'></i>Dev
				</Link>
			</h1>
			{!loading && (
				<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
			)}
		</nav>
	);
};
Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	loading: state.auth.loading,
});

export default connect(mapStateToProps, {logout})(Navbar);

