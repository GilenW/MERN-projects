import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

// Action to set an alert with a timeout for auto-remove
export const setAlert =
	(msg, alertType, timeout = 5000) =>
	(dispatch) => {
		const id = uuidv4(); // Generate unique id for the alert
		dispatch({
			type: SET_ALERT,
			payload: { msg, alertType, id },
		});

		// Automatically remove the alert after the timeout
		setTimeout(
			() => dispatch({ type: REMOVE_ALERT, payload: id }),
			timeout
		);
	};
