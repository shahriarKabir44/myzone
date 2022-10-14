import React from 'react';
import './FindFriends.css'
import { useSelector } from 'react-redux'
import FriendshipService from '../../../service/FriendshipService';
import { SearchResultUserContainer } from '../SearchResultRoot/UserSearchResults/UserSearchResults'
function FindFriends(props) {
    const currentUser = useSelector((state) => state.currentUser.value)
    const [mutualFriends, setMutualFriendsList] = React.useState([])
    React.useEffect(() => {
        FriendshipService.getMutualFriends(currentUser.Id)
            .then(({ mutualFriends }) => {
                setMutualFriendsList(mutualFriends)
            })
    }, [])
    return (
        <div className='postsView' style={{
            background: '#18191A',
            padding: 0,
            margin: 0,
            height: 'var(--containerHeightLarge)',
            display: 'flex',
            justifyContent: 'center',
        }}>
            <div className="mutualFriendsContainer">
                <h2 style={{
                    color: 'white',
                    fontWeight: 100
                }}>Find Friends</h2>
                {mutualFriends.map((mutualFriend, index) => {
                    return <SearchResultUserContainer currentUserId={currentUser.Id} key={index} user={mutualFriend} />
                })}
            </div>
        </div>
    );
}

export default FindFriends;