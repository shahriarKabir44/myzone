import React from 'react';
import ConversationListItem from '../ConverstionItem/ConversationListItem';
let conversationList = [
    {
        senderId: "1",
        senderInfo: {
            profileImageURL: "https://biz30.timedoctor.com/images/2019/08/remote-employee-software.jpg",
            name: "Rahul Kabir"
        },
        message: "Hello!",
        conversationId: 1,
        time: (new Date()) * 1
    },
    {
        senderId: "1",
        senderInfo: {
            profileImageURL: "https://www.humanrights.vic.gov.au/static/6a24f35b5bd855d2b82601b7e130d239/ecd90/IMG-Hub_Employee_workplace_rights.jpg",
            name: "Monir Islam"
        },
        message: "Good Day!",
        conversationId: 1,
        time: (new Date()) * 1
    },
    {
        senderId: "1",
        senderInfo: {
            profileImageURL: "https://assets.entrepreneur.com/content/3x2/2000/1655744650-shutterstock-1350369713.jpg?auto=webp&quality=95&crop=2:1&width=400",
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
            <div className="conversationListHeading"></div>
            <div className="conversationContainer">
                {conversationList.map((conversation, index) => {
                    return <ConversationListItem conversation={conversation} key={index} />
                })}
            </div>
        </div>
    );
}

export default ConversationListRoot;