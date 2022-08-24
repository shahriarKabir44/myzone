import React from 'react';
import './ProfileTabSelector.css'
import { Link } from 'react-router-dom'
function ProfileTabSelector(props) {
    return (
        <div className='tabContainer'>
            <Link style={{ textDecoration: 'none' }} to={'../home'}>
                <div className={`tabItem ${props.pageIndex === 1 ? "active" : ""}  `}>
                    <p className="tabMenuText">Home</p>
                </div>
            </Link>
            <Link style={{ textDecoration: 'none' }} to={'../friends'}>
                <div className={`tabItem ${props.pageIndex === 2 ? "active" : ""}  `}>
                    <p className="tabMenuText">Friends</p>
                </div>
            </Link>

            <div className="tabItem">
                <p className="tabMenuText">Photos</p>
            </div>
            <div className="tabItem">
                <p className="tabMenuText">About</p>
            </div>
        </div>
    );
}

export default ProfileTabSelector;