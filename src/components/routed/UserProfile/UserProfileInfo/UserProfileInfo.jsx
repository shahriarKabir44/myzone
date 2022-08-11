import React from 'react';
import './UserProfileInfo.css'
function UserProfileInfo(props) {
    return (
        <div className="userProfileInfoContainer">
            <div className="coverPhotoContainer">
                <img src={props.userInfo.coverPhoto} alt="" className="userCoverPhoto" />
            </div>
            <div className="nameContainer">
                <div className="profileViewUserInfoContainer">
                    <img src={props.userInfo.profileImage} alt="" className="profileViewProPic" />

                </div>
                <div className="textInfo">
                    <p className="userName">{props.userInfo.name}</p>
                    <p>133 friends</p>
                </div>
            </div>

        </div>
    );
}

export default UserProfileInfo;