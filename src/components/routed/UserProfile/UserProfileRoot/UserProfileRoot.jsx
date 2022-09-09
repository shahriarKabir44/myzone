import React from 'react';
import { useSelector } from 'react-redux';
import './UserProfileRoot.css'
import LeftMenu from '../../Home/LeftMenu/LeftMenu';
import UserPostListRoot from '../routeGroups/ProfileHome/UserPostsList/UserPostListRoot';
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
import InterestList from '../routeGroups/ProfileHome/InterestList/InterestList';
import FeaturedPostGroupRoot from '../routeGroups/ProfileHome/FeaturedPostGroup/FeaturedPostGroupRoot/FeaturedPostGroupRoot';
import FriendListRoot from '../routeGroups/FriendList/FriendListRoot/FriendListRoot';

function UserProfileRoot(props) {
    const user = useSelector((state) => state.currentUser.value)
    const sideBarToggleStatusrDispatcher = useDispatch()
    const setFocusedUserDispatcher = useDispatch()
    const currentRoute = useParams()
    const [isOnMobile, seDeviceType] = React.useState(false)
    const toggleSideMenuStatus = useSelector(state => state.currentlySelectedView.value.toggleStatus)

    function setCurrentlyFocusedUser() {
        setFocusedUserDispatcher(updateCurrentlyViewingUser({
            Id: currentRoute.userId,
            name: user.name
        }))

    }

    React.useEffect(() => {
        setCurrentlyFocusedUser()

        seDeviceType(window.innerWidth <= 620)
        sideBarToggleStatusrDispatcher(setToggleStatus(-2))
    }, [])
    return (

        <div>

            {!isOnMobile && <div className="profileViewLargeScreen">


                <div className="postsView">

                    <Routes>
                        <Route path='home' element={
                            <>
                                <UserProfileInfo userInfo={user} />
                                <ProfileTabSelector pageIndex={1} />
                                <div className="gridContainer">

                                    <div>
                                        <FeaturedPostGroupRoot />
                                    </div>
                                    <div>


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
                        <Routes>
                            <Route path="home" element={<>
                                <UserProfileInfo userInfo={user} />
                                <ProfileTabSelector pageIndex={1} />
                                <InterestList />
                                <FeaturedPostGroupRoot />
                                <InitialCreatePostView />

                                <UserPostListRoot />
                            </>}>

                            </Route>
                            <Route path='friends' element={<FriendListRoot />} />
                            <Route path='/' element={<Navigate to="home" />} />
                        </Routes>

                    </div>

                </div>
            </div>}
        </div>

    );
}

export default UserProfileRoot;