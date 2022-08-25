import React from 'react';
import './FriendListItem.css'
function FriendListItem(props) {
    return (
        <div className='FriendListItemContainer'>
            <div className="friendImageContainer">
                <img src={props.user.profileImage} alt="" className="friendImage" />
            </div>
            <div className="frinedInfoContainer">
                <p style={{
                    margin: "0"
                }} className="frinedName">
                    {props.user.name}
                </p>
                <p style={{
                    margin: "0"
                }} className="friendTime">
                    Friends since 20th April 2022
                </p>
            </div>

        </div>
    );
}

export default FriendListItem;