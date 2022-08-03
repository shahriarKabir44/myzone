import React from 'react';
import PostItem from '../postItem/PostItem';
import './PostListRoot.css'
function PostListRoot(props) {
    return (
        <div className='postsView'>
            <PostItem name="Rahul" />
            <PostItem name="Samir" />
            <PostItem name="Monir" />
            <PostItem name="Rais" />

        </div>
    );
}

export default PostListRoot;