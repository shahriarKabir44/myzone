import React from 'react';
import './ActiveUser.css'
import MessengerTogglerService from '../../../../../service/MessengerTogglerService'
function ActiveUser(props) {
    return (
        <div onClick={() => {
            MessengerTogglerService.onCall(props)
        }} className='activeUserContainer' style={{
            cursor: 'pointer'
        }}>
            <div className="activeUserImgContainer">
                <img src={props.user.profileImage} alt="" className="activeUserImg" />

            </div>
            <p className="activeUserName">{props.user.name}</p>
        </div>
    );
}

export default ActiveUser;