import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExperience } from '../../actions/profile';
import { format } from 'date-fns'; // Optional: For formatting dates

const Experience = ({ experience, deleteExperience }) =>
{
    // if (!experience)
    // {
    //     return;
    // }
	const experiences = experience.map((exp) => (
		<tr key={exp._id}>
			<td>{exp.company}</td>
			<td className='hide-sm'>{exp.title}</td>
			<td>
				{format(new Date(exp.from), 'MM/dd/yyyy')} -{' '}
				{exp.current
					? 'Present'
					: format(new Date(exp.to), 'MM/dd/yyyy')}
			</td>
			<td>
				<button
					onClick={() => deleteExperience(exp._id)}
					className='btn btn-danger'
				>
					Delete
				</button>
			</td>
		</tr>
	));

	return (
		<div>
			<h2 className='my-2'>Experience Credentials</h2>
			<table className='table'>
				<thead>
					<tr>
						<th>Company</th>
						<th className='hide-sm'>Title</th>
						<th className='hide-sm'>Years</th>
						<th />
					</tr>
				</thead>
				<tbody>{experiences}</tbody>
			</table>
		</div>
	);
};

Experience.propTypes = {
	experience: PropTypes.array.isRequired,
	deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, {deleteExperience}) (Experience);
