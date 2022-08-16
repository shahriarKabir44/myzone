import React from 'react';
import './ProfileTabSelector.css'
function ProfileTabSelector(props) {
    return (
        <div className='tabContainer'>
            <div className="tabItem active">
                <p className="tabMenuText">Posts</p>
            </div>
            <div className="tabItem">
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