import React from 'react';
import './NavBar.css'
import { useSelector } from 'react-redux';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AppsSharpIcon from '@mui/icons-material/AppsSharp';
import NotificationsSharpIcon from '@mui/icons-material/NotificationsSharp';
import WebWorkerManager from '../../../workerManagers/WebWorkerManager';

function NavBar(props) {
    const currentUser = useSelector((state) => state.currentUser.value)
    return (
        <div className="navBarContainer">
            <div className="largeScreen"><div className='nabvarRoot '>
                <button className="siteName">
                    <p className="siteNameTxt">MyZone</p>
                </button>
                <div className="searchBar">
                    <input type="text" name="" id="" className="searchBarInput" />
                    <SearchOutlinedIcon className='searchBtn' />
                </div>
                <div className="otherOptions">
                    <AppsSharpIcon fontSize='10' className="menuBtn menuButton" />
                    <QuestionAnswerOutlinedIcon fontSize='10' className="menuBtn messageBtn" />
                    <NotificationsSharpIcon fontSize='10' className="menuBtn notifBtn" />
                    <button className="menuBtn profileBtn">
                        <img className='profileImageNavBar' src={currentUser.profileImageURL} alt="profile pic" />
                    </button>

                </div>
            </div></div>

            <div className="smallScreen"><div className='nabvarRootSmall '>
                <div onClick={() => {

                    WebWorkerManager.worker.postMessage({
                        type: "ChangeHomeView",
                        value: 1
                    })
                }} className="siteHeadingSmall">

                    <p className="siteNameTxtSmall">MyZone</p>
                    <button className="menuBtn  profileBtn ">
                        <img className='profileImageNavBar ' src={currentUser.profileImageURL} alt="profile pic" />
                    </button>
                </div>

                <div className="otherOptionsSmall">
                    <div onClick={() => {

                        WebWorkerManager.worker.postMessage({
                            type: "ChangeHomeView",
                            value: 0
                        })
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