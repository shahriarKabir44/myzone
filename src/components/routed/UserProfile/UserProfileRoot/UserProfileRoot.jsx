import React from 'react';
import { useDispatch } from 'react-redux'
import { setToggleFunction } from '../../../../redux/HomeMenuSelector'

import LeftMenu from '../../../Home/LeftMenu/LeftMenu';
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
    const sideBarTogglerDispatcher = useDispatch()

    const [isOnMobile, seDeviceType] = React.useState(false)
    const [shouldToggleLeftMenu, setToggleType] = React.useState(0)
    let handlerObject = {
        handler: function (data) {
            if (data === 1) {
                setToggleType(1)
            }
            else {
                setToggleType(-1)
            }
        }
    }

    React.useEffect(() => {
        sideBarTogglerDispatcher(setToggleFunction({ toggleHandler: handlerObject }))

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