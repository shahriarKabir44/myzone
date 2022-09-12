import React from 'react';
import InitialCreatePostView from '../../CreatePost/InitialView/InitialCreatePostView';
import PostItem from '../postItem/PostItem';
import './PostListRoot.css'
let posts = [
    {
        "Id": "24",
        "body": "abcderfuhveiue ",
        "posted_by": "71",
        "posted_on": 1662802730293,
        "numReactions": null,
        "numComments": null,
        "attached_media": "[\"http://localhost:4000/posts/71/24/1.jpg\",\"http://localhost:4000/posts/71/24/0.jpg\"]",
        "creatorInfo": {
            "Id": "71",
            "name": "ww",
            "profileImage": "http://localhost:4000/profileImages/71.jpg"
        }
    },
    {
        "Id": "23",
        "body": "r34r4",
        "posted_by": "71",
        "posted_on": 1662799934512,
        "numReactions": null,
        "numComments": null,
        "attached_media": "[\"http://localhost:4000/posts/71/23/0.jpg\"]",
        "creatorInfo": {
            "Id": "71",
            "name": "ww",
            "profileImage": "http://localhost:4000/profileImages/71.jpg"
        }
    },
    {
        "Id": "22",
        "body": "fwegrqg",
        "posted_by": "71",
        "posted_on": 1662791867533,
        "numReactions": null,
        "numComments": null,
        "attached_media": "[\"http://localhost:4000/posts/71/22/0.jpg\",\"http://localhost:4000/posts/71/22/1.jpg\"]",
        "creatorInfo": {
            "Id": "71",
            "name": "ww",
            "profileImage": "http://localhost:4000/profileImages/71.jpg"
        }
    },
    {
        "Id": "21",
        "body": "fwegrqg",
        "posted_by": "71",
        "posted_on": 1662791773777,
        "numReactions": null,
        "numComments": null,
        "attached_media": "[\"http://localhost:4000/posts/71/21/0.jpg\",\"http://localhost:4000/posts/71/21/1.jpg\"]",
        "creatorInfo": {
            "Id": "71",
            "name": "ww",
            "profileImage": "http://localhost:4000/profileImages/71.jpg"
        }
    },
    {
        "Id": "20",
        "body": "feewf",
        "posted_by": "71",
        "posted_on": 1662791675284,
        "numReactions": null,
        "numComments": null,
        "attached_media": "[null,null]",
        "creatorInfo": {
            "Id": "71",
            "name": "ww",
            "profileImage": "http://localhost:4000/profileImages/71.jpg"
        }
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