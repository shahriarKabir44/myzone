import React from 'react';
import InitialCreatePostView from '../../CreatePost/InitialView/InitialCreatePostView';
import PostItem from '../postItem/PostItem';
import './PostListRoot.css'

import { useSelector } from 'react-redux'
import PostService from '../../../../service/PostService';
import { Button } from '@mui/material';
function PostListRoot(props) {
    const [pageNumber, setPageNumber] = React.useState(0)
    const [postList, setPostList] = React.useState([])
    const currentUser = useSelector((state) => state.currentUser.value)
    function getNewsFeed(pageNumber = 0) {
        PostService.getNewsFeed(currentUser.Id, pageNumber)
            .then((feed) => {
                setPostList([...postList, ...feed])
            })
    }
    React.useEffect(() => {
        getNewsFeed()
    }, [])
    return (
        <div className='postsView'>
            <InitialCreatePostView />
            {postList.map((post, index) => {
                return <PostItem key={index} post={post} />
            })}
            <div style={{
                padding: '20px',
                display: 'flex',
                justifyContent: 'center',
            }}>
                <Button onClick={() => {

                    getNewsFeed(pageNumber + 10)
                    setPageNumber(pageNumber + 10)
                }} variant="outlined">load more</Button>

            </div>
        </div>
    );
}

export default PostListRoot;