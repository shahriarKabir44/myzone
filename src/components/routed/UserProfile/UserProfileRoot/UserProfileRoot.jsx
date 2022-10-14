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
import { useInView } from 'react-intersection-observer';

import ProfileTabSelector from '../shared/ProfileTabSelector/ProfileTabSelector';
import InterestList from '../routeGroups/ProfileHome/InterestList/InterestList';
import FeaturedPostGroupRoot from '../routeGroups/ProfileHome/FeaturedPostGroup/FeaturedPostGroupRoot/FeaturedPostGroupRoot';
import FriendListRoot from '../routeGroups/FriendList/FriendListRoot/FriendListRoot';
import UserService from '../../../../service/UserServices';

function UserProfileRoot(props) {
    const [user, setUser] = React.useState({})
    const sideBarToggleStatusrDispatcher = useDispatch()
    const setFocusedUserDispatcher = useDispatch()
    const currentRoute = useParams()
    const [isOnMobile, seDeviceType] = React.useState(false)
    const toggleSideMenuStatus = useSelector(state => state.currentlySelectedView.value.toggleStatus)
    const [createsPosts, setCreatedPostList] = React.useState([])
    const [featuredAlbums, setFeaturedPhotos] = React.useState([])
    function getUserInfo(Id) {
        UserService.getUserProfileInfo(Id)
            .then((data) => {
                let userInfo = {
                    Id: currentRoute.userId,
                    name: data.name + "",
                    profileImage: data.profileImage,
                    coverPhoto: data.coverPhoto,
                    numFriends: data.numFriends,
                }
                setFeaturedPhotos(data.featuredAlbums)
                setUser(userInfo)
                setCreatedPostList(data.createdPosts)
                setFocusedUserDispatcher(updateCurrentlyViewingUser(userInfo))
            })
    }
    const { ref, inView } = useInView({

        threshold: 0,
    });
    React.useEffect(() => {

        getUserInfo(currentRoute.userId)

        seDeviceType(window.innerWidth <= 620)
        sideBarToggleStatusrDispatcher(setToggleStatus(-2))


    }, [currentRoute]);


    return (

        <div>

            {!isOnMobile && <div className="profileViewLargeScreen">


                <div className="postsView">

                    <Routes>
                        <Route path='home' element={
                            <>
                                <div ref={ref}>
                                    <UserProfileInfo userInfo={user} />
                                </div>




                                <ProfileTabSelector shouldShowUserInfo={inView} pageIndex={1} />
                                <div className={`gridContainer `}>

                                    <div>
                                        <FeaturedPostGroupRoot featuredAlbums={featuredAlbums} />
                                    </div>
                                    <div>


                                        <InitialCreatePostView />
                                        <UserPostListRoot createsPosts={createsPosts} />
                                    </div>
                                    <InterestList />
                                </div>
                            </>

                        } />
                        <Route path='friends' element={<FriendListRoot shouldShowUserInfo={inView} intersectionObserverRef={ref} />} />
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
                                <FeaturedPostGroupRoot featuredAlbums={featuredAlbums} />
                                <InitialCreatePostView />

                                <UserPostListRoot createsPosts={createsPosts} />
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