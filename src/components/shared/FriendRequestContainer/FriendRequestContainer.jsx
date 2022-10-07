import React from 'react';
import { useSelector } from 'react-redux';
import FriendshipService from '../../../service/FriendshipService';
import NotificationListItem from '../SlideInNotificationsContainer/NotificationListItem/NotificationListItem'
function FriendRequestContainer(props) {
    const { status: toggleStatus } = useSelector(state => state.FriendRequestToggleManager.value)
    console.log(toggleStatus)
    return (
        <div>
            <>
                {toggleStatus === 1 && <NotificationsRoot />}
            </>
        </div>
    );
}

function NotificationsRoot() {
    const [notificationsList, setNotificationsList] = React.useState([])

    const currentUser = useSelector((state) => state.currentUser.value)
    React.useEffect(() => {
        FriendshipService.getFriendsipNotification(currentUser.Id)
            .then(notification => {
                setNotificationsList(notification);
            })
    }, [])
    return (<div style={{
        background: "#47494a"
    }} className={`NotificationListRoot SlideInContainerRoot `}>
        <h2 className='nottificationContinerLable'>Friend requests</h2>
        {notificationsList.map((notification, index) => {
            return <NotificationListItem key={index} notification={notification} />
        })}
    </div>)
}

export default FriendRequestContainer;