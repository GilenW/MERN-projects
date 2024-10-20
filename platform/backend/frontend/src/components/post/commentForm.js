import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

const CommentForm = ({ postId, addComment }) => {
	const [text, setText] = useState(''); // Manage the input field state

	const onSubmit = (e) => {
		e.preventDefault(); // Prevent page refresh
		addComment(postId, { text }); // Dispatch the addComment action
		setText(''); // Clear the input field after submitting
	};

	return (
		<div className='post-form'>
			<div className='bg-primary p'>
				<h3>Leave a Comment</h3>
			</div>
			<form className='form my-1' onSubmit={onSubmit}>
				<textarea
					name='text'
					cols='30'
					rows='5'
					placeholder='Write a comment...'
					value={text}
					onChange={(e) => setText(e.target.value)}
					required
				></textarea>
				<input
					type='submit'
					className='btn btn-dark my-1'
					value='Submit'
				/>
			</form>
		</div>
	);
};

CommentForm.propTypes = {
	postId: PropTypes.string.isRequired, // Validate postId prop
	addComment: PropTypes.func.isRequired, // Ensure action is passed as prop
};

export default connect(null, { addComment })(CommentForm);
