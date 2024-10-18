import axios from 'axios';
import { setAlert } from './alert';
import { GET_PROFILE, PROFILE_ERROR } from './types';


import { useNavigate } from 'react-router-dom'; // Import useNavigate where needed


// Get the current user's profile
export const getCurrentProfile = () => async (dispatch) => {
	try {
		console.log('profile');

		const res = await axios.get('/api/profile/me', {
			headers: {
				'x-auth-token': localStorage.getItem('token'), // Ensure token is included
			},
		});

		console.log('Response from profile:', res);
		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (error) {
		console.error('Error:', error); // Log error for debugging

		const errResponse = error.response;

		if (errResponse && errResponse.data && errResponse.data.msg) {
			dispatch(setAlert(errResponse.data.msg, 'danger'));
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: errResponse ? errResponse.statusText : 'Server Error',
				status: errResponse ? errResponse.status : 500,
			},
		});
	}
};




// Create or update profile
export const createProfile =
	(formData, navigate, edit = false) =>
	async (dispatch) => {
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};

			const res = await axios.post('/api/profile', formData, config);

			dispatch({
				type: GET_PROFILE,
				payload: res.data,
			});

			dispatch(setAlert(edit ? 'Profile updated' : 'Profile created'));

			if (!edit) {
				navigate('/dashboard'); // Use navigate for redirection
			}
		} catch (error) {
			const errors = error.response?.data?.errors;

			if (errors) {
				errors.forEach((error) =>
					dispatch(setAlert(error.msg, 'danger'))
				);
			}

			dispatch({
				type: PROFILE_ERROR,
				payload: {
					msg: error.response?.statusText || 'Server Error',
					status: error.response?.status || 500,
				},
			});
		}
	};
