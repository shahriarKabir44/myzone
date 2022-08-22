import React from 'react';
import { useSelector } from 'react-redux';
import './UserProfileRoot.css'
import LeftMenu from '../../../Home/LeftMenu/LeftMenu';
import UserPostListRoot from '../routeGroupes/ProfileHome/UserPostsList/UserPostListRoot';
import InitialCreatePostView from '../../../shared/CreatePost/InitialView/InitialCreatePostView';
import UserProfileInfo from '../shared/UserProfileInfo/UserProfileInfo';
import { useDispatch } from 'react-redux'
import { setToggleStatus } from '../../../../redux/HomeMenuSelector'
import { updateCurrentlyViewingUser } from '../../../../redux/CurrentUserManager'
import { Navigate, useParams } from 'react-router-dom';
import {
    Routes,
    Route

} from "react-router-dom";
import ProfileTabSelector from '../shared/ProfileTabSelector/ProfileTabSelector';
import InterestList from '../routeGroupes/ProfileHome/InterestList/InterestList';
import FeaturedPostGroupRoot from '../routeGroupes/ProfileHome/FeaturedPostGroup/FeaturedPostGroupRoot/FeaturedPostGroupRoot';
import FriendListRoot from '../routeGroupes/FriendList/FriendListRoot/FriendListRoot';

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
    }, [])
    return (

        <div>

            {!isOnMobile && <div className="profileViewLargeScreen">


                <div className="postsView">

                    <Routes>
                        <Route path='home' element={
                            <>
                                <UserProfileInfo userInfo={user} />
                                <div className="gridContainer">

                                    <div>
                                        <FeaturedPostGroupRoot />
                                    </div>
                                    <div>

                                        <ProfileTabSelector />
                                        <InitialCreatePostView />
                                        <UserPostListRoot />
                                    </div>
                                    <InterestList />
                                </div>
                            </>

                        } />
                        <Route path='friends' element={<FriendListRoot />} />
                        <Route path='/' element={<Navigate to="home" />} />
                    </Routes>





                </div>


            </div>}
            {isOnMobile && <div className="smallScreen">
                <div className="mainViewSmall">
                    <div className={`slideLeftMenu ${toggleSideMenuStatus === 1 ? "slideRight" : toggleSideMenuStatus === 0 ? "slideLeft" : ""}`}>
                        <LeftMenu />
                    </div>
                    <div className='postsView'>
                        <UserProfileInfo userInfo={user} />
                        <ProfileTabSelector />
                        <InterestList />
                        <FeaturedPostGroupRoot />
                        <InitialCreatePostView />

                        <UserPostListRoot />
                    </div>

                </div>
            </div>}
        </div>

    );
}

export default UserProfileRoot;