import React from 'react';
import MessageContainerRoot from '../../../shared/MessagesContainer/MessageContainerRoot/MessageContainerRoot';
import './TextingContainer.css'
import SendIcon from '@mui/icons-material/Send';
import { useParams } from 'react-router-dom';
import ConversationService from '../../../../service/ConversationService';
import { useSelector } from 'react-redux'
import useChat from '../../../../service/useChat';
function TextingContainer(props) {
    const divRef = React.useRef(null)
    const currentUser = useSelector(state => state.currentUser.value)
    const currentRoute = useParams()
    const { messages, sendMessage, setMessages, setParticipantId, unsubscribe, subscribe } = useChat(currentRoute.conversationId, currentUser.Id, [])
    const [messageText, setmessageText] = React.useState("")
    const [participantInfo, setParticipantInfo] = React.useState({})

    React.useEffect(() => {
        subscribe()
        ConversationService.getConversationMessages(currentRoute.conversationId)
            .then(({ data }) => {

                setMessages(data);
                setTimeout(() => {
                    divRef.current.scrollIntoView({ behavior: 'smooth' });
                }, 200)
                return data
            })
        ConversationService.getParticipantInfo(currentRoute.conversationId, currentUser.Id)
            .then(({ participant }) => {
                setParticipantId(participant.Id)
                setParticipantInfo(participant)
            })
        return () => {
            unsubscribe()
        }
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
                <MessageContainerRoot divRef={divRef} messages={messages} /> {/**/}
                <form onSubmit={(e) => {

                    e.preventDefault();

                    if (messageText.length === 0) return
                    let message = messageText
                    setmessageText('')
                    sendMessage(message)
                    setTimeout(() => {
                        divRef.current.scrollIntoView({ behavior: 'smooth' });

                    }, 100)

                }} className="commentActionsContainer">
                    <input value={messageText}
                        onChange={(e) => {
                            setmessageText(e.target.value)
                        }}
                        type="text" name="" className='postCommentInput' placeholder='Your Message' id="" />

                    <button type="submit">
                        <SendIcon style={{
                            padding: "5px",
                            background: "white",
                            borderRadius: "5px"
                        }} />
                    </button>

                </form>
            </div>
        </div>
    );
}

export default TextingContainer;