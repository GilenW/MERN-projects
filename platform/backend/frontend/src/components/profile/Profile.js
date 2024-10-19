import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom'; // Use useParams to get the ID from the URL
import PropTypes from 'prop-types';
import { getProfileById } from '../../actions/profile'; // Import action

const Profile = ({ getProfileById, profile: { profile, loading }, auth }) => {
	const { id } = useParams(); // Extract user ID from the URL

	useEffect(() => {
		getProfileById(id); // Fetch profile on component mount
	}, [getProfileById, id]); // Ensure useEffect runs when id changes

	if (loading || profile === null) {
		return <p>Loading...</p>; // Loading state
	}

	return (
		<Fragment>
			<Link to='/profiles' className='btn btn-light'>
				Back to Profiles
			</Link>
			{auth.isAuthenticated &&
				auth.loading === false &&
				auth.user._id === profile.user._id && (
					<Link to='/edit-profile' className='btn btn-dark'>
						Edit Profile
					</Link>
				)}
			<div className='profile-grid my-1'>
				<div className='profile-top bg-primary p-2'>
					<img
						className='round-img'
						src={profile.user.avatar}
						alt='User Avatar'
					/>
					<h1 className='large'>{profile.user.name}</h1>
					<p className='lead'>
						{profile.status}{' '}
						{profile.company && <span> at {profile.company}</span>}
					</p>
					<p>{profile.location && <span>{profile.location}</span>}</p>
				</div>
				<div className='profile-about bg-light p-2'>
					<h2 className='text-primary'>About Me</h2>
					<p>{profile.bio}</p>
				</div>
				<div className='profile-skills bg-light p-2'>
					<h2 className='text-primary'>Skill Set</h2>
					<div className='skills'>
						{profile.skills.map((skill, index) => (
							<div key={index} className='p-1'>
								<i className='fas fa-check' /> {skill}
							</div>
						))}
					</div>
				</div>
			</div>
		</Fragment>
	);
};

Profile.propTypes = {
	getProfileById: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile, // Ensure correct state mapping
	auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
