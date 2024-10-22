/**
 * The above functions are responsible for handling various actions related to posts, likes, comments, and alerts in a
 * social media application using Redux and Axios for API calls.
 */
import axios from 'axios';
import { ADD_COMMENT, ADD_POST, DELETE_POST, GET_ONE_POST, GET_POSTS, POST_ERROR, REMOVE_COMMENT, UPDATE_LIKES } from './types';
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



/**
 * The `addLike` function sends a PUT request to update the likes of a post and dispatches actions based on the response.
 * @param postId - The `postId` parameter in the `addLike` function represents the unique identifier of the post to which a
 * like is being added. This identifier is used to make a PUT request to the server to update the likes for that specific
 * post.
 */
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



export const addComment = (postId, formData) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	try {
		const res = await axios.post(`/api/post/comment/${postId}`, formData, config); // Ensure token is attached

		dispatch({
			type: ADD_COMMENT,
			payload: res.data,
		});

		dispatch(setAlert('Comment added', 'success'));
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


export const deleteComment = (postId, commentId) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	try {
		const res = await axios.delete(
			`/api/post/comment/${postId}/${commentId}`,
			config
		); // Ensure token is attached
		dispatch({
			type: REMOVE_COMMENT,
			payload: commentId,
		});

		dispatch(setAlert('Comment removed', 'success'));
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
