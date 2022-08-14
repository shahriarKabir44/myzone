import React from 'react';
import './NavBar.css'
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'

import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AppsSharpIcon from '@mui/icons-material/AppsSharp';
import NotificationsSharpIcon from '@mui/icons-material/NotificationsSharp';
import { setToggleStatus } from '../../../redux/HomeMenuSelector'
function NavBar(props) {
    const sideBarToggleStatusrDispatcher = useDispatch()

    const currentUser = useSelector((state) => state.currentUser.value)
    const toggleSideMenuStatus = useSelector(state => state.currentlySelectedView.value.toggleStatus)

    const toggleSideMenu = useSelector(state => state.currentlySelectedView.value.toggleHandler)
    React.useEffect(() => {

    }, [])
    return (
        <div className="navBarContainer">
            <div className="largeScreen"><div className='nabvarRoot '>
                <Link to={'/'}>
                    <button className="siteName">
                        <p className="siteNameTxt">MyZone</p>
                    </button>
                </Link>

                <div className="searchBar">
                    <input type="text" name="" id="" className="searchBarInput" />
                    <SearchOutlinedIcon className='searchBtn' />
                </div>
                <div className="otherOptions">
                    <AppsSharpIcon fontSize='10' className="menuBtn menuButton" />
                    <QuestionAnswerOutlinedIcon fontSize='10' className="menuBtn messageBtn" />
                    <NotificationsSharpIcon fontSize='10' className="menuBtn notifBtn" />
                    <Link to={"/profile/" + currentUser.id}>
                        <button className="menuBtn profileBtn">
                            <img className='profileImageNavBar' src={currentUser.profileImageURL} alt="profile pic" />
                        </button>
                    </Link>


                </div>
            </div></div>

            <div className="smallScreen"><div className='nabvarRootSmall '>
                <div onClick={() => {
                    toggleSideMenu.toggleHandler.handler(0)
                    sideBarToggleStatusrDispatcher(setToggleStatus(0))

                }} className="siteHeadingSmall">
                    <Link to={'/'} >
                        <button className="siteNameTxtSmall">
                            <p>MyZone</p>

                        </button>

                    </Link>
                    <Link to={"/profile/" + currentUser.id}>
                        <button className="menuBtn profileBtn">
                            <img className='profileImageNavBar' src={currentUser.profileImageURL} alt="profile pic" />
                        </button>
                    </Link>
                </div>

                <div className="otherOptionsSmall">
                    <div onClick={() => {

                        toggleSideMenu.toggleHandler.handler(toggleSideMenuStatus ^ 1)
                        sideBarToggleStatusrDispatcher(setToggleStatus(toggleSideMenuStatus ^ 1))

                    }}>
                        <AppsSharpIcon fontSize='10' className="menuBtn  menuButton " />
                    </div>
                    <QuestionAnswerOutlinedIcon fontSize='10' className="menuBtn messageBtn " />
                    <NotificationsSharpIcon fontSize='10' className="menuBtn notifBtn" />
                    <SearchOutlinedIcon fontSize='10' className='searchBtn menuBtn' />

                </div>
            </div></div>

        </div>
    );
}

export default NavBar;