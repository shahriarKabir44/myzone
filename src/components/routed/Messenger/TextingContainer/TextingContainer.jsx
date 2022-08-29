import React from 'react';
import MessageContainerRoot from '../../../shared/MessagesContainer/MessageContainerRoot/MessageContainerRoot';
import './TextingContainer.css'


let messages = {
    senderInfo: {
        id: 1,
        name: "Rahul Islam",
        profileImageURL: "https://www.hoyletanner.com/wp-content/uploads/2017/08/IMG_8280_1-Square-300x300.jpg"
    },
    messages: [
        {
            sender: 1,
            body: "Hello there!",

        },
        {
            sender: 2,
            body: "Good day!"
        },
        {
            sender: 2,
            body: "How are you doing?"
        },
        {
            sender: 1,
            body: "Hello there!",

        },
        {
            sender: 2,
            body: "Good day!"
        },
        {
            sender: 2,
            body: "How are you doing?"
        },
        {
            sender: 1,
            body: "Hello there!",

        },
        {
            sender: 2,
            body: "Good day!"
        },
        {
            sender: 2,
            body: "How are you doing?"
        },
        {
            sender: 1,
            body: "Hello there!",

        },
        {
            sender: 2,
            body: "Good day!"
        },
        {
            sender: 2,
            body: "How are you doing?"
        },
        {
            sender: 1,
            body: "Hello there!",

        },
        {
            sender: 2,
            body: "Good day!"
        },
        {
            sender: 2,
            body: "How are you doing?"
        }
    ]
}
function TextingContainer(props) {
    return (
        <div className='textingContainerRoot'>
            <div className="participantInfoContainer flex">
                <div className="participantImageContainer ">
                    <img src={messages.senderInfo.profileImageURL} alt="" className="participantImg userImg" />
                </div>
                <div className="textInfoContainer ">
                    <p className="participantName">Rahul Islam</p>
                    <div className="activityStatus">Active now</div>
                </div>

            </div>
            <div className="messagesContainer">
                <MessageContainerRoot messages={messages} />
            </div>
        </div>
    );
}

export default TextingContainer;