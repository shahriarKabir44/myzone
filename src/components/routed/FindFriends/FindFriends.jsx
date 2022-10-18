import React from 'react';
import './FindFriends.css'
import { useSelector } from 'react-redux'
import FriendshipService from '../../../service/FriendshipService';
import { SearchResultUserContainer } from '../SearchResultRoot/UserSearchResults/UserSearchResults'
function FindFriends(props) {
    const currentUser = useSelector((state) => state.currentUser.value)
    const [mutualFriends, setMutualFriendsList] = React.useState([])
    const [usersWithCommonInterests, setUsersWithCommonInterestsList] = React.useState([])
    React.useEffect(() => {
        FriendshipService.getMutualFriends(currentUser.Id)
            .then(({ mutualFriends }) => {
                setMutualFriendsList(mutualFriends)
            })
        FriendshipService.findUsersWithCommonInterests(currentUser.Id)
            .then(({ usersWithCommonInterests }) => {
                setUsersWithCommonInterestsList(usersWithCommonInterests)
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
                <details className='fiendFriendsGroupContainer' open={true} style={{
                }}>
                    <summary style={{

                        display: 'flex',
                        cursor: 'pointer',
                    }}><h2 style={{
                        color: 'white',
                        fontWeight: 100,
                    }}>Users with common friends</h2></summary>

                    {mutualFriends.map((mutualFriend, index) => {
                        return <SearchResultUserContainer currentUserId={currentUser.Id} key={index} user={mutualFriend} />
                    })}
                </details>
                <details className='fiendFriendsGroupContainer'>
                    <summary style={{

                        display: 'flex',
                        cursor: 'pointer',
                    }}><h2 style={{
                        color: 'white',
                        fontWeight: 100,
                    }}>Users with common interests</h2></summary>

                    {usersWithCommonInterests.map((user, index) => {
                        return <SearchResultUserContainer currentUserId={currentUser.Id} key={index} user={user} shouldShowCommonInterests={true} />
                    })}
                </details>

            </div>
        </div>
    );
}

export default FindFriends;