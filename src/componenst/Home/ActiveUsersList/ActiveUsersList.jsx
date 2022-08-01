import React from 'react';
import ActiveUser from './ActiveUser/ActiveUser';
import './ActiveUsersList.css'
function ActiveUsersList(props) {
    return (
        <div className='ActiveUsersList'>
            <div className="heading">
                <p className="headingText">Active users</p>
            </div>
            <ActiveUser />
            <ActiveUser />
            <ActiveUser />
            <ActiveUser />
            <ActiveUser />
            <ActiveUser />
            <ActiveUser />
            <ActiveUser />
            <ActiveUser />
            <ActiveUser />
            <ActiveUser />
            <ActiveUser />

        </div>
    );
}

export default ActiveUsersList;