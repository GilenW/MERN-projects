/**
 * The above code contains actions for user registration, login, logout, loading user data, and handling authentication
 * errors using Redux and Axios in a React application.
 */
import axios from 'axios';
import { setAlert } from './alert';
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_PROFILE
} from './types';
import setAuthToken from '../utils/setAuthToken';

//load user
export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get('/api/auth');
		dispatch({
			type: USER_LOADED,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: AUTH_ERROR,
		});
	}
};

//Register User

export const register =
	({ name, email, password }) =>
	async (dispatch) => {
		const newUser = {
			name,
			email,
			password,
		};

		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};
			const body = JSON.stringify(newUser);

			// Send the user registration request to the server
			const res = await axios.post('/api/user', body, config);

			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			});
			dispatch(loadUser());

		} catch (error) {
			const errors = error.response.data.errors;
			if (errors) {
				errors.forEach((error) => {
					dispatch(setAlert(error.msg));
				});
			}
			dispatch({
				type: REGISTER_FAIL,
			});
		}
	};

//login User

export const login =
	({email, password }) =>
	async (dispatch) => {
		const loginUser = {
			email,
			password,
		};

		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};
			const body = JSON.stringify(loginUser);
			// Send the user login request to the server
			const res = await axios.post('/api/auth', body, config);

			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data,
			});
			localStorage.setItem('token', res.data.token); // Save token

			dispatch(loadUser());
		} catch (error) {
			const errors = error.response.data.errors;
			if (errors) {
				errors.forEach((error) => {
					dispatch(setAlert(error.msg));
				});
			}
			dispatch({
				type: LOGIN_FAIL,
			});
		}
	};



//logout / clear profile
export const logout = () => dispatch =>
{
	dispatch({ type: LOGOUT });
	dispatch({ type: CLEAR_PROFILE });

}
