import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types'; // Correct import of PropTypes
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profile'; // Import action
import ProfileItem from './ProfileItem'; // Reusable component for each profile

const Profiles = ({ getProfiles, profiles, loading }) => {
	useEffect(() => {
		getProfiles(); // Fetch profiles on component mount
	}, [getProfiles]); // Dependency array ensures it only runs once

	if (loading) return <p>Loading...</p>; // Loading state

	return (
		<Fragment>
			<h1 className='large text-primary'>Developers</h1>
			<p className='lead'>
				<i className='fas fa-user' /> Browse and connect with developers
			</p>
			<div className='profiles'>
				{profiles.length > 0 ? (
					profiles.map((profile) => (
						<ProfileItem key={profile._id} profile={profile} /> // Reusable component
					))
				) : (
					<h4>No profiles found...</h4>
				)}
			</div>
		</Fragment>
	);
};

Profiles.propTypes = {
	getProfiles: PropTypes.func.isRequired,
	profiles: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
	profiles: state.profile.profiles, // Correct state mapping
	loading: state.profile.loading,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
