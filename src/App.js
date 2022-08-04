import React from 'react';
import Home from './components/Home/home/Home'
import WebWorkerManager from './workerManagers/WebWorkerManager';
function App() {
	const worker = WebWorkerManager.worker
	React.useEffect(() => {
		if (!worker)
			WebWorkerManager.initWorker()
	}, [worker])
	return (
		<div className="App">
			<Home />
		</div>
	);
}

export default App;
