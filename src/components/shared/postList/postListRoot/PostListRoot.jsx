import React from 'react';
import InitialCreatePostView from '../../CreatePost/InitialView/InitialCreatePostView';
import PostItem from '../postItem/PostItem';
import './PostListRoot.css'
let posts = [
    {
        name: "Rahul Islam",
        img: "https://blog.hubspot.com/hubfs/employee-retention-rate.jpg",
        postImg: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sunset-quotes-21-1586531574.jpg",
        txt: "sunset"
    },
    {
        name: "Noor Mohammad",
        img: "https://www.ecommercetimes.com/wp-content/uploads/sites/5/2022/02/office-worker.jpg",
        postImg: "https://i.ytimg.com/vi/MPV2METPeJU/maxresdefault.jpg",
        txt: "Dog"
    },
    {
        name: "Moniruzzaman",
        img: "https://usveteransmagazine.com/wp-content/uploads/2017/10/Interview-Tips-1.jpg",
        postImg: "https://www.rd.com/wp-content/uploads/2021/01/GettyImages-1175550351.jpg",
        txt: "Cat"
    }
]
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