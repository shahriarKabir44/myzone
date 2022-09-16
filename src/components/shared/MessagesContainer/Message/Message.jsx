import React from 'react';
import './Message.css'
function Message(props) {
    return (

        <div className={`message ${props.message.sender === props.currentUserId ? 'sent' : 'received'} `}>

            <div className="innerContainer">
                <p className="messageText">{props.message.body}</p>
            </div>

        </div>

    );
}

export default Message;