import React from 'react';
import './FloatingMessengerRoot.css'
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import FloatingMessenger from '../FloatingMessangerContainer/FloatingMessenger';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import useConversation from '../../../../service/useConversation';
import UserService from '../../../../service/UserServices'
function FloatingMessengerRoot(props) {
    const [isChatHeadSelected, setSelectionStatus] = React.useState(false)
    const [selectedChatHead, setSelectedChatHead] = React.useState(null)
    const [isChatHeadListExpanded, setExpansionStatus] = React.useState(false)
    const { conversations, subscribe, unsubscribe } = useConversation("floatingMessenger")
    React.useEffect(() => {
        subscribe()

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
                }} style={{
                    margin: 0
                }}>
                    <MapsUgcIcon style={{
                        fontSize: "60px",
                        color: "white",

                    }} />
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
    const [participantInfo, setParticipantInfo] = React.useState({})
    React.useEffect(() => {
        UserService.getUserInfo(conversation.sender)
            .then(userInfo => {
                setParticipantInfo(userInfo)
            })
    }, [])
    return (
        <div onClick={() => {
            onOpen();
        }}>
            <img src={participantInfo.profileImage} style={{
                height: "50px", width: "50px"
            }} alt="" className="userImg" />
        </div>
    )
}

export default FloatingMessengerRoot;