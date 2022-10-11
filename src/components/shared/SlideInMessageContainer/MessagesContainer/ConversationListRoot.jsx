import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import './ConversationListRoot.css';
import Button from '@mui/material/Button';
import RateReviewIcon from '@mui/icons-material/RateReview';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import UserInfoContainer from '../../UserInfoContainer'
import { useSelector } from 'react-redux'
import FriendshipService from '../../../../service/FriendshipService';
import ConversationService from '../../../../service/ConversationService';
import { useParams } from 'react-router-dom'
import useConversation from '../../../../service/useConversation'
function ConversationListRoot(props) {
    const currentRoute = useParams()
    const currentUser = useSelector((state) => state.currentUser.value)
    const [friendsList, setFriends] = React.useState([])
    const { conversations, setConversationList, subscribe, unsubscribe } = useConversation()
    React.useEffect(() => {
        subscribe()
        ConversationService.getConversationList(currentUser.Id)
            .then(({ conversationList }) => {
                setConversationList(conversationList)
            })
        return () => {
            unsubscribe()
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
    return (
        <Link style={{
            textDecoration: "none"
        }} to={"/messenger/" + props.conversation.Id}><div className={`conversationContainer 
            ${props.conversation.Id === props.currentRoute.conversationId * 1 ? 'activeConversationItem' : ''}
        `}>
                <div className="conversationImgContainer">
                    <img src={props.conversation.participantInfo.profileImage} alt="" className="userImg" />
                </div>
                <div className="infoContainer">
                    <p className="senderName">{props.conversation.participantInfo.name}</p>
                    <p className="messageBody">{props.conversation.last_message}</p>
                    <p className="messageTime">{new Date(props.conversation.time).toLocaleString()}</p>
                </div>
            </div>
        </Link>

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