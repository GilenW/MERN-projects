import axios from 'axios';
import { GET_POSTS, POST_ERROR } from './types';

export const getPosts = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/post'); // Ensure token is attached

		dispatch({
			type: GET_POSTS,
			payload: res.data,
		});
	} catch (error) {
		console.error('Error fetching posts:', error);

		dispatch({
			type: POST_ERROR,
			payload: {
				msg: error.response?.statusText || 'Server Error',
				status: error.response?.status || 500,
			},
		});
	}
};
