import React from 'react';
import './ConversationListItem.css'
function ConversationListItem(props) {
    return (
        <div className='conversationContainer'>
            <div className="conversationImgContainer">
                <img src={props.conversation.senderInfo.profileImageURL} alt="" className="userImg" />
            </div>
            <div className="infoContainer">
                <p className="senderName">{props.conversation.senderInfo.name}</p>
                <p className="messageBody">{props.conversation.message}</p>
                <p className="messageTime">{props.conversation.time}</p>
            </div>
        </div>
    );
}

export default ConversationListItem;