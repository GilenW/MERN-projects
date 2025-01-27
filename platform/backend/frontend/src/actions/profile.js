import axios from 'axios';
import { setAlert } from './alert';
import { ACCOUNT_DELETED, CLEAR_PROFILE, GET_PROFILE, GET_PROFILES, PROFILE_ERROR, UPDATE_PROFILE } from './types';


import { useNavigate } from 'react-router-dom'; // Import useNavigate where needed


// Get the current user's profile
export const getCurrentProfile = () => async (dispatch) => {
	try {

		const res = await axios.get('/api/profile/me', {
			headers: {
				'x-auth-token': localStorage.getItem('token'), // Ensure token is included
			},
		});

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


//Get all profiles
export const getProfiles = () => async dispatch =>
{

	dispatch({type:CLEAR_PROFILE})
	try
	{
		const res = await axios.get('/api/profile')
		dispatch({
			type: GET_PROFILES,
			payload: res.data,
		})
	} catch (error)
	{
		console.error('Error:', error) // Log error for debugging

		const errResponse = error.response

		if (errResponse && errResponse.data && errResponse.data.msg)
		{
			dispatch(setAlert(errResponse.data.msg, 'danger'))
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: errResponse ? errResponse.statusText : 'Server Error',
				status: errResponse ? errResponse.status : 500,
			},
		})
	}
};


//Get all profiles
export const getProfileById = userId => async dispatch =>
{

	dispatch({type:CLEAR_PROFILE})
	try
	{
		const res = await axios.get(`/api/profile/user/${userId}`);
		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		})
	} catch (error)
	{
		console.error('Error:', error) // Log error for debugging

		const errResponse = error.response

		if (errResponse && errResponse.data && errResponse.data.msg)
		{
			dispatch(setAlert(errResponse.data.msg, 'danger'))
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: errResponse ? errResponse.statusText : 'Server Error',
				status: errResponse ? errResponse.status : 500,
			},
		})
	}
};



// Create or update profile
export const createProfile =
	(formData, edit = false, navigate) =>
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



//Add Experience
export const addExperience = (formData, navigate) => async dispatch =>
{
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.put('/api/profile/experience', formData, config);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});

		dispatch(setAlert('Experience added', ' success'));

		navigate('/dashboard'); // Use navigate for redirection

	} catch (error) {
		const errors = error.response?.data?.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: error.response?.statusText || 'Server Error',
				status: error.response?.status || 500,
			},
		});
	}
}



//delete experience
export const deleteExperience = id => async dispatch =>
{
	try {
		const res = await axios.delete(`/api/profile/experience/${id}`);
				dispatch({
					type: UPDATE_PROFILE,
					payload: res.data,
				});

				dispatch(setAlert('Experience removed', ' success'));

	} catch (error) {
		const errors = error.response?.data?.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: error.response?.statusText || 'Server Error',
				status: error.response?.status || 500,
			},
		});
	}
}


//delete account and profile

export const deleteAccount = (id) => async (dispatch) =>
{
	if (window.confirm('Are you sure to delete the account?'))
	{
	try{
		const res = await axios.delete('/api/profile');
		dispatch({
			type: CLEAR_PROFILE,
		});
		dispatch({
			type: ACCOUNT_DELETED,
		});

		dispatch(setAlert('Account removed', ' success'));
	} catch (error) {
		const errors = error.response?.data?.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: error.response?.statusText || 'Server Error',
				status: error.response?.status || 500,
			},
		});
	}
	}

};
