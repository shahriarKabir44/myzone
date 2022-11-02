import React from 'react';
import SearchingServices from '../../../../services/SearchingServices';
import { useSelector } from 'react-redux'
import { SearchResultUserContainer } from '../UserSearchResults/UserSearchResults';
function InterestSearchResult({ query, onLoad }) {
    const currentUser = useSelector((state) => state.currentUser.value)
    const [searchResult, setSearchResult] = React.useState([])
    React.useEffect(() => {
        onLoad()
        SearchingServices.searchUsersByInterest(query, currentUser.Id)
            .then(({ users }) => {
                setSearchResult(users)
            })
    }, [])
    return (
        <div>
            <h3 style={{
                color: 'white',
                fontWeight: 100
            }}>Users with "{query}" interest</h3>
            {searchResult.filter(user => user.Id !== currentUser.Id).map((user, index) => {
                return <SearchResultUserContainer key={index} user={user} />
            })}
        </div>
    );
}

export default InterestSearchResult;