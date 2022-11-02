import React from 'react';
import { Link } from 'react-router-dom';
import FriendshipService from '../../../../../../services/FriendshipService';
import Globals from '../../../../../../services/Globals';
import './FriendListItem.css'

function FriendListItem(props) {
    const [numMutualFriends, setNumMutualFriends] = React.useState(0)
    React.useEffect(() => {
        FriendshipService.countMutualFriends(props.user.Id, props.currentUserId)
            .then(({ numMutualFriends }) => {
                setNumMutualFriends(numMutualFriends)
            })
    }, [])
    return (
        <Link to={'/profile/' + props.user.Id} style={{
            textDecoration: 'none',
        }}>
            <div className='FriendListItemContainer'>
                <div className="friendImageContainer">
                    <img src={Globals.SERVER_URL + props.user.profileImage} alt="" className="friendImage" />
                </div>
                <div className="frinedInfoContainer">
                    <p style={{
                        margin: "0",
                        fontSize: "20px"
                    }} className="frinedName">
                        {props.user.name}
                    </p>
                    <p style={{
                        margin: "0",

                    }} className="friendTime">
                        {numMutualFriends} mutual friends
                    </p>
                    <p style={{
                        margin: "0",

                    }} className="friendTime">
                        Friends since {(new Date(props.user.initiation_time)).toLocaleString()}
                    </p>
                </div>

            </div></Link>
    );
}

export default FriendListItem;