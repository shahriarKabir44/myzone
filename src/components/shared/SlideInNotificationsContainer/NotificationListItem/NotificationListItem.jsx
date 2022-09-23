import React from 'react';
import './NotificationListItem.css'

function NotificationListItem({ notification }) {
    return (
        <>
            {notification.type * 1 === 1 && <div className="notiificationContainer">
                <div className="initiatorInfoContainer ">
                    <img src={notification.senderInfo.profileImage} alt="" style={{ width: "50px" }} className="initiatorImg userImg" />
                </div>
                <div className="notificationMessageContainer">
                    <p className="notificationMessage">{notification.body}</p>
                    <p className="notificationTime">{new Date(notification.time).toLocaleString()}</p>
                </div>

            </div>}
            {notification.type * 1 === 2 && <div className="notiificationContainer">
                <div className="initiatorInfoContainer ">
                    <img src={notification.senderInfo.profileImage} alt="" style={{ width: "50px" }} className="initiatorImg userImg" />
                </div>
                <div className="notificationMessageContainer">
                    <p className="notificationMessage">{notification.body}</p>
                    <p className="notificationTime">{new Date(notification.time).toLocaleTimeString()} {new Date(notification.time).toLocaleDateString()}</p>
                </div>
            </div>}
        </>
    );
}

export default NotificationListItem;