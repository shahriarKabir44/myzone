import React from 'react';
import PostItem from '../postItem/PostItem';

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