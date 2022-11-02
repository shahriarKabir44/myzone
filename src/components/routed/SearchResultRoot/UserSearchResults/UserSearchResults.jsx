import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FriendshipService from '../../../../services/FriendshipService';
import Globals from '../../../../services/Globals';
import SearchingServices from '../../../../services/SearchingServices';
import InterestManagerService from '../../../../services/InterestManagerService';
import './UserSearchResults.css'
import { InterestItem } from '../../UserProfile/routeGroups/ProfileHome/InterestList/InterestList';
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
export function SearchResultUserContainer({ user, currentUserId, shouldShowCommonInterests }) {
    const [mutualFriendsCount, setMutualFriendsCount] = React.useState(0)
    const [commonInterests, setCommonInterests] = React.useState([])
    React.useEffect(() => {
        FriendshipService.countMutualFriends(user.Id, currentUserId)
            .then(({ numMutualFriends }) => {
                setMutualFriendsCount(numMutualFriends)
            })
        if (shouldShowCommonInterests) {
            InterestManagerService.getCommonInterest(user.Id, currentUserId)
                .then(({ commonInterests }) => {
                    const temp = commonInterests.map(commonInterest => commonInterest.interestName)
                    let finalList = []
                    for (let n = 0; n < 3 && n < temp.length; n++) {
                        finalList.push(temp[n])
                    }
                    setCommonInterests(finalList)
                })
        }
    }, [])
    return <Link to={'/profile/' + user.Id} style={{ textDecoration: 'none' }}>
        <div className='searchResultUserInfo' >
            <div className="flex" style={{
                alignItems: 'center',
                alignContent: 'center',
                gap: '10px'
            }}>
                <div className="imgCOntainer">
                    <img src={Globals.SERVER_URL + user.profileImage} alt="" style={{
                        width: '60px'
                    }} className="userImg" />
                </div>
                <div className="infoCOntainer" style={{
                    lineHeight: '5px'
                }}>
                    <h3>{user.name}</h3>
                    <p>{mutualFriendsCount} mutual friends</p>
                    <p>Email: {user.email}</p>
                    <div className="commonInterestContainer">
                        {commonInterests.map((commonInterest, index) => {
                            return <InterestItem key={index} interest={commonInterest} />
                        })}
                    </div>
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
        </div>

    </Link>
}
export default UserSearchResults;