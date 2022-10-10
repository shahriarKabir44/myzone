import React from 'react';
import ActiveUser from './ActiveUser/ActiveUser';
import './ActiveUsersList.css'
import FriendshipService from '../../../../service/FriendshipService'
import { useSelector } from 'react-redux';
let users = [
    {
        name: "Rahul Islam",
        img: "https://blog.hubspot.com/hubfs/employee-retention-rate.jpg"
    },
    {
        name: "Noor Mohammad",
        img: "https://www.ecommercetimes.com/wp-content/uploads/sites/5/2022/02/office-worker.jpg"
    },
    {
        name: "Moniruzzaman",
        img: "https://usveteransmagazine.com/wp-content/uploads/2017/10/Interview-Tips-1.jpg"
    },
    {
        name: "Samirul Alam",
        img: "https://www-assets.perkbox.com/media/10327/i620/4e203c806075308869b4.jpg"
    }
]
function ActiveUsersList(props) {
    const currentUser = useSelector((state) => state.currentUser.value)
    const [activeFriendsList, setActiveFriendsList] = React.useState([])
    React.useEffect(() => {
        FriendshipService.getActiveFriends(currentUser.Id)
            .then(({ activeFriends }) => {
                setActiveFriendsList((activeFriends))
            })
    }, [])
    return (
        <div className='ActiveUsersList'>
            <div className="heading">
                <p className="headingText">Active users</p>
            </div>
            {activeFriendsList.map((user, index) => {
                return <ActiveUser key={index} user={user} />
            })}




        </div>
    );
}

export default ActiveUsersList;