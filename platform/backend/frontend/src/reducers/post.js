import { DELETE_POST, GET_POSTS, POST_ERROR, UPDATE_LIKES } from '../actions/types';

const initialState = {
	posts: [], // List of all posts
	post: null, // Single post for detailed view
	loading: true, // Loading state
	error: {}, // Error object for storing API errors
};

// Reducer function
export default function postReducer(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_POSTS:
			return {
				...state,
				posts: payload, // Store the fetched posts in state
				loading: false, // Set loading to false after fetching posts
			};
		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter(post => post._id !== payload),
				loading:false
			}
		case POST_ERROR:
			return {
				...state,
				error: payload, // Store the error payload in state
				loading: false, // Stop loading when an error occurs
			};

		case UPDATE_LIKES:
			return {
				...state,
				posts: state.posts.map(post => post._id === payload.id ? { ...post, likes: payload.likes } : post),
				loading:false
			}
		default:
			return state; // Return the current state for unmatched actions
	}
}
