import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import { Link } from 'react-router-dom';

const Dashboard = ({
	getCurrentProfile,
	auth: { user },
	profile: { profile, loading },
}) => {
	useEffect(() => {
		getCurrentProfile();
	}, [getCurrentProfile]);

	// if (loading || profile === null) {
	// 	return <p>should show some picture here</p>; // Render loading message/picture
	// }

	return (
		<Fragment>
			<h1>Dashboard</h1>
			<p>Welcome {user && user.name}</p>
			{profile !== null ? (
				<Fragment>has profile</Fragment>
			) : (
				<Fragment>
					<p>
						You have not yet set up a profile, please add some info
					</p>
					<Link to='/create-profile'>
						<button className='btn btn-primary'>
							Create Profile
						</button>
					</Link>
				</Fragment>
			)}
		</Fragment>
	);
};

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
