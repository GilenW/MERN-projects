import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost } from '../../actions/post';
import { Link, useParams } from 'react-router-dom';
import CommentForm from './commentForm';
import CommentItem from './commentItem';

const Post = ({ getPost, post: { post, loading } }) => {
	const { id } = useParams(); // Get post ID from URL

	useEffect(() => {
		getPost(id); // Fetch the post when component loads
	}, [getPost, id]);

	if (loading || post === null) return "Loading..."; //

	return (
		<div className='post'>
			<Link to='/posts' className='btn'>
				Back to Posts
			</Link>
			<div className='post bg-white p-1 my-1'>
				<h3>{post.text}</h3>
				<p>Posted by: {post.name}</p>
				<p>Likes: {post.likes.length}</p>
				<p>Comments: {post.comments.length}</p>
			</div>
			<CommentForm postId={post._id} />

			<div className='comments'>
				{post.comments.map((comment) => (
					<CommentItem
						key={comment._id}
						comment={comment}
						postId={post._id}
					/>
				))}
			</div>
		</div>
	);
};

Post.propTypes = {
	getPost: PropTypes.func.isRequired, // Ensure action is passed as prop
	post: PropTypes.shape({
		post: PropTypes.object,
		loading: PropTypes.bool.isRequired,
	}).isRequired,
};

const mapStateToProps = (state) => ({
	post: state.post, // Map post state from Redux
});

export default connect(mapStateToProps, { getPost })(Post);
