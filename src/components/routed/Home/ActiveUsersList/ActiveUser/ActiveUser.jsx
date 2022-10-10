import React from 'react';
import './ActiveUser.css'
import MessengerTogglerService from '../../../../../service/MessengerTogglerService'
import ConversationService from '../../../../../service/ConversationService';
function ActiveUser(props) {
    return (
        <div onClick={() => {
            ConversationService.getConversationInfo(props.currentUserId, props.user.Id)
                .then(({ conversationInfo }) => {
                    MessengerTogglerService.onCall(conversationInfo)
                })

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