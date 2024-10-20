import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/post'

const CommentItem = ({
	comment: { _id, text, name, avatar, user, date },
	auth,
	postId,
	deleteComment, // Action to delete comment
}) => (
	<div className='post bg-white p-1 my-1'>
		<div>
			<img className='round-img' src={avatar} alt='User Avatar' />
			<h4>{name}</h4>
		</div>
		<div>
			<p className='my-1'>{text}</p>
			<p className='post-date'>
				Commented on {new Date(date).toLocaleDateString()}
			</p>

			{!auth.loading && user === auth.user._id && (
				<button
					onClick={() => deleteComment(postId, _id)} // Call delete action
					type='button'
					className='btn btn-danger'
				>
					Delete
				</button>
			)}
		</div>
	</div>
);

CommentItem.propTypes = {
	comment: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		avatar: PropTypes.string.isRequired,
		user: PropTypes.string.isRequired,
		date: PropTypes.string.isRequired,
	}).isRequired,
	auth: PropTypes.object.isRequired,
	postId: PropTypes.string.isRequired,
	deleteComment: PropTypes.func.isRequired, // Action to delete comment
};

const mapStateToProps = (state) => ({
	auth: state.auth, // Map auth state to props
});

export default connect(mapStateToProps,{deleteComment})(CommentItem);
