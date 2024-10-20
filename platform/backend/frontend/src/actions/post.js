import axios from 'axios';
import { ADD_POST, DELETE_POST, GET_ONE_POST, GET_POSTS, POST_ERROR, UPDATE_LIKES } from './types';
import { setAlert } from './alert';
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



export const deletePost = (postId) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/post/${postId}`);// Ensure token is attached

		dispatch({
			type: DELETE_POST,
			payload: postId,
		});

		dispatch(setAlert("Post removed","success"))

	} catch (error) {
		console.error('Error delete a post:', error);

		dispatch({
			type: POST_ERROR,
			payload: {
				msg: error.response?.statusText || 'Server Error',
				status: error.response?.status || 500,
			},
		});
	}
};




export const addPost = (formData) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	try {
		const res = await axios.post('/api/post', formData, config); // Ensure token is attached
		console.log(res)
		dispatch({
			type: ADD_POST,
			payload: res.data,
		});

		dispatch(setAlert('Post added', 'success'));
	} catch (error) {
		console.error('Error adding a post:', error);

		dispatch({
			type: POST_ERROR,
			payload: {
				msg: error.response?.statusText || 'Server Error',
				status: error.response?.status || 500,
			},
		});
	}
};



export const getPost = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/post/${id}`); // Ensure token is attached

		dispatch({
			type: GET_ONE_POST,
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
