import React from 'react';
import './NotificationListItem.css'
import { useNavigate } from 'react-router-dom'
function NotificationListItem({ notification }) {
    const navigate = useNavigate()
    function redirect() {
        switch (notification.type * 1) {
            case 1:
                return navigate('post/' + notification.relatedSchemaId)
            case 2:
                return navigate('post/' + notification.relatedSchemaId)


            default:
                break;
        }
    }
    return (
        <>
            <div onClick={() => {
                redirect()
            }} className="notiificationContainer">
                <div className="initiatorInfoContainer ">
                    <img src={notification.senderInfo.profileImage} alt="" style={{ width: "50px" }} className="initiatorImg userImg" />
                </div>
                <div className="notificationMessageContainer">
                    <p className="notificationMessage">{notification.body}</p>
                    <p className="notificationTime">{new Date(notification.time).toLocaleString()}</p>
                </div>

            </div>

        </>
    );
}

export default NotificationListItem;