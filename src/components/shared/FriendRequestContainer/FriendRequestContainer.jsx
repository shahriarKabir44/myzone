import React from 'react';
import { useSelector } from 'react-redux';
import FriendshipService from '../../../services/FriendshipService';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import { closeFriendRequestTrayView } from '../../../redux/FriendRequestToggleManager'
import Modal from '@mui/material/Modal';
import './FriendRequestContainer.css'
import NotificationListItem from '../SlideInNotificationsContainer/NotificationListItem/NotificationListItem'
function FriendRequestContainer(props) {
    const friendRequestTrayToggleDispatcher = useDispatch()
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
    };
    const { status: toggleStatus } = useSelector(state => state.FriendRequestToggleManager.value)
    return (
        <div  >
            <Modal
                open={toggleStatus === 1}
                onClose={() => {
                    friendRequestTrayToggleDispatcher(closeFriendRequestTrayView())
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    {toggleStatus === 1 && <NotificationsRoot />}
                </Box>
            </Modal>

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
    return (<>
        <h2 className='nottificationContinerLable'>Friend requests</h2>

        <div style={{
            background: "#47494a"
        }} className={`notificationsContainerRoot`}>
            {notificationsList.map((notification, index) => {
                return <NotificationListItem key={index} notification={notification} />
            })}
        </div>
    </>)
}

export default FriendRequestContainer;