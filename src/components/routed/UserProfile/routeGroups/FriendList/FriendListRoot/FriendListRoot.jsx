import React from 'react';
import ProfileTabSelector from '../../../shared/ProfileTabSelector/ProfileTabSelector';
import UserProfileInfo from '../../../shared/UserProfileInfo/UserProfileInfo';
import './FriendListRoot.css'
import { useSelector } from 'react-redux';
import FriendListItem from '../FriendListItem/FriendListItem';
import FriendShipService from '../../../../../../service/FriendshipService'

function FriendListRoot(props) {
    const [friendList, setFriendList] = React.useState([])
    const user = props.userInfo
    React.useEffect(() => {
        FriendShipService.getAllFriends(user.Id)
            .then(({ data }) => {
                setFriendList(data)
            })
    }, [])
    return (
        <div className='FriendListRoot'>

            <div ref={props.intersectionObserverRef}>
                <UserProfileInfo userInfo={user} />

            </div>
            <div className="centeredView" style={{


                position: "sticky",
                top: "-10px"
            }}>
                <ProfileTabSelector shouldShowUserInfo={props.shouldShowUserInfo} pageIndex={2} />
            </div>

            <div className="friendListheadingTextContainer">
                <p className='friendListheadingText'>Friends</p>
            </div>
            <div className="friendListCOntainerRoot">

                <div className="friendListContainer">
                    {
                        friendList.map((friend, index) => {
                            return <FriendListItem key={index} user={friend} />
                        })
                    }
                </div>
            </div>


        </div >
    );
}

export default FriendListRoot;