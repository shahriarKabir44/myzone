import React from 'react';
import './ProfileTabSelector.css'
function ProfileTabSelector(props) {
    return (
        <div className='tabContainer'>
            <div className={`tabItem ${props.pageIndex === 1 ? "active" : ""}  `}>
                <p className="tabMenuText">Home</p>
            </div>
            <div className={`tabItem ${props.pageIndex === 2 ? "active" : ""}  `}>
                <p className="tabMenuText">Friends</p>
            </div>
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