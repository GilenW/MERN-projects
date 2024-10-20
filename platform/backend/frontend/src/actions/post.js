import axios from 'axios';
import { GET_POSTS, POST_ERROR, UPDATE_LIKES } from './types';

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



export const addLike = (postId) => async (dispatch) => {
	try {
		const res = await axios.put(`/api/post/like/${postId}`) // Ensure token is attached

		dispatch({
			type: UPDATE_LIKES,
			payload: { id: postId, likes: res.data },
		});
	} catch (error) {
		console.error('Error fetching posts in add like function:', error);

		dispatch({
			type: POST_ERROR,
			payload: {
				msg: error.response?.statusText || 'Server Error',
				status: error.response?.status || 500,
			},
		});
	}
};

export const removeLike = (postId) => async (dispatch) => {
	try {
		const res = await axios.put(`/api/post/unlike/${postId}`); // Ensure token is attached

		dispatch({
			type: UPDATE_LIKES,
			payload: {id: postId, likes: res.data },
		});
	} catch (error) {
		console.error('Error fetching posts in remove like function:', error);

		dispatch({
			type: POST_ERROR,
			payload: {
				msg: error.response?.statusText || 'Server Error',
				status: error.response?.status || 500,
			},
		});
	}
};
