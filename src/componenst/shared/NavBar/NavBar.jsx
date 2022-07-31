import React from 'react';
import './NavBar.css'
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AppsSharpIcon from '@mui/icons-material/AppsSharp';
import NotificationsSharpIcon from '@mui/icons-material/NotificationsSharp';

const stockImageURL = "https://imageio.forbes.com/specials-images/imageserve/6109550f1aa8564670194ad4/Close-up-smiling-businesswoman-holding-computer-tablet--looking-to-side/960x0.jpg?format=jpg&width=960"
function NavBar(props) {
    return (
        <div className='nabvarRoot'>
            <div className="siteName">
                <p className="siteNameTxt">MyZone</p>
            </div>
            <div className="searchBar">
                <input type="text" name="" id="" className="searchBarInput" />
                <SearchOutlinedIcon className='searchBtn' />
            </div>
            <div className="otherOptions">
                <AppsSharpIcon fontSize='10' className="menuBtn menuButton" />
                <QuestionAnswerOutlinedIcon fontSize='10' className="menuBtn messageBtn" />
                <NotificationsSharpIcon fontSize='10' className="menuBtn notifBtn" />
                <button className="menuBtn profileBtn">
                    <img className='profileImageNavBar' src={stockImageURL} alt="profile pic" />
                </button>

            </div>
        </div>
    );
}

export default NavBar;