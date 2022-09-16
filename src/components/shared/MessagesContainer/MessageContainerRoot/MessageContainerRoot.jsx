import React from 'react';
import Message from '../Message/Message';
import './MessageContainerRoot.css'
import { useSelector } from 'react-redux'
function MessageContainerRoot(props) {
    const currentUser = useSelector(state => state.currentUser.value);

    return (
        <div className='messagesContainerRoot'>
            {props.messages.map((message, index) => {
                return <Message message={message} currentUserId={currentUser.Id} key={index} />
                // return <p key={index}>{message.body}</p>
            })}
            <div style={{
                margin: '10px'
            }} ref={props.divRef}></div>
        </div>
    );
}

export default MessageContainerRoot;