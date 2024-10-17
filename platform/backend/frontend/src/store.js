import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

// Configure the store using Redux Toolkit
const store = configureStore({
	reducer: rootReducer, // The root reducer, which combines all the slice reducers
	devTools: process.env.NODE_ENV !== 'production', // Enable DevTools only in development
});

export default store;
