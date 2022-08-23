import React from 'react';
import './FriendListItem.css'
function FriendListItem(props) {
    return (
        <div className='FriendListItemContainer'>
            <div className="friendImageContainer">
                <img src={props.user.profileImage} alt="" className="friendImage" />
            </div>
            <p className="frinedName">
                {props.user.name}
            </p>
        </div>
    );
}

export default FriendListItem;