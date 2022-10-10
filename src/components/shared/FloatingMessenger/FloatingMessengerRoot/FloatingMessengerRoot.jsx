import React from 'react';
import './FloatingMessengerRoot.css'
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import FloatingMessenger from '../FloatingMessangerContainer/FloatingMessenger';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import useConversation from '../../../../service/useConversation';
import FiberNewSharpIcon from '@mui/icons-material/FiberNewSharp';
import MessengerTogglerService from '../../../../service/MessengerTogglerService';
import { useSelector } from 'react-redux'
function FloatingMessengerRoot(props) {
    const currentUser = useSelector((state) => state.currentUser.value)
    const [isChatHeadSelected, setSelectionStatus] = React.useState(false)
    const [selectedChatHead, setSelectedChatHead] = React.useState(null)
    const [isChatHeadListExpanded, setExpansionStatus] = React.useState(false)
    const [hasNewConversationArrived, setNewConversationArrival] = React.useState(false)
    const { conversations, subscribe, unsubscribe } = useConversation("floatingMessenger", (message) => {
        setNewConversationArrival(true)

    })

    React.useEffect(() => {
        subscribe()
        MessengerTogglerService.subscribe({
            onCall: (data) => {
                setSelectedChatHead({
                    conversationId: data.Id,
                    sender: currentUser.Id * 1 === data.participant1 * 1 ? data.participant1 : data.participant2
                })

                setSelectionStatus(true)
                console.log(data)
            }
        })
        return () => {
            unsubscribe()
        }
    }, [])

    function openFloatingMessenger(chatHead) {
        setSelectionStatus(true)
        setSelectedChatHead(chatHead)

    }
    return (
        <div>
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
            </div>}
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
            <img src={conversation.participantInfo.profileImage} style={{
                height: "50px", width: "50px"
            }} alt="" className="userImg" />
        </div>
    )
}

export default FloatingMessengerRoot;