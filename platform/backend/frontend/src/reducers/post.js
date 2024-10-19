import { GET_POSTS, POST_ERROR } from '../actions/types';

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
		case POST_ERROR:
			return {
				...state,
				error: payload, // Store the error payload in state
				loading: false, // Stop loading when an error occurs
			};
		default:
			return state; // Return the current state for unmatched actions
	}
}
