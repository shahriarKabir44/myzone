import React from 'react';
import ProfileTabSelector from '../../../shared/ProfileTabSelector/ProfileTabSelector';
import UserProfileInfo from '../../../shared/UserProfileInfo/UserProfileInfo';
import './FriendListRoot.css'
import { useSelector } from 'react-redux';
let friendList = [
    {
        name: "Rahul Islam",
        profileImage: "https://www.ecommercetimes.com/wp-content/uploads/sites/5/2022/02/office-worker.jpg"
    }
]
function FriendListRoot(props) {
    const user = useSelector((state) => state.currentUser.value)

    return (
        <div className='FriendListRoot'>
            <div className="infoContainer">
                <UserProfileInfo userInfo={user} />
                <div className="centeredView" style={{
                    margin: "auto"
                }}>
                    <ProfileTabSelector />
                </div>

            </div>
            {friendList.map((friend, index) => {
                return <p key={index}>{friend.name} </p>
            })}
        </div>
    );
}

export default FriendListRoot;