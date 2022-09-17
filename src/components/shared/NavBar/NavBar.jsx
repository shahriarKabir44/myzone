import React from 'react';
import './NavBar.css'
import { Link, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AppsSharpIcon from '@mui/icons-material/AppsSharp';
import NotificationsSharpIcon from '@mui/icons-material/NotificationsSharp';
import { toggleLeftMenu, closeLeftMenu } from '../../../redux/HomeMenuSelector'
import { toggleConversationListView, closeConversationListView } from '../../../redux/ConversatinListToggleManager'
import { toggleNotificationTrayView, closeNotificationTrayView } from '../../../redux/NotificationTrayToggleManager'
function NavBar(props) {
    const sideBarToggleStatusDispatcher = useDispatch()
    const notificationTrayToggleDispatcher = useDispatch()
    const location = useLocation();
    const currentUser = useSelector((state) => state.currentUser.value)
    const toggleSlideInConversationList = useDispatch()
    React.useEffect(() => {
        if (location.pathname.startsWith('/messenger')) {
            toggleSlideInConversationList(toggleConversationListView())

        }

    }, [])
    function closeAll(toIgnore) {
        if (toIgnore !== 1) sideBarToggleStatusDispatcher(closeLeftMenu())
        if (toIgnore !== 2) notificationTrayToggleDispatcher(closeNotificationTrayView())
        if (toIgnore !== 3)
            toggleSlideInConversationList(closeConversationListView())
    }
    function openDrawer(type = 1) {
        closeAll(1)
        sideBarToggleStatusDispatcher(toggleLeftMenu())

    }
    function renderHeaderBtn() {
        return (<Link style={{ textDecoration: 'none' }} to={'/'}>
            <button className="siteName">
                <img src="http://192.168.43.90:3000/logo2.png" alt="" style={{
                    width: "100%"
                }} className="" />
            </button>
        </Link>)

    }
    return (
        <div className="navBarContainer">
            <div className="largeScreen">
                <div className='nabvarRoot '>
                    {renderHeaderBtn()}

                    <div className="searchBar">
                        <input type="text" name="" id="" className="searchBarInput" />
                        <SearchOutlinedIcon className='searchBtn' />
                    </div>
                    <div className="otherOptions">
                        <AppsSharpIcon fontSize='10' className="menuBtn menuButton" />
                        <div onClick={() => {
                            closeAll(3)
                            if (!location.pathname.startsWith('/messenger'))
                                toggleSlideInConversationList(toggleConversationListView())
                        }}>
                            <QuestionAnswerOutlinedIcon fontSize='10' className="menuBtn messageBtn" />

                        </div>
                        <div onClick={() => {
                            closeAll(2)
                            notificationTrayToggleDispatcher(toggleNotificationTrayView())
                        }}>
                            <NotificationsSharpIcon fontSize='10' className="menuBtn notifBtn" />

                        </div>
                        <Link to={"/profile/" + currentUser.Id}>
                            <button className="menuBtn profileBtn">
                                <img className='profileImageNavBar' src={currentUser.profileImage} alt="profile pic" />
                            </button>
                        </Link>


                    </div>
                </div></div>

            <div className="smallScreen">
                <div className='nabvarRootSmall '>
                    <div onClick={() => {
                        closeAll(5)
                        openDrawer(0)

                    }} className="siteHeadingSmall">
                        {renderHeaderBtn()}
                        <Link to={"/profile/" + currentUser.Id}>
                            <button className="menuBtn profileBtn">
                                <img className='profileImageNavBar' src={currentUser.profileImage} alt="profile pic" />
                            </button>
                        </Link>
                    </div>

                    <div className="otherOptionsSmall">
                        <div onClick={() => {
                            closeAll(1)
                            openDrawer()
                        }}>
                            <AppsSharpIcon fontSize='10' className="menuBtn  menuButton " />
                        </div>
                        <div onClick={() => {
                            closeAll(3)
                            toggleSlideInConversationList(toggleConversationListView())
                        }}>
                            <QuestionAnswerOutlinedIcon className="menuBtn messageBtn " fontSize='10' />

                        </div>
                        <div onClick={() => {
                            closeAll(2)
                            notificationTrayToggleDispatcher(toggleNotificationTrayView())
                        }}>
                            <NotificationsSharpIcon fontSize='10' className="menuBtn notifBtn" />

                        </div>
                        <SearchOutlinedIcon fontSize='10' className='searchBtn menuBtn' />

                    </div>
                </div></div>

        </div>
    );
}

export default NavBar;