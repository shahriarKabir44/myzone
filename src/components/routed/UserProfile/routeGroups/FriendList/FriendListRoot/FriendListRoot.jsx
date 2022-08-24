import React from 'react';
import ProfileTabSelector from '../../../shared/ProfileTabSelector/ProfileTabSelector';
import UserProfileInfo from '../../../shared/UserProfileInfo/UserProfileInfo';
import './FriendListRoot.css'
import { useSelector } from 'react-redux';
import FriendListItem from '../FriendListItem/FriendListItem';
let friendList = [
    {
        name: "Rahul Islam",
        profileImage: "https://www.ecommercetimes.com/wp-content/uploads/sites/5/2022/02/office-worker.jpg"
    },
    {
        name: "Monir Islam",
        profileImage: "https://www.ecommercetimes.com/wp-content/uploads/sites/5/2022/02/office-worker.jpg"
    },
    {
        name: "Tarif Hasan",
        profileImage: "https://www.ecommercetimes.com/wp-content/uploads/sites/5/2022/02/office-worker.jpg"
    },
    {
        name: "Samirul Alam",
        profileImage: "https://www.ecommercetimes.com/wp-content/uploads/sites/5/2022/02/office-worker.jpg"
    },
    {
        name: "Rahul Islam",
        profileImage: "https://www.ecommercetimes.com/wp-content/uploads/sites/5/2022/02/office-worker.jpg"
    },
    {
        name: "Rahul Islam",
        profileImage: "https://www.ecommercetimes.com/wp-content/uploads/sites/5/2022/02/office-worker.jpg"
    },
    {
        name: "Rahul Islam",
        profileImage: "https://www.ecommercetimes.com/wp-content/uploads/sites/5/2022/02/office-worker.jpg"
    },
    {
        name: "Monir Islam",
        profileImage: "https://www.ecommercetimes.com/wp-content/uploads/sites/5/2022/02/office-worker.jpg"
    },
    {
        name: "Tarif Hasan",
        profileImage: "https://www.ecommercetimes.com/wp-content/uploads/sites/5/2022/02/office-worker.jpg"
    },
    {
        name: "Samirul Alam",
        profileImage: "https://www.ecommercetimes.com/wp-content/uploads/sites/5/2022/02/office-worker.jpg"
    }
]
function FriendListRoot(props) {
    const user = useSelector((state) => state.currentUser.value)

    return (
        <div className='FriendListRoot'>


            <UserProfileInfo userInfo={user} />
            <div className="centeredView" style={{


                position: "sticky",
                top: 0
            }}>
                <ProfileTabSelector pageIndex={2} />
            </div>

            <div className="friendListheadingTextContainer">
                <p className='friendListheadingText'>Friends</p>
            </div>
            <div className="friendListCOntainerRoot">

                <div className="friendListContainer">
                    {
                        friendList.map((friend, index) => {
                            return <FriendListItem key={index} user={friend} />
                        })
                    }
                </div>
            </div>


        </div >
    );
}

export default FriendListRoot;