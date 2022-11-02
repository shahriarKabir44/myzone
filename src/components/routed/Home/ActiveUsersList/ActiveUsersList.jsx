import React from 'react';
import ActiveUser from './ActiveUser/ActiveUser';
import './ActiveUsersList.css'
import FriendshipService from '../../../../services/FriendshipService'
import { useSelector } from 'react-redux';

function ActiveUsersList(props) {
    const currentUser = useSelector((state) => state.currentUser.value)
    const [activeFriendsList, setActiveFriendsList] = React.useState([])
    function getActiveFriendsList() {
        setTimeout(() => {
            FriendshipService.getActiveFriends(currentUser.Id)
                .then(({ activeFriends }) => {
                    setActiveFriendsList((activeFriends))
                    getActiveFriendsList()
                })
        }, 2 * 60 * 1000);
    }

    React.useEffect(() => {
        FriendshipService.getActiveFriends(currentUser.Id)
            .then(({ activeFriends }) => {
                setActiveFriendsList((activeFriends))
                getActiveFriendsList()
            })
        getActiveFriendsList()

    }, [])
    return (
        <div className='ActiveUsersList'>
            <div className="heading">
                <p className="headingText">Active users</p>
            </div>
            {activeFriendsList.map((user, index) => {
                return <ActiveUser currentUserId={currentUser.Id} key={index} user={user} />
            })}




        </div>
    );
}

export default ActiveUsersList;