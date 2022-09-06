import React from 'react';

import './App.css'
import {

	Routes,
	Route,
	useLocation
} from "react-router-dom";
import Home from './components/routed/Home/home/Home'
import NavBar from './components/shared/NavBar/NavBar'
import { useSelector } from 'react-redux';
import UserProfileRoot from './components/routed/UserProfile/UserProfileRoot/UserProfileRoot';
import SlideInMessagesRoot from './components/shared/SlideInMessageContainer/SlideInMessagesRoot/SlideInMessagesRoot';
import NotificationListRoot from './components/shared/SlideInNotificationsContainer/NotificationListRoot/NotificationListRoot';
import PostDetailsRoot from './components/routed/PostDetails/PostDetailsRoot/PostDetailsRoot';
import MessengerRoot from './components/routed/Messenger/MessengerRoot/MessengerRoot';
import FloatingMessengerRoot from './components/shared/FloatingMessenger/FloatingMessengerRoot/FloatingMessengerRoot';
import LoginRegistration from './components/routed/Unauthorized/LoginRegistration';
function App() {
	const location = useLocation();
	const currentser = useSelector(state => state.currentUser.value)
	React.useEffect(() => {

	}, [])
	return (
		<div className="App">
			{currentser != null && <><NavBar />
				<SlideInMessagesRoot />
				<NotificationListRoot />
			</>}

			<Routes>
				{currentser == null && <Route path='/' element={<LoginRegistration />} />}


				{currentser != null && <>  <Route path='/' element={<Home />} />  <Route path='/profile'>
					<Route path=':userId/*' element={<UserProfileRoot />} />
				</Route>
					<Route path='/messenger'>
						<Route path=':conversationId' element={<MessengerRoot />} />
					</Route>
					<Route path='/post'>
						<Route path=':id' element={<PostDetailsRoot />} />
					</Route>

				</>}

			</Routes>

			{!location.pathname.startsWith('/messenger') && currentser !== null &&
				<FloatingMessengerRoot />}
		</div>
	);
}

export default App;
