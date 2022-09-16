import React from 'react';
import Message from '../Message/Message';
import './MessageContainerRoot.css'

function MessageContainerRoot(props) {
    return (
        <div className='messagesContainerRoot'>
            {props.messages.map((message, index) => {
                return <Message message={message} key={index} />
                // return <p key={index}>{message.body}</p>
            })}

        </div>
    );
}

export default MessageContainerRoot;