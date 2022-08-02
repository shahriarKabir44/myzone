import React from 'react';
import PostItem from '../postItem/PostItem';
import './PostListRoot.css'
function PostListRoot(props) {
    return (
        <div className='postsView'>
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />

        </div>
    );
}

export default PostListRoot;