import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {
	const [text, setText] = useState(''); // Manage input state

	const onSubmit = (e) => {
		e.preventDefault();
		addPost({ text }); // Dispatch the action with post content
		setText(''); // Clear the input field
        
	};

	return (
		<div className='post-form'>
			<div className='bg-primary p'>
				<h3>Say Something...</h3>
			</div>
			<form className='form my-1' onSubmit={onSubmit}>
				<textarea
					name='text'
					cols='30'
					rows='5'
					placeholder='Create a post'
					value={text}
					onChange={(e) => setText(e.target.value)} // Handle input change
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

PostForm.propTypes = {
	addPost: PropTypes.func.isRequired, // Ensure the action is passed as prop
};

export default connect(null, { addPost })(PostForm);
