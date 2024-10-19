import './App.css';
import React, { Fragment, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';
import Alert from './components/layout/Alert';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './routing/PrivateRoute'
import CreateProfile from './components/profile-forms/CreateProfile'
import EditProfile from './components/profile-forms/EditProfile'
import AddExperience from './components/profile-forms/AddExperience'
import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile'
import Posts from './components/posts/Posts'

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);
	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<h1> App</h1>
					<Navbar></Navbar>
					<Alert />
					<Routes>
						<Route exact path='/' Component={Landing} />
						<Route
							exact
							path='/register'
							Component={Register}
						></Route>
						<Route exact path='/login' Component={Login}></Route>
						<Route
							exact
							path='/profiles'
							Component={Profiles}
						></Route>
						<Route
							exact
							path='/profile/:id'
							Component={Profile}
						></Route>

						<Route path='/dashboard' element={<PrivateRoute />}>
							<Route path='' element={<Dashboard />} />
						</Route>
						<Route
							path='/create-profile'
							element={<PrivateRoute />}
						>
							<Route path='' element={<CreateProfile />} />
						</Route>
						<Route path='/edit-profile' element={<PrivateRoute />}>
							<Route path='' element={<EditProfile />} />
						</Route>
						<Route
							path='/add-experience'
							element={<PrivateRoute />}
						>
							<Route path='' element={<AddExperience />} />
						</Route>
						<Route
							path='/posts'
							element={<PrivateRoute />}
						>
							<Route path='' element={<Posts />} />
						</Route>
					</Routes>
				</Fragment>
			</Router>
		</Provider>
	);
};

export default App;
