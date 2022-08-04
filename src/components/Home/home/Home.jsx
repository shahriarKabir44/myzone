import React from 'react';
import NavBar from '../../shared/NavBar/NavBar';
import ActiveUsersList from '../ActiveUsersList/ActiveUsersList';
import PostListRoot from '../postList/postListRoot/PostListRoot';
import LeftMenu from '../LeftMenu/LeftMenu'
import './Home.css'
import WebWorkerManager from '../../../workerManagers/WebWorkerManager';
function Home(props) {

    const [isOnMobile, seDeviceType] = React.useState(false)
    const [focusedViewOnMovile, setFocusedViewOnMobile] = React.useState(1)
    const worker = WebWorkerManager.worker
    if (worker) {
        worker.onmessage = e => {
            if (e.data.type === "ChangeHomeView") {
                setFocusedViewOnMobile(e.data.value)
            }
        }
    }
    else {
        WebWorkerManager.initWorker()
        worker.onmessage = e => {
            if (e.data.type === "ChangeHomeView") {
                setFocusedViewOnMobile(e.data.value)
            }
        }
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
                    {focusedViewOnMovile === 0 && <LeftMenu />}
                    {focusedViewOnMovile === 1 && <PostListRoot />}
                </div>
            </div>}
        </div>
    );
}

export default Home;