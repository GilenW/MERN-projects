import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Use useNavigate instead of withRouter
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';

const CreateProfile = ({ createProfile }) => {
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

	const navigate = useNavigate(); // Use useNavigate hook

	const {
		company,
		website,
		location,
		bio,
		status,
		githubusername,
		skills,
		linkedin,
	} = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		createProfile(formData); // Call action to create profile
		navigate('/dashboard'); // Redirect to dashboard after profile creation
	};

	return (
		<div className='create-profile'>
			<h1>Create Your Profile</h1>
			<form className='form' onSubmit={onSubmit}>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Company'
						name='company'
						value={company}
						onChange={onChange}
					/>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Website'
						name='website'
						value={website}
						onChange={onChange}
					/>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Location'
						name='location'
						value={location}
						onChange={onChange}
					/>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Status'
						name='status'
						value={status}
						onChange={onChange}
						required
					/>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Skills (comma-separated)'
						name='skills'
						value={skills}
						onChange={onChange}
						required
					/>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='GitHub Username'
						name='githubusername'
						value={githubusername}
						onChange={onChange}
					/>
				</div>
				<div className='form-group'>
					<textarea
						placeholder='A short bio about yourself'
						name='bio'
						value={bio}
						onChange={onChange}
					></textarea>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='LinkedIn Profile'
						name='linkedin'
						value={linkedin}
						onChange={onChange}
					/>
				</div>
				<input
					type='submit'
					className='btn btn-primary'
					value='Create Profile'
				/>
				<Link to='/dashboard'>Go Back</Link>
			</form>
		</div>
	);
};

CreateProfile.propTypes = {
	createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(CreateProfile);
