import React from 'react';
import Home from './components/Home/home/Home'
import WebWorkerManager from './workerManagers/WebWorkerManager';
import NavBar from './components/shared/NavBar/NavBar'
import {

	Routes,
	Route,
} from "react-router-dom";
import UserProfileRoot from './components/routed/UserProfile/UserProfileRoot/UserProfileRoot';
function App() {
	const worker = WebWorkerManager.worker
	React.useEffect(() => {
		if (!worker)
			WebWorkerManager.initWorker()
	}, [worker])
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
