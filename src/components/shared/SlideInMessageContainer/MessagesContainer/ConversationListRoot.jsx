import React from 'react';
import OpenWithIcon from '@mui/icons-material/OpenWith';
import { Link } from 'react-router-dom'
import './ConversationListRoot.css';
let conversationList = [
    {
        senderId: "1",
        senderInfo: {
            profileImage: "https://biz30.timedoctor.com/images/2019/08/remote-employee-software.jpg",
            name: "Rahul Kabir"
        },
        message: "Hello!",
        conversationId: 1,
        time: (new Date()) * 1
    },
    {
        senderId: "1",
        senderInfo: {
            profileImage: "https://www.humanrights.vic.gov.au/static/6a24f35b5bd855d2b82601b7e130d239/ecd90/IMG-Hub_Employee_workplace_rights.jpg",
            name: "Monir Islam"
        },
        message: "Good Day!",
        conversationId: 1,
        time: (new Date()) * 1
    },
    {
        senderId: "1",
        senderInfo: {
            profileImage: "https://assets.entrepreneur.com/content/3x2/2000/1655744650-shutterstock-1350369713.jpg?auto=webp&quality=95&crop=2:1&width=400",
            name: "Imran Kabir"
        },
        message: "Hi!",
        conversationId: 1,
        time: (new Date()) * 1
    },
    {
        senderId: "1",
        senderInfo: {
            profileImage: "https://biz30.timedoctor.com/images/2019/08/remote-employee-software.jpg",
            name: "Rahul Kabir"
        },
        message: "Hello!",
        conversationId: 1,
        time: (new Date()) * 1
    },
    {
        senderId: "1",
        senderInfo: {
            profileImage: "https://www.humanrights.vic.gov.au/static/6a24f35b5bd855d2b82601b7e130d239/ecd90/IMG-Hub_Employee_workplace_rights.jpg",
            name: "Monir Islam"
        },
        message: "Good Day!",
        conversationId: 1,
        time: (new Date()) * 1
    },
    {
        senderId: "1",
        senderInfo: {
            profileImage: "https://assets.entrepreneur.com/content/3x2/2000/1655744650-shutterstock-1350369713.jpg?auto=webp&quality=95&crop=2:1&width=400",
            name: "Imran Kabir"
        },
        message: "Hi!",
        conversationId: 1,
        time: (new Date()) * 1
    },
]
function ConversationListRoot(props) {
    return (
        <div className='conversationListRoot'>
            <div className="conversationListHeading">
                <p className="headingTextSlideMessage">Messages</p>
                <div>
                    <OpenWithIcon />
                </div>
            </div>
            <div className="conversationListContainer">
                {conversationList.map((conversation, index) => {
                    return <ConversationListItem conversation={conversation} key={index} />
                })}
            </div>
        </div>
    );
}
function ConversationListItem(props) {
    return (
        <Link to={"/messenger/1"}><div className='conversationContainer'>
            <div className="conversationImgContainer">
                <img src={props.conversation.senderInfo.profileImage} alt="" className="userImg" />
            </div>
            <div className="infoContainer">
                <p className="senderName">{props.conversation.senderInfo.name}</p>
                <p className="messageBody">{props.conversation.message}</p>
                <p className="messageTime">{new Date(props.conversation.time).toLocaleString()}</p>
            </div>
        </div>
        </Link>

    );
}
export default ConversationListRoot;