import React from 'react';
import './NavBar.css'
import SocketSubscriptionManager from '../../../service/SocketSubscriptionManager'
import Globals from '../../../service/Globals'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'; import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AppsSharpIcon from '@mui/icons-material/AppsSharp';
import NotificationsSharpIcon from '@mui/icons-material/NotificationsSharp';
import { toggleLeftMenu, closeLeftMenu } from '../../../redux/HomeMenuSelector'
import useNotifications from '../../../service/useNotifications'
import { toggleConversationListView, closeConversationListView } from '../../../redux/ConversatinListToggleManager'
import { toggleNotificationTrayView, closeNotificationTrayView } from '../../../redux/NotificationTrayToggleManager'
function NavBar(props) {
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = React.useState('')
    const sideBarToggleStatusDispatcher = useDispatch()
    const notificationTrayToggleDispatcher = useDispatch()
    const location = useLocation();
    const socketRef = React.useRef()
    const currentUser = useSelector((state) => state.currentUser.value)
    const toggleSlideInConversationList = useDispatch()
    const [hasNewNotificationArrived, setNewNotificationArrivalState] = React.useState(false)
    const { subscribe: subscribeUseNotification } = useNotifications('navBar', (notification) => {
        setNewNotificationArrivalState(true)
    })
    function getSearchQuery() {
        if (location.pathname.startsWith('/search')) {
            let tempPath = location.pathname.split('/')[2]
            const query = tempPath.split('=')[1]
            setSearchQuery(query)
        }
    }
    React.useEffect(() => {
        getSearchQuery()
        subscribeUseNotification()
        if (location.pathname.startsWith('/messenger')) {
            toggleSlideInConversationList(toggleConversationListView())

        }
        socketRef.current = Globals.socket
        socketRef.current.onmessage = e => {
            SocketSubscriptionManager.sendMessages(JSON.parse(e.data))
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
                <img src="http://localhost:3000/logo2.png" alt="" style={{
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
                        {location.pathname !== '/' && <AppsSharpIcon fontSize='10' className="menuBtn menuButton" />}
                        <div onClick={() => { }}>
                            <GroupAddIcon fontSize='10' className="menuBtn messageBtn" />
                        </div>
                        <div onClick={() => {
                            closeAll(3)
                            if (!location.pathname.startsWith('/messenger'))
                                toggleSlideInConversationList(toggleConversationListView())
                        }}>
                            <QuestionAnswerOutlinedIcon fontSize='10' className="menuBtn messageBtn" />

                        </div>
                        <div style={{
                            position: 'relative',
                        }} onClick={() => {
                            setNewNotificationArrivalState(false)
                            closeAll(2)
                            notificationTrayToggleDispatcher(toggleNotificationTrayView())
                        }}>
                            {hasNewNotificationArrived && <PriorityHighIcon style={{
                                position: 'absolute',
                                color: 'red',
                                right: "5px"
                            }} />}
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
                        <div>
                            <GroupAddIcon></GroupAddIcon>
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