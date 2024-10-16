import './App.css';
import React, { Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store'
import Alert from './components/layout/Alert'

const App = () => (
	<Provider store={store}>
		<Router>
			<Fragment>
				<h1> App</h1>
				<Navbar></Navbar>
				<Alert/>
				<Routes>
					<Route exact path='/' Component={Landing} />
					<Route exact path='/register' Component={Register}></Route>
					<Route exact path='/login' Component={Login}></Route>
				</Routes>
			</Fragment>
		</Router>
	</Provider>
);

export default App;
