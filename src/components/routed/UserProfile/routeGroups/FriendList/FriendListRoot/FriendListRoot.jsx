import React from 'react';
import ProfileTabSelector from '../../../shared/ProfileTabSelector/ProfileTabSelector';
import UserProfileInfo from '../../../shared/UserProfileInfo/UserProfileInfo';
import './FriendListRoot.css'
import FriendListItem from '../FriendListItem/FriendListItem';
import FriendShipService from '../../../../../../services/FriendshipService'
import { useParams } from 'react-router-dom'
function FriendListRoot(props) {
    const currentRoute = useParams()

    const [friendList, setFriendList] = React.useState([])
    const user = props.userInfo
    React.useEffect(() => {

        FriendShipService.getAllFriends(currentRoute.userId)
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
                            return <FriendListItem currentUserId={currentRoute.userId} key={index} user={friend} />
                        })
                    }
                </div>
            </div>


        </div >
    );
}

export default FriendListRoot;