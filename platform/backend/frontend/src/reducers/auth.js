import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, ACCOUNT_DELETED } from '../actions/types';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	loading: true, // Include loading in the initial state
	user: null,
};

export default function authReducer(state = initialState, action) {
	const { type, payload } = action;

	switch (type)
	{
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user:payload
			}
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			localStorage.setItem('token', payload.token); // Save token on success
			return {
				...state,
				...payload,
				isAuthenticated: true,
				loading: false, // Set loading to false after registration
			};

		case REGISTER_FAIL:
		case LOGIN_FAIL:
		case AUTH_ERROR:
		case LOGOUT:
		case ACCOUNT_DELETED:
			localStorage.removeItem('token'); // Clear token on failure
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false, // Also set loading to false on failure
			};

		default:
			return state;
	}
}
