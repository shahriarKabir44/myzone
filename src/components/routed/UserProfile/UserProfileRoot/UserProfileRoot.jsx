import React from 'react';
import { useSelector } from 'react-redux';
import './UserProfileRoot.css'
import LeftMenu from '../../../Home/LeftMenu/LeftMenu';
import UserPostListRoot from '../UserPostsList/UserPostListRoot';
import InitialCreatePostView from '../../../shared/CreatePost/InitialView/InitialCreatePostView';
import UserProfileInfo from '../UserProfileInfo/UserProfileInfo';
import { useDispatch } from 'react-redux'
import { setToggleStatus } from '../../../../redux/HomeMenuSelector'
import { updateCurrentlyViewingUser } from '../../../../redux/CurrentUserManager'
import { useParams } from 'react-router-dom';
import ProfileTabSelector from '../ProfileTabSelector/ProfileTabSelector';

function UserProfileRoot(props) {
    const user = useSelector((state) => state.currentUser.value)
    const sideBarToggleStatusrDispatcher = useDispatch()
    const setFocusedUserDispatcher = useDispatch()
    const currentRoute = useParams()
    const [isOnMobile, seDeviceType] = React.useState(false)
    const toggleSideMenuStatus = useSelector(state => state.currentlySelectedView.value.toggleStatus)

    function setCurrentlyFocusedUser() {
        setFocusedUserDispatcher(updateCurrentlyViewingUser({
            id: currentRoute.userId,
            name: user.name
        }))

    }

    React.useEffect(() => {
        setCurrentlyFocusedUser()
        seDeviceType(window.innerWidth <= 620)
        sideBarToggleStatusrDispatcher(setToggleStatus(2))
    }, [sideBarToggleStatusrDispatcher])
    return (
        <div>

            {!isOnMobile && <div className="profileViewLargeScreen">


                <div className="postsViewProfile">
                    <UserProfileInfo userInfo={user} />
                    <InitialCreatePostView />
                    <ProfileTabSelector />
                    <UserPostListRoot />
                </div>


            </div>}
            {isOnMobile && <div className="smallScreen">
                <div className="mainViewSmall">
                    <div className={`slideLeftMenu ${toggleSideMenuStatus === 1 ? "slideRight" : toggleSideMenuStatus === 0 ? "slideLeft" : ""}`}>
                        <LeftMenu />
                    </div>
                    <div className='postsView'>
                        <UserProfileInfo userInfo={user} />
                        <InitialCreatePostView />
                        <ProfileTabSelector />
                        <UserPostListRoot />
                    </div>

                </div>
            </div>}
        </div>
    );
}

export default UserProfileRoot;