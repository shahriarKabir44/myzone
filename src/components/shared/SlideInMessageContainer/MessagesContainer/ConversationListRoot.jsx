import React from 'react';
import OpenWithIcon from '@mui/icons-material/OpenWith';
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
let conversationList = [
    {
        senderId: "1",
        senderInfo: {
            profileImage: "https://biz30.timedoctor.com/images/2019/08/remote-employee-software.jpg",
            name: "Rahul Kabir"
        },
        message: "Hello!",
        conversationId: 1,
        time: (new Date()) * 1
    },
    {
        senderId: "1",
        senderInfo: {
            profileImage: "https://www.humanrights.vic.gov.au/static/6a24f35b5bd855d2b82601b7e130d239/ecd90/IMG-Hub_Employee_workplace_rights.jpg",
            name: "Monir Islam"
        },
        message: "Good Day!",
        conversationId: 1,
        time: (new Date()) * 1
    },
    {
        senderId: "1",
        senderInfo: {
            profileImage: "https://assets.entrepreneur.com/content/3x2/2000/1655744650-shutterstock-1350369713.jpg?auto=webp&quality=95&crop=2:1&width=400",
            name: "Imran Kabir"
        },
        message: "Hi!",
        conversationId: 1,
        time: (new Date()) * 1
    },
    {
        senderId: "1",
        senderInfo: {
            profileImage: "https://biz30.timedoctor.com/images/2019/08/remote-employee-software.jpg",
            name: "Rahul Kabir"
        },
        message: "Hello!",
        conversationId: 1,
        time: (new Date()) * 1
    },
    {
        senderId: "1",
        senderInfo: {
            profileImage: "https://www.humanrights.vic.gov.au/static/6a24f35b5bd855d2b82601b7e130d239/ecd90/IMG-Hub_Employee_workplace_rights.jpg",
            name: "Monir Islam"
        },
        message: "Good Day!",
        conversationId: 1,
        time: (new Date()) * 1
    },
    {
        senderId: "1",
        senderInfo: {
            profileImage: "https://assets.entrepreneur.com/content/3x2/2000/1655744650-shutterstock-1350369713.jpg?auto=webp&quality=95&crop=2:1&width=400",
            name: "Imran Kabir"
        },
        message: "Hi!",
        conversationId: 1,
        time: (new Date()) * 1
    },
]
function ConversationListRoot(props) {
    const currentUser = useSelector((state) => state.currentUser.value)
    const [friendsList, setFriends] = React.useState([])
    const [shouldOpenCreateConversationModal, toggleConversationModal] = React.useState(false)
    function getFriendsList() {
        FriendshipService.getAllFriends(currentUser.Id)
            .then(({ data }) => {
                setFriends(data)
            })
    }
    return (
        <div className='conversationListRoot'>
            <div className="conversationListHeading">
                <p className="headingTextSlideMessage">Messages</p>
                <div>
                    <OpenWithIcon />
                </div>
            </div>
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
                    <p>Create new message</p>
                </div>
            </Button>
            <CreateConversationModal currentUserId={currentUser.Id} friendList={friendsList} open={shouldOpenCreateConversationModal} onClose={() => {
                toggleConversationModal(false)
            }} />
            <div className="conversationListContainer">
                {conversationList.map((conversation, index) => {
                    return <ConversationListItem conversation={conversation} key={index} />
                })}
            </div>
        </div>
    );
}
function ConversationListItem(props) {
    return (
        <Link style={{
            textDecoration: "none"
        }} to={"/messenger/1"}><div className='conversationContainer'>
                <div className="conversationImgContainer">
                    <img src={props.conversation.senderInfo.profileImage} alt="" className="userImg" />
                </div>
                <div className="infoContainer">
                    <p className="senderName">{props.conversation.senderInfo.name}</p>
                    <p className="messageBody">{props.conversation.message}</p>
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
                                    Message
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