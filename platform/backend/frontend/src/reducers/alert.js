import { SET_ALERT, REMOVE_ALERT } from "../actions/types";
const initialState = [];

// Reducer to handle alert state
export default function alertReducer(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case SET_ALERT:
			return [...state, payload]; // Add the new alert to the state

		case REMOVE_ALERT:
			return state.filter((alert) => alert.id !== payload); // Remove alert by id

		default:
			return state;
	}
}
