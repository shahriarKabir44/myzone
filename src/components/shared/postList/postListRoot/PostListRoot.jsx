import React from 'react';
import InitialCreatePostView from '../../CreatePost/InitialView/InitialCreatePostView';
import PostItem from '../postItem/PostItem';
import './PostListRoot.css'
let posts = []
function PostListRoot(props) {
    return (
        <div className='postsView'>
            <InitialCreatePostView />
            {posts.map((post, index) => {
                return <PostItem key={index} post={post} />
            })}
        </div>
    );
}

export default PostListRoot;