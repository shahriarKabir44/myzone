import React from 'react';
import Message from '../Message/Message';
import './MessageContainerRoot.css'
function MessageContainerRoot(props) {
    return (
        <div className='messagesContainerRoot'>
            {props.messages.messages.map((message, index) => {
                return <Message message={message} key={index} />
            })}
        </div>
    );
}

export default MessageContainerRoot;