import React from 'react';
import MessageContainerRoot from '../../MessagesContainer/MessageContainerRoot/MessageContainerRoot';
import './FloatingMessenger.css'
import CloseIcon from '@mui/icons-material/Close';
import LaunchIcon from '@mui/icons-material/Launch';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import ConversationService from '../../../../services/ConversationService'
import useChat from '../../../../services/useChat';
import { useSelector } from 'react-redux'
import UserService from '../../../../services/UserServices';
import Globals from '../../../../services/Globals';
function FloatingMessenger({ selectedChatHead, onClose }) {
    let navigate = useNavigate();
    let divRef = React.useRef(null)
    const currentUser = useSelector(state => state.currentUser.value)
    const [participantInfo, setParticipantInfo] = React.useState({})
    const { messages, sendMessage, setMessages, setParticipantId, unsubscribe, subscribe } = useChat(selectedChatHead.conversationId, currentUser.Id, [], 'floatingMessengerMain')
    const [messageText, setmessageText] = React.useState("")
    const [hasMessageLoaded, setMessageLoadingStatus] = React.useState(false)
    React.useEffect(() => {
        subscribe()
        ConversationService.getConversationMessages(selectedChatHead.conversationId)
            .then(({ data }) => {
                setTimeout(() => {
                    setMessages(data);
                    setMessageLoadingStatus(true)
                    divRef.current.scrollIntoView({ behavior: 'smooth' });
                }, 300)

                return data
            })
        setParticipantId(selectedChatHead.receiver)
        UserService.getUserInfo(selectedChatHead.receiver)
            .then(userInfo => {
                setParticipantInfo(userInfo)
            })

        return () => {
            unsubscribe()
        }
    }, [])
    return (
        <div className='floatingMessengerContainer'>
            <div className="messengerHeadingContainer">
                <div className="userInfoContainer">
                    <img src={Globals.SERVER_URL + participantInfo.profileImage} style={{
                        width: "50px", height: "50px"
                    }} alt="" className="userImage" />
                    <div className="chatHeadTextData">
                        <p style={{
                            margin: 0
                        }} className="otherUserName">{participantInfo.name}</p>
                        <p style={{
                            margin: 0
                        }}>Active now🟢</p>
                    </div>
                </div>
                <div className="actionBtnContainer">
                    <div onClick={() => {
                        onClose()
                    }}>
                        <CloseIcon />
                    </div>
                    <div onClick={() => {
                        navigate("/messenger/" + selectedChatHead.conversationId)
                    }} >
                        <LaunchIcon />
                    </div>

                </div>
            </div>
            <div className="textMessagesContainer">
                {hasMessageLoaded && <MessageContainerRoot divRef={divRef} messages={messages} />}
            </div>
            <div className="messageInputContainer">
                <form onSubmit={(e) => {
                    e.preventDefault()
                    e.preventDefault();

                    if (messageText.length === 0) return
                    let message = messageText
                    setmessageText('')
                    sendMessage(message)
                    setTimeout(() => {
                        divRef.current.scrollIntoView({ behavior: 'smooth' });

                    }, 100)
                }} className="sendMessageFormContainer">
                    <input value={messageText}
                        onChange={(e) => {
                            setmessageText(e.target.value)
                        }} type="text" name="" className='postCommentInput' placeholder='Your message' id="" />
                    <Button style={{
                        background: 'white'
                    }} type="submit" variant="outlined">send</Button>


                </form>
            </div>
        </div>
    );
}

export default FloatingMessenger;