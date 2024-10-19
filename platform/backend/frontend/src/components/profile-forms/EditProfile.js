import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // For navigation
import { getCurrentProfile, createProfile } from '../../actions/profile';

const CreateProfile = ({
	getCurrentProfile,
	createProfile,
	profile: { profile, loading },
}) => {
	const [formData, setFormData] = useState({
		company: '',
		website: '',
		location: '',
		bio: '',
		status: '',
		githubusername: '',
		skills: '',
		linkedin: '',
	});

	const navigate = useNavigate(); // Use navigate for programmatic navigation

	// Load profile data into the form only once after the profile is fetched
	useEffect(() => {
		if (!profile) {
			getCurrentProfile(); // Fetch profile if not already loaded
		}

		if (profile && !loading) {
			setFormData({
				company: profile.company || '',
				website: profile.website || '',
				location: profile.location || '',
				bio: profile.bio || '',
				status: profile.status || '',
				githubusername: profile.githubusername || '',
				skills: profile.skills ? profile.skills.join(', ') : '',
				linkedin: profile.linkedin || '',
			});
		}
	}, [loading, profile, getCurrentProfile]); // Dependencies ensure correct behavior

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		createProfile(formData, true, navigate); // Pass navigate for redirection
	};

	return (
		<form className='form' onSubmit={onSubmit}>
			<div className='form-group'>
				<input
					type='text'
					placeholder='Company'
					name='company'
					value={formData.company}
					onChange={onChange}
				/>
			</div>
			<div className='form-group'>
				<input
					type='text'
					placeholder='Website'
					name='website'
					value={formData.website}
					onChange={onChange}
				/>
			</div>
			<div className='form-group'>
				<input
					type='text'
					placeholder='Location'
					name='location'
					value={formData.location}
					onChange={onChange}
				/>
			</div>
			<div className='form-group'>
				<input
					type='text'
					placeholder='Status'
					name='status'
					value={formData.status}
					onChange={onChange}
					required
				/>
			</div>
			<div className='form-group'>
				<input
					type='text'
					placeholder='Skills (comma-separated)'
					name='skills'
					value={formData.skills}
					onChange={onChange}
					required
				/>
			</div>
			<div className='form-group'>
				<input
					type='text'
					placeholder='GitHub Username'
					name='githubusername'
					value={formData.githubusername}
					onChange={onChange}
				/>
			</div>
			<div className='form-group'>
				<textarea
					placeholder='A short bio about yourself'
					name='bio'
					value={formData.bio}
					onChange={onChange}
				></textarea>
			</div>
			<div className='form-group'>
				<input
					type='text'
					placeholder='LinkedIn Profile'
					name='linkedin'
					value={formData.linkedin}
					onChange={onChange}
				/>
			</div>
			<input
				type='submit'
				className='btn btn-primary'
				value='Save Profile'
			/>
		</form>
	);
};

const mapStateToProps = (state) => ({
	profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, createProfile })(
	CreateProfile
);
