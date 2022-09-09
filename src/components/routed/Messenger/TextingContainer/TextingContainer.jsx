import React from 'react';
import MessageContainerRoot from '../../../shared/MessagesContainer/MessageContainerRoot/MessageContainerRoot';
import './TextingContainer.css'
import SendIcon from '@mui/icons-material/Send';


let messages = {
    senderInfo: {
        Id: 1,
        name: "Rahul Islam",
        profileImage: "https://www.hoyletanner.com/wp-content/uploads/2017/08/IMG_8280_1-Square-300x300.jpg"
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
                    <img src={messages.senderInfo.profileImage} alt="" className="participantImg userImg" />
                </div>
                <div className="textInfoContainer ">
                    <p className="participantName">Rahul Islam</p>
                    <div className="activityStatus">Active now</div>
                </div>

            </div>
            <div className="messagesContainer">
                <MessageContainerRoot messages={messages} />
                <div className="commentActionsContainer">
                    <input type="text" name="" className='postCommentInput' placeholder='Your Message' id="" />

                    <SendIcon style={{
                        padding: "5px",
                        background: "white",
                        borderRadius: "5px"
                    }} />

                </div>
            </div>
        </div>
    );
}

export default TextingContainer;