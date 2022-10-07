import React from 'react';
import { useSelector } from 'react-redux';

function FriendRequestContainer(props) {
    const toggleStatus = useSelector(state => state.FriendRequestToggleManager.value)
    return (
        <div>
            <>
                {toggleStatus === 1 && <NotificationsRoot />}
            </>
        </div>
    );
}

function NotificationsRoot() {
    React.useEffect(() => {

    }, [])
    return (<div style={{
        background: "#47494a"
    }} className={`NotificationListRoot SlideInContainerRoot `}>
        <h2 className='nottificationContinerLable'>Friend requests</h2>
    </div>)
}

export default FriendRequestContainer;