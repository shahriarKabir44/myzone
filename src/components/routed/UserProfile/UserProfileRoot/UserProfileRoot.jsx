import React from 'react';
import LeftMenu from '../../../Home/LeftMenu/LeftMenu';
import WebWorkerManager from '../../../../workerManagers/WebWorkerManager';
import UserPostListRoot from '../UserPostsList/UserPostListRoot';
import InitialCreatePostView from '../../../shared/CreatePost/InitialView/InitialCreatePostView';
function UserProfileRoot(props) {
    const [isOnMobile, seDeviceType] = React.useState(false)
    const [focusedViewOnMobile, setFocusedViewOnMobile] = React.useState(1)
    const [shouldToggleLeftMenu, setToggleType] = React.useState(0)

    const worker = WebWorkerManager.worker
    function handleWorkerMessage(e) {
        if (e.data.type === "ChangeHomeView") {
            if (focusedViewOnMobile === 0 && e.data.value === 1) {
                setToggleType(-1)

                setFocusedViewOnMobile(e.data.value)
            }
            else if (focusedViewOnMobile === 1 && e.data.value === 0) {
                setToggleType(1)
                setFocusedViewOnMobile(e.data.value)
            }
            else if (focusedViewOnMobile === 0 && e.data.value === 0) {
                setToggleType(-1)
                setFocusedViewOnMobile(1)
            }

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
            {!isOnMobile && <div className="profileViewLargeScreen">

            </div>}
            {isOnMobile && <div className="smallScreen">
                <div className="mainViewSmall">
                    <div className={`slideLeftMenu ${shouldToggleLeftMenu === 1 ? "slideRight" : shouldToggleLeftMenu === -1 ? "slideLeft" : ""}`}>
                        <LeftMenu />
                    </div>
                    <div>
                        <InitialCreatePostView />
                        <UserPostListRoot />
                    </div>

                </div>
            </div>}
        </div>
    );
}

export default UserProfileRoot;