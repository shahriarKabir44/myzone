import React from 'react';
import NotificationListItem from '../NotificationListItem/NotificationListItem';
import './NotificationListRoot.css'
import { useSelector } from 'react-redux'
import NotificationService from '../../../../service/NotificationService'
import useNotifications from '../../../../service/useNotifications';

function NotificationListRoot(props) {
    const toggleStatus = useSelector(state => state.notificationsTrayManager.value.status)
    return (
        <>
            {toggleStatus === 1 && <NotificationsListContainer />}
        </>

    );
}

function NotificationsListContainer() {
    const currentUser = useSelector(state => state.currentUser.value)

    const [notificationsList, setNotificationsList] = React.useState([])
    const { subscribe, unsubscribe } = useNotifications("notificationsContainer", (newNotification) => {
        setNotificationsList([newNotification, ...notificationsList])
    })

    React.useEffect(() => {
        subscribe()
        NotificationService.getNotifications(currentUser.Id)
            .then(notifications => {
                setNotificationsList(notifications)
            })
        return () => {
            unsubscribe()
        }
    }, [])
    return (<div style={{
        background: "#47494a"
    }} className={`NotificationListRoot SlideInContainerRoot `}>
        {notificationsList.map((notification, index) => {
            return <NotificationListItem key={index} notification={notification} />
        })}
    </div>)
}


export default NotificationListRoot;