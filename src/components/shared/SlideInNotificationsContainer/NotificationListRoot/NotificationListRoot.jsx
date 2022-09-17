import React from 'react';
import NotificationListItem from '../NotificationListItem/NotificationListItem';
import './NotificationListRoot.css'
import { useSelector } from 'react-redux'
let notificationList = [
    {
        senderId: "1",
        receiverId: "2",
        notificationType: 1,
        message: "Shahriar Kabir Liked your post",
        relatedSchemaId: 2,
        time: (new Date()) * 1,
        initiatorInfo: {
            type: 1,
            data: {
                name: "Shahriar Kabir",
                Id: 1,
                profileImage: "https://www.hubspot.com/hubfs/employee-retention-rate.jpg"
            }
        },
        relatedSchemaInfo: {
            data: {
                Id: 2,
                type: "post",
                imageURL: "https://i.ytimg.com/vi/MPV2METPeJU/maxresdefault.jpg"
            }
        }
    },
    {
        senderId: "1",
        receiverId: "2",
        notificationType: 2,
        message: "Shahriar Kabir Accepted your friend request",
        relatedSchemaId: 2,
        time: (new Date()) * 1 - 36000,
        initiatorInfo: {
            type: 1,
            data: {
                name: "Shahriar Kabir",
                Id: 1,
                profileImage: "https://www.hubspot.com/hubfs/employee-retention-rate.jpg"
            }
        },
        relatedSchemaInfo: {
            data: null
        }
    },
]
function NotificationListRoot(props) {
    const toggleStatus = useSelector(state => state.notificationsTrayManager.value.status)

    return (
        <>
            {toggleStatus === 1 && <div style={{
                background: "#47494a"
            }} className={`NotificationListRoot SlideInContainerRoot `}>
                {notificationList.map((notification, index) => {
                    return <NotificationListItem key={index} notification={notification} />
                })}
            </div>}
        </>

    );
}


export default NotificationListRoot;