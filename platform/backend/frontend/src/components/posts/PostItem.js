import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom';

const PostItem = ({
	auth,
	post: { _id, text, name, user, likes, comments, date },
}) => (
	<div className='post bg-white p-1 my-1'>
		<p>{text}</p>
		<p className='post-date'>
			Posted on {new Date(date).toLocaleDateString()}
		</p>
		<p>Creator: {name}</p>

        <button type='button'>
            <p>Like: </p>
			<span>{likes.length > 0 && <span>{likes.length}</span>}</span>
		</button>

		<Link to={`/post/${_id}`}>
			Discussion {comments.length > 0 && <span>{comments.length}</span>}
		</Link>
		{/* Correct way to render comments */}
		{/* <div>
			<h4>Comments</h4>
			{comments.length > 0 ? (
				comments.map((comment) => (
					<p key={comment._id}>{comment.text}</p>
				))
			) : (
				<p>No comments yet</p>
			)}
		</div> */}
	</div>
);

PostItem.propTypes = {
    post: PropTypes.shape({
        _id:PropTypes.string.isRequired,
		text: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		user: PropTypes.string.isRequired,
		likes: PropTypes.array.isRequired,
		comments: PropTypes.arrayOf(
			PropTypes.shape({
				_id: PropTypes.string.isRequired,
				text: PropTypes.string.isRequired,
			})
		).isRequired,
		date: PropTypes.string.isRequired,
	}).isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(PostItem);
