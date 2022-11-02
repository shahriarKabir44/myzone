import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './ConversationListRoot.css';
import Button from '@mui/material/Button';
import RateReviewIcon from '@mui/icons-material/RateReview';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { closeConversationListView } from '../../../../redux/ConversatinListToggleManager'
import UserInfoContainer from '../../UserInfoContainer'
import { useDispatch, useSelector } from 'react-redux'
import FriendshipService from '../../../../services/FriendshipService';
import ConversationService from '../../../../services/ConversationService';
import { useParams } from 'react-router-dom'
import Globals from '../../../../services/Globals';
import MessengerTogglerService from '../../../../services/MessengerTogglerService';
function ConversationListRoot(props) {
    const currentRoute = useParams()
    const currentUser = useSelector((state) => state.currentUser.value)
    const [friendsList, setFriends] = React.useState([])
    const [conversations, setConversationList] = React.useState([])
    React.useEffect(() => {
        Globals.subscribeToSelfMessageEvent({
            handleOnMessage: (newMessage) => {
                let conversationList = conversations
                let target = conversationList.filter(conversation => conversation.Id * 1 === newMessage.conversationId * 1)
                if (target.length) {
                    target[0].last_message = newMessage.body
                    const temp = [...target, ...conversationList.filter(conversation => conversation.Id * 1 !== newMessage.conversationId * 1)]
                    setConversationList(temp)
                }

            }
        })
        ConversationService.getConversationList(currentUser.Id)
            .then(({ conversationList }) => {
                setConversationList(conversationList)
            })
        return () => {
        }
    }, [])
    const [shouldOpenCreateConversationModal, toggleConversationModal] = React.useState(false)
    function getFriendsList() {
        FriendshipService.getAllFriends(currentUser.Id)
            .then(({ data }) => {
                setFriends(data)
            })
    }
    return (
        <div className='conversationListRoot'>

            <Button onClick={() => {
                getFriendsList()
                toggleConversationModal(true)
            }} style={{
                display: 'flex',
                margin: '0 auto',
                padding: "0px 10px"
            }} variant="contained">
                <div className="createMessageContainer">
                    <RateReviewIcon />
                    <p>Create new conversation</p>
                </div>
            </Button>
            <CreateConversationModal currentUserId={currentUser.Id} friendList={friendsList} open={shouldOpenCreateConversationModal} onClose={() => {
                toggleConversationModal(false)
            }} />
            <div className="conversationListContainer">
                {conversations.map((conversation, index) => {
                    return <ConversationListItem currentRoute={currentRoute} conversation={conversation} key={index} />
                })}
            </div>
        </div>
    );
}
function ConversationListItem(props) {
    const conversationsTrayToggleDispatcher = useDispatch()


    const navigate = useNavigate()
    const location = useLocation()
    return (
        <div onClick={() => {
            if (location.pathname.startsWith('/messenger')) {
                navigate(`/messenger/${props.conversation.Id}`)
            }
            else {
                conversationsTrayToggleDispatcher(closeConversationListView())
                MessengerTogglerService.findConversationAndCall(props.conversation.Id)
            }
        }}   ><div className={`conversationContainer 
            ${props.conversation.Id === props.currentRoute.conversationId * 1 ? 'activeConversationItem' : ''}
        `}>
                <div className="conversationImgContainer">
                    <img src={Globals.SERVER_URL + props.conversation.participantInfo.profileImage} alt="" className="userImg" />
                </div>
                <div className="infoContainer">
                    <p className="senderName">{props.conversation.participantInfo.name}</p>
                    <p className="messageBody">{props.conversation.last_message}</p>
                    <p className="messageTime">{new Date(props.conversation.time).toLocaleString()}</p>
                </div>
            </div>
        </div >

    );
}

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#242526',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function CreateConversationModal(props) {
    let navigate = useNavigate();

    function createConversation(participant2) {
        ConversationService.createConversation(props.currentUserId, participant2)
            .then(({ data }) => {
                props.onClose()
                return navigate('/messenger/' + data.Id)
            })
    }
    return (
        <Modal keepMounted
            open={props.open}
            onClose={() => {
                props.onClose()
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"

        >
            <Box sx={modalStyle}>
                <h2 className='createPostModalHeader'>
                    Create new Conversation
                </h2>
                <div id="modal-modal-description" sx={{ mt: 2 }}>
                    <h4 className="createPostModalHeader">
                        Choose user
                    </h4>
                    {props.friendList.map((friend, index) => {
                        return (
                            <div className="friendInfoContainer flex" key={index} >
                                <UserInfoContainer name={friend.name} imgURL={friend.profileImage} />
                                <Button onClick={() => {
                                    createConversation(friend.Id)
                                }} variant="contained">
                                    last_message
                                </Button>
                            </div>
                        )
                    })}


                </div>
            </Box>

        </Modal>
    )
}

export default ConversationListRoot;