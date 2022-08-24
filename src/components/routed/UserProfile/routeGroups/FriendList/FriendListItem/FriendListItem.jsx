import React from 'react';
import './FriendListItem.css'
function FriendListItem(props) {
    return (
        <div className='FriendListItemContainer'>
            <div className="friendImageContainer">
                <img src={props.user.profileImage} alt="" className="friendImage" />
            </div>
            <div style={{
                lineHeight: "1px"
            }}>
                <p className="frinedName">
                    {props.user.name}
                </p>
                <p className="friendTime">
                    Friends since 20th April 2022
                </p>
            </div>

        </div>
    );
}

export default FriendListItem;