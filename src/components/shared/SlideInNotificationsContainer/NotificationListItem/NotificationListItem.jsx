import React from 'react';
import './NotificationListItem.css'

function NotificationListItem({ notification }) {

    return (
        <>
            {notification.notificationType === 1 && <div className="notiificationContainer">
                <div className="relatedSchemaImageContainer">
                    <img src={notification.relatedSchemaInfo.data.imageURL} alt="" className="relatedImgContainer" />
                </div>
                <div className="notificationMessageContainer">
                    <p className="notificationMessage">{notification.message}</p>
                    <p className="notificationTime">{new Date(notification.time).toLocaleTimeString()} {new Date(notification.time).toLocaleDateString()}</p>
                </div>
                <div className="initiatorInfoContainer ">
                    <img src={notification.initiatorInfo.data.profileImageURL} alt="" style={{ width: "50px" }} className="initiatorImg userImg" />
                </div>
            </div>}
            {notification.notificationType === 2 && <div className="notiificationContainer">
                <div className="initiatorInfoContainer ">
                    <img src={notification.initiatorInfo.data.profileImageURL} alt="" style={{ width: "50px" }} className="initiatorImg userImg" />
                </div>
                <div className="notificationMessageContainer">
                    <p className="notificationMessage">{notification.message}</p>
                    <p className="notificationTime">{new Date(notification.time).toLocaleTimeString()} {new Date(notification.time).toLocaleDateString()}</p>
                </div>
            </div>}
        </>
    );
}

export default NotificationListItem;