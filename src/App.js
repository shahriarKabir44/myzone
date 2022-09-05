import React from 'react';

import './App.css'
import {

	Routes,
	Route,
	useLocation
} from "react-router-dom";
// import Home from './components/routed/Home/home/Home'
// import NavBar from './components/shared/NavBar/NavBar'
// import UserProfileRoot from './components/routed/UserProfile/UserProfileRoot/UserProfileRoot';
// import SlideInMessagesRoot from './components/shared/SlideInMessageContainer/SlideInMessagesRoot/SlideInMessagesRoot';
// import NotificationListRoot from './components/shared/SlideInNotificationsContainer/NotificationListRoot/NotificationListRoot';
// import PostDetailsRoot from './components/routed/PostDetails/PostDetailsRoot/PostDetailsRoot';
// import MessengerRoot from './components/routed/Messenger/MessengerRoot/MessengerRoot';
import FloatingMessengerRoot from './components/shared/FloatingMessenger/FloatingMessengerRoot/FloatingMessengerRoot';
import LoginRegistration from './components/routed/Unauthorized/LoginRegistration';
function App() {
	const location = useLocation();

	React.useEffect(() => {

	}, [])
	return (
		<div className="App">
			{/* <NavBar />
			<SlideInMessagesRoot />
			<NotificationListRoot /> */}
			<Routes>
				<Route path='/' element={<LoginRegistration />} />

				{/* <Route path='/' element={<Home />} /> */}
				{/* <Route path='/profile'>
					<Route path=':userId/*' element={<UserProfileRoot />} />
				</Route>
				<Route path='/messenger'>
					<Route path=':conversationId' element={<MessengerRoot />} />
				</Route>
				<Route path='/post'>
					<Route path=':id' element={<PostDetailsRoot />} />
				</Route>
					{!location.pathname.startsWith('/messenger') &&
				<FloatingMessengerRoot />}
				*/}

			</Routes>


		</div>
	);
}

export default App;
