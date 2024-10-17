import React, { Fragment, useState, useEffect } from 'react';
import { Link, Route, useNavigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoute = ({
	component: Component,
	auth: { isAuthenticated, loading },
	...rest
}) => {
	const navigate = useNavigate();

	useEffect(() =>
	{
		if (!isAuthenticated && !loading)
		{
			navigate('/login');
		}
	}, [isAuthenticated, loading, navigate])

	  return isAuthenticated && !loading ? <Outlet /> : null;

};

PrivateRoute.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
