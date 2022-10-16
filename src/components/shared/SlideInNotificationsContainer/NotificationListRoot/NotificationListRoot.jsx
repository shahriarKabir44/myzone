import React from 'react';
import NotificationListItem from '../NotificationListItem/NotificationListItem';
import './NotificationListRoot.css'
import { useDispatch, useSelector } from 'react-redux'
import NotificationService from '../../../../service/NotificationService'
import useNotifications from '../../../../service/useNotifications';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { closeNotificationTrayView } from '../../../../redux/NotificationTrayToggleManager'
const modalStyle = {
    position: 'absolute',
    top: 'var(--navBarHeightLarge);',
    right: '10px',
    width: window.innerWidth > 620 ? "30vw" : "95vw",
    height: 'calc(var(--containerHeightLarge) - 50px)',
    bgcolor: '#47494a',
    border: '1px solid',
    boxShadow: 24,
    p: 0,
}
function NotificationListRoot(props) {
    const notificationsTrayToggleDispatcher = useDispatch()
    const toggleStatus = useSelector(state => state.notificationsTrayManager.value.status)

    return (
        <>
            <Modal
                open={toggleStatus === 1}
                onClose={() => {
                    notificationsTrayToggleDispatcher(closeNotificationTrayView())
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    {toggleStatus === 1 && <NotificationsListContainer />}

                </Box>
            </Modal>
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
    }} className={`notificationsContainerRoot`}>
        <h2 className='nottificationContinerLable'>Notifications</h2>
        {notificationsList.map((notification, index) => {
            return <NotificationListItem key={index} notification={notification} />
        })}
    </div>)
}


export default NotificationListRoot;