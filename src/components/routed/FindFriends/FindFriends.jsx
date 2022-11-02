import React from 'react';
import './FindFriends.css'
import { useSelector } from 'react-redux'
import FriendshipService from '../../../services/FriendshipService';
import { SearchResultUserContainer } from '../SearchResultRoot/UserSearchResults/UserSearchResults'
function FindFriends(props) {
    const currentUser = useSelector((state) => state.currentUser.value)
    const [mutualFriends, setMutualFriendsList] = React.useState([])
    const [usersWithCommonInterests, setUsersWithCommonInterestsList] = React.useState([])
    const [viewingTab, setViewingTab] = React.useState(0)
    const [friendRequests, setFriendRequestList] = React.useState([])
    React.useEffect(() => {
        FriendshipService.getMutualFriends(currentUser.Id)
            .then(({ mutualFriends }) => {
                setMutualFriendsList(mutualFriends)
            })
        FriendshipService.findUsersWithCommonInterests(currentUser.Id)
            .then(({ usersWithCommonInterests }) => {
                setUsersWithCommonInterestsList(usersWithCommonInterests)
            })
        FriendshipService.getFriendRequests(currentUser.Id)
            .then(({ friendRequests }) => {
                setFriendRequestList(friendRequests)
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
            <div className="mutualFriendsContainer" style={{

                padding: "10px",

            }}>
                <details className='fiendFriendsGroupContainer' open={viewingTab === 0} style={{
                }}>
                    <summary onClick={() => {
                        setViewingTab(0)
                    }} style={{

                        display: 'flex',
                        cursor: 'pointer',
                    }}><h2 style={{
                        color: 'white',
                        fontWeight: 100,
                    }}>Users with common friends</h2></summary>

                    {viewingTab === 0 && mutualFriends.map((mutualFriend, index) => {
                        return <SearchResultUserContainer currentUserId={currentUser.Id} key={index} user={mutualFriend} />
                    })}
                </details>
                <details className='fiendFriendsGroupContainer' open={viewingTab === 2} style={{
                }}>
                    <summary onClick={() => {
                        setViewingTab(2)
                    }} style={{

                        display: 'flex',
                        cursor: 'pointer',
                    }}><h2 style={{
                        color: 'white',
                        fontWeight: 100,
                    }}>Friend requests</h2></summary>

                    {viewingTab === 2 && friendRequests.length > 0 && friendRequests.map((mutualFriend, index) => {
                        return <SearchResultUserContainer currentUserId={currentUser.Id} key={index} user={mutualFriend} />
                    })}
                    {viewingTab === 2 && friendRequests.length === 0 && <h3>No friend request left</h3>}
                </details>
                <details open={viewingTab === 1} className='fiendFriendsGroupContainer'>
                    <summary onClick={() => {
                        setViewingTab(1)
                    }} style={{

                        display: 'flex',
                        cursor: 'pointer',
                    }}><h2 style={{
                        color: 'white',
                        fontWeight: 100,
                    }}>Users with common interests</h2></summary>

                    {viewingTab === 1 && usersWithCommonInterests.map((user, index) => {
                        return <SearchResultUserContainer currentUserId={currentUser.Id} key={index} user={user} shouldShowCommonInterests={true} />
                    })}
                </details>

            </div>
        </div>
    );
}

export default FindFriends;