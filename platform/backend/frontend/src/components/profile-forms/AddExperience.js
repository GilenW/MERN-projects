import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';
import { Link, useNavigate } from 'react-router-dom'; // Use useNavigate instead of withRouter

const AddExperience = ({ addExperience }) => {
	const [formData, setFormData] = useState({
		title: '',
		company: '',
		location: '',
		from: '',
		to: '',
		current: false,
		description: '',
	});

	const [toDateDisabled, toggleDisabled] = useState(false); // For toggling 'To' field

	const { title, company, location, from, to, current, description } =
		formData;

	const navigate = useNavigate(); // Use navigate for programmatic navigation

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		addExperience(formData, navigate); // Dispatch action and navigate
	};

	return (
		<div className='add-experience'>
			<h1 className='large text-primary'>Add An Experience</h1>
			<p className='lead'>
				<i className='fas fa-code-branch'></i> Add any job or position
				that you have had in the past
			</p>
			<form className='form' onSubmit={onSubmit}>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Job Title'
						name='title'
						value={title}
						onChange={onChange}
						required
					/>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Company'
						name='company'
						value={company}
						onChange={onChange}
						required
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
					<h4>From Date</h4>
					<input
						type='date'
						name='from'
						value={from}
						onChange={onChange}
						required
					/>
				</div>
				<div className='form-group'>
					<p>
						<input
							type='checkbox'
							name='current'
							checked={current}
							value={current}
							onChange={(e) => {
								setFormData({ ...formData, current: !current });
								toggleDisabled(!toDateDisabled);
							}}
						/>{' '}
						Current Job
					</p>
				</div>
				<div className='form-group'>
					<h4>To Date</h4>
					<input
						type='date'
						name='to'
						value={to}
						onChange={onChange}
						disabled={toDateDisabled ? 'disabled' : ''}
					/>
				</div>
				<div className='form-group'>
					<textarea
						name='description'
						cols='30'
						rows='5'
						placeholder='Job Description'
						value={description}
						onChange={onChange}
					></textarea>
				</div>
				<input
					type='submit'
					className='btn btn-primary'
					value='Add Experience'
				/>
				<Link className='btn btn-light my-1' to='/dashboard'>
					Go Back
				</Link>
			</form>
		</div>
	);
};

AddExperience.propTypes = {
	addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(AddExperience);
