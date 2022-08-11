import React from 'react';
import LeftMenu from '../../../Home/LeftMenu/LeftMenu';
import WebWorkerManager from '../../../../workerManagers/WebWorkerManager';
import UserPostListRoot from '../UserPostsList/UserPostListRoot';
import InitialCreatePostView from '../../../shared/CreatePost/InitialView/InitialCreatePostView';
import UserProfileInfo from '../UserProfileInfo/UserProfileInfo';
const stockImageURL = "https://imageio.forbes.com/specials-images/imageserve/6109550f1aa8564670194ad4/Close-up-smiling-businesswoman-holding-computer-tablet--looking-to-side/960x0.jpg?format=jpg&width=960"

const user = {
    name: "Shahriar Kabir",
    profileImage: stockImageURL,
    coverPhoto: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sunset-quotes-21-1586531574.jpg",

}

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

        WebWorkerManager.worker.onmessage = e => handleWorkerMessage(e)
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
                <div className=''>
                    <UserProfileInfo userInfo={user} />
                    <div className="postsViewProfile">
                        <InitialCreatePostView />
                        <UserPostListRoot />
                    </div>

                </div>
            </div>}
            {isOnMobile && <div className="smallScreen">
                <div className="mainViewSmall">
                    <div className={`slideLeftMenu ${shouldToggleLeftMenu === 1 ? "slideRight" : shouldToggleLeftMenu === -1 ? "slideLeft" : ""}`}>
                        <LeftMenu />
                    </div>
                    <div className='postsView'>
                        <UserProfileInfo userInfo={user} />
                        <InitialCreatePostView />
                        <UserPostListRoot />
                    </div>

                </div>
            </div>}
        </div>
    );
}

export default UserProfileRoot;