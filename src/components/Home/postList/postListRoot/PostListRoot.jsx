import React from 'react';
import PostItem from '../postItem/PostItem';
import './PostListRoot.css'
function PostListRoot(props) {
    return (
        <div className='postsView'>
            <PostItem name="Rahul Islam" />
            <PostItem name="Samirul Alam" />
            <PostItem name="Moniruzzaman" />
            <PostItem name="Rais Rahman" />

        </div>
    );
}

export default PostListRoot;