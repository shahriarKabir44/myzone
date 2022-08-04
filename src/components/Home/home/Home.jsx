import React from 'react';
import NavBar from '../../shared/NavBar/NavBar';
import ActiveUsersList from '../ActiveUsersList/ActiveUsersList';
import PostListRoot from '../postList/postListRoot/PostListRoot';
import LeftMenu from '../LeftMenu/LeftMenu'
import './Home.css'
import WebWorkerManager from '../../../workerManagers/WebWorkerManager';

function Home(props) {

    const [isOnMobile, seDeviceType] = React.useState(false)
    const [focusedViewOnMobile, setFocusedViewOnMobile] = React.useState(1)
    const [shouldToggleLeftMenu, setToggleType] = React.useState(0)
    const worker = WebWorkerManager.worker
    function handleWorkerMessage(e) {
        if (e.data.type === "ChangeHomeView") {
            console.log(focusedViewOnMobile, e.data.value)
            if (focusedViewOnMobile === 0 && e.data.value === 1) {
                setToggleType(-1)
            }
            else if (focusedViewOnMobile === 1 && e.data.value === 0) {
                setToggleType(1)
            }
            setFocusedViewOnMobile(e.data.value)

        }
    }
    if (worker) {
        worker.onmessage = e => handleWorkerMessage(e)
    }
    else {
        WebWorkerManager.initWorker()
        worker.onmessage = e => handleWorkerMessage(e)
    }
    React.useEffect(() => {
        seDeviceType(window.innerWidth <= 620)
    }, [])
    return (
        <div>
            <NavBar />
            {!isOnMobile && <div className="largeScreen">
                <div className="mainView">
                    <div  >
                        <LeftMenu />
                    </div>
                    <div >
                        <PostListRoot />
                    </div>
                    <div >
                        <ActiveUsersList />
                    </div>
                </div>
            </div>}
            {isOnMobile && <div className="smallScreen">
                <div className="mainViewSmall">
                    <div className={`slideLeftMenu ${shouldToggleLeftMenu === 1 ? "slideRight" : shouldToggleLeftMenu === -1 ? "slideLeft" : ""}`}>
                        <LeftMenu /> </div>
                    <PostListRoot />
                </div>
            </div>}
        </div>
    );
}

export default Home;