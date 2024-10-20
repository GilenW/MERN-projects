import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post'; // Import action to fetch posts
import PostItem from './PostItem'; // Optional: Reusable PostItem component
import PostForm from './PostForm'

const Posts = ({ getPosts, post: { posts, loading } }) => {
	useEffect(() => {
		getPosts(); // Fetch posts on component mount
	}, [getPosts]); // Dependency array ensures it runs once

	if (loading) {
		return <p>Loading...</p>; // Loading state
	}

	return (
		<div className='posts'>
			<h1 className='large text-primary'>Posts</h1>
			<PostForm></PostForm>
			<p className='lead'>
				<i className='fas fa-user' /> Welcome to the community
			</p>
			{posts.length > 0 ? (
				posts.map((post) => <PostItem key={post._id} post={post} />)
			) : (
				<h4>No posts found...</h4>
			)}
		</div>
	);
};

Posts.propTypes = {
	getPosts: PropTypes.func.isRequired, // Ensure the action is passed as a prop
	post: PropTypes.shape({
		posts: PropTypes.array.isRequired, // Validate the posts array
		loading: PropTypes.bool.isRequired, // Validate loading state
	}).isRequired,
};

const mapStateToProps = (state) => ({
	post: state.post, // Map post state to props
});

export default connect(mapStateToProps, { getPosts })(Posts);
