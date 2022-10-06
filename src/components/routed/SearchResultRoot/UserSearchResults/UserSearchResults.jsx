import React from 'react';
import { useSelector } from 'react-redux';
import './UserSearchResults.css'
function UserSearchResults({ query }) {
    const currentUser = useSelector((state) => state.currentUser.value)
    React.useEffect(() => {

    }, [])
    return (
        <div>

        </div>
    );
}

export default UserSearchResults;