import React from 'react';
import MessageContainerRoot from '../../../shared/MessagesContainer/MessageContainerRoot/MessageContainerRoot';
import './TextingContainer.css'
import SendIcon from '@mui/icons-material/Send';
import { useParams } from 'react-router-dom';
import ConversationService from '../../../../service/ConversationService';
import { useSelector } from 'react-redux'
import useChat from '../../../../service/useChat';


function TextingContainer(props) {
    const currentUser = useSelector(state => state.currentUser.value)
    const currentRoute = useParams()
    const { messages, sendMessage, setMessages } = useChat(currentRoute.conversationId, currentUser.Id, [])
    const [messageText, setmessageText] = React.useState("")
    const [participantInfo, setParticipantInfo] = React.useState({})
    React.useEffect(() => {
        ConversationService.getConversationMessages(currentRoute.conversationId)
            .then(({ data }) => {
                console.log(data)
                setMessages(data)
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
                <MessageContainerRoot messages={messages} /> {/**/}
                <form onSubmit={(e) => {
                    e.preventDefault();
                    let message = messageText
                    setmessageText('')
                    sendMessage(message)
                }} className="commentActionsContainer">
                    <input value={messageText}
                        onChange={(e) => {
                            setmessageText(e.target.value)
                        }}
                        type="text" name="" className='postCommentInput' placeholder='Your Message' id="" />

                    <div type="submit"><SendIcon style={{
                        padding: "5px",
                        background: "white",
                        borderRadius: "5px"
                    }} />
                    </div>

                </form>
            </div>
        </div>
    );
}

export default TextingContainer;