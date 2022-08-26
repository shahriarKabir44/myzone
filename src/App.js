import React from 'react';
import Home from './components/routed/Home/home/Home'
import NavBar from './components/shared/NavBar/NavBar'
import './App.css'
import {

	Routes,
	Route,
} from "react-router-dom";
import UserProfileRoot from './components/routed/UserProfile/UserProfileRoot/UserProfileRoot';
import SlideInMessagesRoot from './components/shared/SlideInMessageContainer/SlideInMessagesRoot/SlideInMessagesRoot';
import NotificationListRoot from './components/shared/SlideInNotificationsContainer/NotificationListRoot/NotificationListRoot';
function App() {
	React.useEffect(() => {

	}, [])
	return (
		<div className="App">
			<NavBar />
			<SlideInMessagesRoot />
			<NotificationListRoot />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/profile'>
					<Route path=':userId/*' element={<UserProfileRoot />} />

				</Route>
			</Routes>


		</div>
	);
}

export default App;
