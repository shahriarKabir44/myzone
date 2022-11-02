import React from 'react';
import SearchingServices from '../../../../services/SearchingServices';
import PostItem from '../../../shared/postList/postItem/PostItem';
import './PostSearchResults.css'
function PostSearchResults({ query, onLoad }) {
    const [searchResult, setSearchResult] = React.useState([])
    React.useEffect(() => {
        onLoad(2)
        SearchingServices.searchposts(query)
            .then((posts) => {
                setSearchResult(posts)
            })
    }, [])
    return (
        <div >
            <h3 style={{
                color: 'white',
                fontWeight: 100
            }}>Posts meeting your query</h3>
            <div className="searchResultPostsContainer">
                {searchResult.map((post, index) => {
                    return <PostItem key={index} post={post} />
                })}
            </div>
        </div>
    );
}

export default PostSearchResults;