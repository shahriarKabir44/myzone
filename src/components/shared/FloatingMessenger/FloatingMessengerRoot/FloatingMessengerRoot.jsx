import React from 'react';
import './FloatingMessengerRoot.css'
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import FloatingMessenger from '../FloatingMessangerContainer/FloatingMessenger';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import useConversation from '../../../../services/useConversation';
import FiberNewSharpIcon from '@mui/icons-material/FiberNewSharp';
import MessengerTogglerService from '../../../../services/MessengerTogglerService';
import { useSelector } from 'react-redux'
import Globals from '../../../../services/Globals';
import ConversationService from '../../../../services/ConversationService';
function FloatingMessengerRoot(props) {
    const [conversations, setConversationList] = React.useState([])
    const currentUser = useSelector((state) => state.currentUser.value)
    const [isChatHeadSelected, setSelectionStatus] = React.useState(false)
    const [selectedChatHead, setSelectedChatHead] = React.useState(null)
    const [isChatHeadListExpanded, setExpansionStatus] = React.useState(false)
    const [hasNewConversationArrived, setNewConversationArrival] = React.useState(false)
    const { conversations: conversationList, subscribe, unsubscribe } = useConversation(conversations, setConversationList, "floatingMessenger", (message) => {
        setNewConversationArrival(true)

    })

    React.useEffect(() => {
        setConversationList([])
        subscribe()
        MessengerTogglerService.subscribe({
            onCall: (conversation) => {
                setSelectedChatHead({
                    conversationId: conversation.Id,
                    receiver: currentUser.Id * 1 !== conversation.participant1 * 1 ? conversation.participant1 : conversation.participant2,
                    sender: currentUser.Id * 1
                })

                setSelectionStatus(true)
            }
        })
        return () => {
            unsubscribe()
        }
    }, [])

    function openFloatingMessenger(chatHead) {
        ConversationService.getParticipantInfo(chatHead.conversationId, currentUser.Id)
            .then(({ participant }) => {
                let newChatHead = {
                    conversationId: chatHead.conversationId,
                    sender: currentUser.Id,
                    receiver: participant.Id
                }
                setSelectedChatHead(newChatHead)
                setSelectionStatus(true)

            })

    }
    return (
        <div>
            {window.innerWidth > 620 && <>
                {!isChatHeadSelected && <div className="chatHeadContainer">
                    {isChatHeadListExpanded && <>
                        <div onClick={() => {
                            setExpansionStatus(false)
                        }} style={{
                            margin: 0
                        }}><ExpandCircleDownIcon style={{
                            fontSize: "60px",
                            color: "white",

                        }} />
                        </div>
                        <div className="scrollableChatHeadListContainer">
                            {conversations.map((chatHead, index) => {
                                return <ChatHead conversation={chatHead} key={index} onOpen={() => {
                                    openFloatingMessenger(chatHead);
                                }} />
                            })}
                        </div>

                    </>}
                    {!isChatHeadListExpanded && <div onClick={() => {
                        setExpansionStatus(true)
                        setNewConversationArrival(false)
                    }} style={{
                        margin: 0,
                        position: 'relative'
                    }}>
                        <MapsUgcIcon style={{
                            fontSize: "60px",
                            color: "white",

                        }} />
                        {hasNewConversationArrived && <div className="newIconContainer">
                            <FiberNewSharpIcon />
                        </div>}
                    </div>}
                </div>}</>}
            {isChatHeadSelected && selectedChatHead !== null && <FloatingMessenger selectedChatHead={selectedChatHead} onClose={() => {
                setSelectedChatHead(null)
                setSelectionStatus(false)
            }} />}
        </div>
    );
}

function ChatHead({ conversation, onOpen }) {

    return (
        <div onClick={() => {
            onOpen();
        }}>
            <img src={Globals.SERVER_URL + conversation.participantInfo.profileImage} style={{
                height: "50px", width: "50px"
            }} alt="" className="userImg" />
        </div>
    )
}

export default FloatingMessengerRoot;