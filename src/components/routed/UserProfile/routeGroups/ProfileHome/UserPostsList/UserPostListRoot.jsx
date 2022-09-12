import React from 'react';
import PostItem from '../../../../../shared/postList/postItem/PostItem';
import './UserPostListRoot.css'


function UserPostListRoot(props) {
    return (
        <div className='postListRootUser'>

            {props.createsPosts.map((post, index) => {
                return <PostItem key={index} post={post} />
            })}



        </div>
    );
}

export default UserPostListRoot;