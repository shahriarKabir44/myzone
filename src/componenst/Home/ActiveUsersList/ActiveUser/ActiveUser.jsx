import React from 'react';
import './ActiveUser.css'
const stockImage = "https://blog.hubspot.com/hubfs/employee-retention-rate.jpg"
function ActiveUser(props) {
    return (
        <div className='activeUserContainer'>
            <div className="activeUserImgContainer">
                <img src={stockImage} alt="" className="activeUserImg" />

            </div>
            <p className="activeUserName">Shahriar Kabir</p>
        </div>
    );
}

export default ActiveUser;