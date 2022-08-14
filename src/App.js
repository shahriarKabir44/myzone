import React from 'react';
import Home from './components/Home/home/Home'
import NavBar from './components/shared/NavBar/NavBar'
import {

	Routes,
	Route,
} from "react-router-dom";
import UserProfileRoot from './components/routed/UserProfile/UserProfileRoot/UserProfileRoot';
function App() {
	React.useEffect(() => {

	}, [])
	return (
		<div className="App">
			<NavBar />

			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='profile'>
					<Route path=':userId' element={<UserProfileRoot />} />
				</Route>
			</Routes>



		</div>
	);
}

export default App;
