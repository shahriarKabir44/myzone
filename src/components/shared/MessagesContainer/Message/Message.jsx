import React from 'react';
import './Message.css'
function Message(props) {
    return (
        <>
            {props.message.sender === 1 && <div className="message sent">

                <div className="innerContainer">


                    <p className="messageText">{props.message.body}</p>
                </div>

            </div>}

            {props.message.sender !== 1 && <div className="message received">

                <div className="innerContainer">


                    <p className="messageText">{props.message.body}</p>
                </div>

            </div>}
        </>
    );
}

export default Message;