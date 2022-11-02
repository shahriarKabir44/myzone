import React from 'react';
import './ActiveUser.css'
import MessengerTogglerService from '../../../../../services/MessengerTogglerService'
import Globals from '../../../../../services/Globals';
function ActiveUser(props) {
    return (
        <div onClick={() => {
            MessengerTogglerService.onCall(props.currentUserId, props.user.Id)

        }} className='activeUserContainer' style={{
            cursor: 'pointer'
        }}>
            <div className="activeUserImgContainer">
                <img src={Globals.SERVER_URL + props.user.profileImage} alt="" className="activeUserImg" />

            </div>
            <p className="activeUserName">{props.user.name}</p>
        </div>
    );
}

export default ActiveUser;