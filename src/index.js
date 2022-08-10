import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
	BrowserRouter,

} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux'
import CurrentUserManager from './redux/CurrentUserManager';
import homeMenuSelection from './redux/HomeMenuSelector'
let store = configureStore({
	reducer: {
		currentlySelectedView: homeMenuSelection,
		currentUser: CurrentUserManager
	}
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>

				<App />
			</BrowserRouter>


		</Provider>
	</React.StrictMode>
);

reportWebVitals();
