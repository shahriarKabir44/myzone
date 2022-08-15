import React from 'react';
import './NavBar.css'
import { Link, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'

import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AppsSharpIcon from '@mui/icons-material/AppsSharp';
import NotificationsSharpIcon from '@mui/icons-material/NotificationsSharp';
import { setToggleStatus } from '../../../redux/HomeMenuSelector'
function NavBar(props) {
    const sideBarToggleStatusrDispatcher = useDispatch()
    const location = useLocation();
    const currentUser = useSelector((state) => state.currentUser.value)
    const toggleSideMenuStatus = useSelector(state => state.currentlySelectedView.value.toggleStatus)

    React.useEffect(() => {

    }, [])
    function openDrawer(type = 1) {
        let status = toggleSideMenuStatus
        if (status === 2) status = 0
        if (type) {
            sideBarToggleStatusrDispatcher(setToggleStatus(status ^ 1))
        }
        else sideBarToggleStatusrDispatcher(setToggleStatus(0))
    }
    function renderHeaderBBtn() {
        if (location.pathname === "") return
    }
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

            <div className="smallScreen">
                <div className='nabvarRootSmall '>
                    <div onClick={() => {
                        openDrawer(0)

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
                            openDrawer()
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