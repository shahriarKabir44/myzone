import React from 'react';
import './NavBar.css'
import { Link, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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
    const currentlyFocusedUser = useSelector(state => state.currentUser.currentlyViewingProfile)
    React.useEffect(() => {


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
        if (location.pathname === "/") return (<Link style={{ textDecoration: 'none' }} to={'/'}>
            <button className="siteName">
                <p className="siteNameTxt">MyZone</p>
            </button>
        </Link>)
        else if (location.pathname.startsWith('/profile')) {
            return <Link style={{ textDecoration: 'none' }} to={'/'}>
                <button className="siteName">
                    <ArrowBackIcon />
                    <p className="siteNameTxt">{currentlyFocusedUser.name}</p>
                </button>
            </Link>
        }
        else if (location.pathname.startsWith('/post')) {
            return <Link style={{ textDecoration: 'none' }} to={'/'}>
                <button className="siteName">
                    <ArrowBackIcon />
                    <p className="siteNameTxt">Post details</p>
                </button>
            </Link>
        }
        else if (location.pathname.startsWith('/messenger')) {
            return <Link style={{ textDecoration: 'none' }} to={'/'}>
                <button className="siteName">
                    <ArrowBackIcon />
                    <p className="siteNameTxt">Messenger</p>
                </button>
            </Link>
        }
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
                        <Link to={"/profile/" + currentUser.id}>
                            <button className="menuBtn profileBtn">
                                <img className='profileImageNavBar' src={currentUser.profileImageURL} alt="profile pic" />
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
                        <Link to={"/profile/" + currentUser.id}>
                            <button className="menuBtn profileBtn">
                                <img className='profileImageNavBar' src={currentUser.profileImageURL} alt="profile pic" />
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