import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FriendshipService from '../../../../service/FriendshipService';
import Globals from '../../../../service/Globals';
import SearchingServices from '../../../../service/SearchingServices';
import './UserSearchResults.css'
function UserSearchResults({ query, onLoad }) {
    const currentUser = useSelector((state) => state.currentUser.value)
    const [searchResult, setSearchResultUsers] = React.useState([])
    React.useEffect(() => {
        onLoad()
        SearchingServices.findUsers(query, currentUser.Id)
            .then(({ users }) => {
                setSearchResultUsers(users)
            })
    }, [])
    return (
        <div>
            <h3 style={{
                color: 'white',
                fontWeight: 100
            }}>Users meeting your query</h3>
            <div className="searchResultUsersContainer">
                {searchResult.map((user, index) => {
                    return <SearchResultUserContainer currentUserId={currentUser.Id} key={index} user={user} />
                })}

            </div>
        </div>
    );
}
export function SearchResultUserContainer({ user, currentUserId }) {
    const [mutualFriendsCount, setMutualFriendsCount] = React.useState(0)
    React.useEffect(() => {
        FriendshipService.countMutualFriends(user.Id, currentUserId)
            .then(({ numMutualFriends }) => {
                setMutualFriendsCount(numMutualFriends)
            })
    }, [])
    return <Link to={'/profile/' + user.Id} style={{ textDecoration: 'none' }}>
        <div className='searchResultUserInfo' >
            <div className="flex" style={{
                alignItems: 'center',
                alignContent: 'center',
                gap: '10px'
            }}>
                <div className="imgCOntainer">
                    <img src={Globals.SERVER_IP + user.profileImage} alt="" style={{
                        width: '60px'
                    }} className="userImg" />
                </div>
                <div className="infoCOntainer" style={{
                    lineHeight: '5px'
                }}>
                    <h3>{user.name}</h3>
                    <p>{mutualFriendsCount} mutual friends</p>
                    <p>Email: {user.email}</p>
                </div>
            </div>

            <div className="actionButtonContainer">
                {user.friendshipType === 1 && <div className="friendshipStatus">
                    you are friends
                </div>}
                {user.friendshipType === null && <div className="friendshipStatus">
                    you are not friends
                </div>}
            </div>
        </div></Link>
}
export default UserSearchResults;