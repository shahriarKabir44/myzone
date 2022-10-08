import React from 'react';
import './UserProfileInfo.css'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button'
import FriendshipService from '../../../../../service/FriendshipService';
import useFriendRequest from '../../../../../service/useFriendRequest';
function UserProfileInfo(props) {
    const { userId } = useParams()
    let { sendRequest } = useFriendRequest({
        component: null, onFriendRequestReceived: null

    })
    const [friendShipStatus, setFriendShipStatus] = React.useState(-1)
    const currentUser = useSelector((state) => state.currentUser.value)
    function getFriendshipType(currentUserId, userId) {
        FriendshipService.getFriendshipType(currentUserId, userId)
            .then(({ friendshipType }) => {
                setFriendShipStatus(friendshipType);
            })
    }
    React.useEffect(() => {
        if (currentUser.Id * 1 !== userId * 1) {
            getFriendshipType(currentUser.Id, userId)
        }
    }, [])
    function addFriend() {
        FriendshipService.createFriendRequest(currentUser, userId)
            .then(() => {
                getFriendshipType(currentUser.Id, userId)

            })
        sendRequest({
            senderId: currentUser.Id,
            receiverId: userId,
            relatedSchemaId: currentUser.Id,
            body: `${currentUser.name} has send you a friend request.`,
            type: 3
        }, userId)
    }
    function cancelRequest() {
        FriendshipService.cancelFriendRequest(currentUser.Id, userId)
            .then(() => {
                setFriendShipStatus(0)
            })
    }
    return (
        <div className="userProfileInfoContainer">
            <div className="coverPhotoContainer">
                <img src={props.userInfo.coverPhoto} alt="" className="userCoverPhoto" />
                <div className="nameAndPropic">
                    <div className="profileViewUserInfoContainer">
                        <img src={props.userInfo.profileImage} alt="" className="profileViewProPic" />

                    </div>
                    <div className="flex">
                        <div className="textInfo">
                            <p className="userName">{props.userInfo.name}</p>
                            <p>133 friends</p>
                        </div>

                    </div>
                    {friendShipStatus !== -1 && <>
                        {friendShipStatus === 0 && <Button variant='contained' onClick={() => {
                            addFriend()
                        }} color='primary'>add friend</Button>}
                        {friendShipStatus === 2 && <Button variant='contained' onClick={() => {
                            cancelRequest()
                        }} color='primary'>Cancel request</Button>}
                        {friendShipStatus === 3 && <div className="flex" style={{
                            gap: "10px"
                        }}>
                            <Button variant='contained' onClick={() => {
                                FriendshipService.accept(currentUser.Id, userId)
                                    .then(setFriendShipStatus(1))
                            }}>Accept</Button>
                            <Button variant='contained' onClick={() => {
                                FriendshipService.removeFriendshipRecord(currentUser.Id, userId)
                                    .then(setFriendShipStatus(0))
                            }}>Reject</Button>

                        </div>}
                        {friendShipStatus === 1 && <div className="flex">
                            <Button variant='contained' onClick={() => {
                                FriendshipService.removeFriendshipRecord(currentUser.Id, userId)
                                    .then(setFriendShipStatus(0))
                            }}>Unfriend</Button>

                        </div>}
                    </>}

                </div>

            </div>
            <div className="nameContainer">


            </div>

        </div>
    );
}

export default UserProfileInfo;