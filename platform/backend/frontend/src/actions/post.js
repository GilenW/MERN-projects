import axios from 'axios';
import { GET_POSTS, POST_ERROR } from './types';

// Get all posts
export const getPosts = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/posts'); // Make API request to fetch posts

		dispatch({
			type: GET_POSTS,
			payload: res.data, // Pass the fetched posts as payload
		});
	} catch (error) {
		console.error('Error fetching posts:', error); // Log the error for debugging

		dispatch({
			type: POST_ERROR,
			payload: {
				msg: error.response?.statusText || 'Server Error',
				status: error.response?.status || 500,
			},
		});
	}
};
