import React from 'react';
import './NavBar.css'
import SocketSubscriptionManager from '../../../services/SocketSubscriptionManager'
import Globals from '../../../services/Globals'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'; import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AppsSharpIcon from '@mui/icons-material/AppsSharp';
import NotificationsSharpIcon from '@mui/icons-material/NotificationsSharp';
import { toggleLeftMenu, closeLeftMenu, setToggleStatus } from '../../../redux/HomeMenuSelector'
import { toggleFriendRequestTrayView, closeFriendRequestTrayView } from '../../../redux/FriendRequestToggleManager'
import { toggleConversationListView, closeConversationListView } from '../../../redux/ConversatinListToggleManager'
import { toggleNotificationTrayView, closeNotificationTrayView } from '../../../redux/NotificationTrayToggleManager'
import UserService from '../../../services/UserServices';

function NavBar(props) {
    const fiendRequestTrayViewToggleDispatcher = useDispatch()
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = React.useState('')
    const sideBarToggleStatusDispatcher = useDispatch()
    const notificationTrayToggleDispatcher = useDispatch()
    const location = useLocation();
    const socketRef = React.useRef()
    const currentUser = useSelector((state) => state.currentUser.value)
    const toggleSlideInConversationList = useDispatch()


    function getSearchQuery() {
        if (location.pathname.startsWith('/search')) {
            let tempPath = location.pathname.split('/')[2]
            const query = tempPath.split('=')[1]
            setSearchQuery(query)
        }
    }
    const [missedNotificationCount, setMissedNotificationCount] = React.useState(0)
    const [missedFrientRequestCount, setMissedFrientRequestCount] = React.useState(0)
    const [missedMessagestCount, setMissedMessagesCount] = React.useState(0)

    function updateNumMissedNotificationsUtil() {
        UserService.getNumMissedNotifications(currentUser.Id)
            .then(({ numMissedNotifications }) => {
                setMissedNotificationCount(numMissedNotifications.numUnseenNotification)
                setMissedFrientRequestCount(numMissedNotifications.numNewFriendRequests)

            })
    }
    function updateNumMissedNotifications() {
        updateNumMissedNotificationsUtil()
        UserService.getNumUnreadMessages(currentUser.Id)
            .then(({ numUnreadMessages }) => {
                setMissedMessagesCount(numUnreadMessages)
            })

    }
    React.useEffect(() => {
        getSearchQuery()
        updateNumMissedNotifications()
        if (location.pathname.startsWith('/messenger')) {
            toggleSlideInConversationList(toggleConversationListView())

        }
        socketRef.current = Globals.socket
        socketRef.current.onmessage = e => {
            SocketSubscriptionManager.sendMessages(JSON.parse(e.data))
            const message = JSON.parse(e.data)
            if (message.type === 'notification' || message.type === 'friendRequest') {
                updateNumMissedNotificationsUtil()
            }
        }

    }, [])
    function closeAll(toIgnore) {
        if (toIgnore !== 1) sideBarToggleStatusDispatcher(closeLeftMenu())
        if (toIgnore !== 2) notificationTrayToggleDispatcher(closeNotificationTrayView())
        if (toIgnore !== 3)
            toggleSlideInConversationList(closeConversationListView())
        if (toIgnore !== 4) {
            fiendRequestTrayViewToggleDispatcher(closeFriendRequestTrayView())
        }
    }
    function openDrawer(type = 1) {
        closeAll(1)
        sideBarToggleStatusDispatcher(toggleLeftMenu())

    }
    function renderHeaderBtn() {
        return (<Link style={{ textDecoration: 'none' }} to={'/'}>
            <button className="siteName">
                <img src="/logo2.png" alt="" style={{
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
                        <input value={searchQuery} onChange={e => {
                            setSearchQuery(e.target.value)
                        }} type="text" placeholder='search' name="" id="" className="searchBarInput" />
                        <div onClick={() => {
                            navigate('search/query=' + searchQuery)
                        }} style={{
                            margin: 0
                        }}><SearchOutlinedIcon className='searchBtn' />
                        </div>
                    </div>
                    <div className="otherOptions">
                        {location.pathname !== '/' && <div onClick={() => {
                            sideBarToggleStatusDispatcher(setToggleStatus(1))
                        }}>
                            <AppsSharpIcon fontSize='10' className="menuBtn menuButton" /></div>}
                        <div style={{
                            position: 'relative'
                        }} onClick={() => {
                            setMissedFrientRequestCount(0)
                            closeAll(4)
                            fiendRequestTrayViewToggleDispatcher(toggleFriendRequestTrayView())
                        }}>
                            {missedFrientRequestCount !== 0 && <div className='alertingNumber'>
                                {missedFrientRequestCount}</div>}
                            <GroupAddIcon fontSize='10' className="menuBtn messageBtn" />
                        </div>
                        <div style={{
                            position: 'relative'
                        }} onClick={() => {
                            closeAll(3)
                            setMissedMessagesCount(0)
                            if (!location.pathname.startsWith('/messenger'))
                                toggleSlideInConversationList(toggleConversationListView())
                        }}>
                            {missedMessagestCount !== 0 && <div className='alertingNumber'>
                                {missedMessagestCount}</div>}
                            <QuestionAnswerOutlinedIcon fontSize='10' className="menuBtn messageBtn" />

                        </div>
                        <div style={{
                            position: 'relative',
                        }} onClick={() => {
                            closeAll(2)
                            setMissedNotificationCount(0)
                            notificationTrayToggleDispatcher(toggleNotificationTrayView())
                        }}>
                            {missedNotificationCount !== 0 && <div className='alertingNumber'>
                                {missedNotificationCount}</div>}
                            <NotificationsSharpIcon fontSize='10' className="menuBtn notifBtn" />

                        </div>
                        <Link to={"/profile/" + currentUser.Id}>
                            <button className="menuBtn profileBtn">
                                <img className='profileImageNavBar' src={Globals.SERVER_URL + currentUser.profileImage} alt="profile pic" />
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
                                <img className='profileImageNavBar' src={Globals.SERVER_URL + currentUser.profileImage} alt="profile pic" />
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
                        <div>
                            <GroupAddIcon fontSize='10' className="menuBtn  menuButton "></GroupAddIcon>
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