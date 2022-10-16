import React from 'react';
import './App.css'
import Globals from './service/Globals'

import {
	useNavigate,
	Routes,
	Route,
	useLocation
} from "react-router-dom";
import Home from './components/routed/Home/home/Home'
import NavBar from './components/shared/NavBar/NavBar'
import { useDispatch, useSelector } from 'react-redux';
import UserProfileRoot from './components/routed/UserProfile/UserProfileRoot/UserProfileRoot';
import SlideInMessagesRoot from './components/shared/SlideInMessageContainer/SlideInMessagesRoot/SlideInMessagesRoot';
import NotificationListRoot from './components/shared/SlideInNotificationsContainer/NotificationListRoot/NotificationListRoot';
import PostDetailsRoot from './components/routed/PostDetails/PostDetailsRoot/PostDetailsRoot';
import MessengerRoot from './components/routed/Messenger/MessengerRoot/MessengerRoot';
import FloatingMessengerRoot from './components/shared/FloatingMessenger/FloatingMessengerRoot/FloatingMessengerRoot';
import LoginRegistration from './components/routed/Unauthorized/LoginRegistration';
import UserService from './service/UserServices';
import { updateUserInfo } from './redux/CurrentUserManager'
import PhotoFeaturingContainer from './components/routed/PhotoFeaturingContainer/PhotoFeaturingContainer';
import SearchResultRoot from './components/routed/SearchResultRoot/SearchResultRoot';
import FriendRequestContainer from './components/shared/FriendRequestContainer/FriendRequestContainer';
import LogoutEventManager from './service/LogOutEventManager';
import FloatingMenu from './components/shared/FloatingMenu/FloatingMenu';
import FindFriends from './components/routed/FindFriends/FindFriends';
import EditPostModal from './components/shared/CreatePost/CreatePostModal/EditPostModal';
function App() {
	const navigate = useNavigate()
	const location = useLocation();
	const currentser = useSelector(state => state.currentUser.value)
	const setCurrentUserDispatch = useDispatch()
	const [hasUserInfoLoaded, setUserInfoLoadingStatus] = React.useState(false)
	React.useEffect(() => {
		LogoutEventManager.subscribe({
			handleLogout: () => {

				setCurrentUserDispatch(updateUserInfo(null))
				navigate('/')
			}
		})
		UserService.isAuthorized()
			.then(({ user }) => {


				if (!user) {
					setUserInfoLoadingStatus(true)
					navigate('/')

				}
				else {
					Globals.initSocket(user.Id)
					setTimeout(() => {
						setUserInfoLoadingStatus(true)
						setCurrentUserDispatch(updateUserInfo(user))
					}, 300)
				}

			})

	}, [])
	function onAuthorized(user) {
		Globals.initSocket(user.Id)
		setTimeout(() => {
			setCurrentUserDispatch(updateUserInfo(user))
		}, 300)
	}
	return (
		<div className="App">
			{hasUserInfoLoaded && <>
				{currentser !== null && <><NavBar />
					<SlideInMessagesRoot />
					<NotificationListRoot />
					<FriendRequestContainer />
					{window.innerWidth >= 620 && <FloatingMenu />}
					<EditPostModal />
				</>}

				<Routes>
					{currentser == null && <Route path='/' element={<LoginRegistration onAuthorized={(user) => {
						onAuthorized(user)
					}} />} />}


					{currentser != null && <>
						<Route path='/' element={<Home />} />
						<Route path='/profile'>
							<Route path=':userId/*' element={<UserProfileRoot />} />
						</Route>
						<Route path='/search' >
							<Route path='query=:query/*' element={<SearchResultRoot />} />
						</Route>
						<Route path='/featured'>
							<Route path=':groupId/*' element={<PhotoFeaturingContainer />} />
						</Route>
						<Route path='/findFriends' element={<FindFriends />} />
						<Route path='/messenger'>
							<Route path=':conversationId' element={<MessengerRoot />} />
						</Route>
						<Route path='/post'>
							<Route path=':Id' element={<PostDetailsRoot />} />
						</Route>

					</>}

				</Routes>

				{!location.pathname.startsWith('/messenger') && currentser !== null &&
					<FloatingMessengerRoot />}
			</>}
		</div>
	);
}

export default App;
