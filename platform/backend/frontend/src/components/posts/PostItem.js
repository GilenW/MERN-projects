import React from 'react';
import PropTypes from 'prop-types';

const PostItem = ({ post: { title, body, user, date } }) => (
	<div className='post bg-white p-1 my-1'>
		<h4>{title}</h4>
		<p>{body}</p>
		<p className='post-date'>
			Posted on {new Date(date).toLocaleDateString()}
		</p>
	</div>
);

PostItem.propTypes = {
	post: PropTypes.shape({
		title: PropTypes.string.isRequired,
		body: PropTypes.string.isRequired,
		user: PropTypes.string,
		date: PropTypes.string.isRequired,
	}).isRequired,
};

export default PostItem;
