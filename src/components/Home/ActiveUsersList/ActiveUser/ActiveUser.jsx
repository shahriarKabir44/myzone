import React from 'react';
import './ActiveUser.css'
function ActiveUser(props) {
    return (
        <div className='activeUserContainer'>
            <div className="activeUserImgContainer">
                <img src={props.user.img} alt="" className="activeUserImg" />

            </div>
            <p className="activeUserName">{props.user.name}</p>
        </div>
    );
}

export default ActiveUser;