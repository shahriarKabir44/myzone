import React from 'react';
import MessageContainerRoot from '../../../shared/MessagesContainer/MessageContainerRoot/MessageContainerRoot';
import './TextingContainer.css'
import SendIcon from '@mui/icons-material/Send';
import { useParams } from 'react-router-dom';
import ConversationService from '../../../../service/ConversationService';
import { useSelector } from 'react-redux'


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
    const currentUser = useSelector(state => state.currentUser.value)
    const currentRoute = useParams()
    const [messageList, setMessageList] = React.useState([])
    const [participantInfo, setParticipantInfo] = React.useState({})
    React.useEffect(() => {
        ConversationService.getConversationMessages(currentRoute.conversationId)
            .then(({ data }) => {
                console.log(data)
                setMessageList(data)
            })
        ConversationService.getParticipantInfo(currentRoute.conversationId, currentUser.Id)
            .then(({ participant }) => {
                setParticipantInfo(participant)
            })
    }, [currentUser, currentRoute])
    return (
        <div className='textingContainerRoot'>
            <div className="participantInfoContainer flex">
                <div className="participantImageContainer ">
                    <img src={participantInfo.profileImage} alt="" className="participantImg userImg" />
                </div>
                <div className="textInfoContainer ">
                    <p className="participantName">{participantInfo.name}</p>
                    <div className="activityStatus">Active now</div>
                </div>

            </div>
            <div className="messagesContainer">
                <MessageContainerRoot messages={messageList} /> {/**/}
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