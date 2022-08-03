import React from 'react';
import ActiveUser from './ActiveUser/ActiveUser';
import './ActiveUsersList.css'
function ActiveUsersList(props) {
    return (
        <div className='ActiveUsersList'>
            <div className="heading">
                <p className="headingText">Active users</p>
            </div>
            <ActiveUser name="Rahul" />
            <ActiveUser name="Monir" />
            <ActiveUser name="Noor" />
            <ActiveUser name="Samir" />
            <ActiveUser name="Chayon" />
            <ActiveUser name="Vashkar" />


        </div>
    );
}

export default ActiveUsersList;