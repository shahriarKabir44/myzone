import React from 'react';
import PostImageContainer from '../PostImageContainer/PostImageContainer';
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './PostDetailsRoot.css'
import PostComments from '../PostComments/PostComments';
import PostService from '../../../../service/PostService';
import CommentService from '../../../../service/CommentService';

function PostDetailsRoot(props) {
    const currentUser = useSelector((state) => state.currentUser.value)
    const currentRoute = useParams()
    const [postDetails, setPostDetails] = React.useState({
        "Id": "",
        "body": " ",
        "attached_media": "[]",
        "posted_on": 0,
        "numReactions": null,
        "numComments": null,
        "creatorInfo": {
            "Id": "",
            "name": "",
            "profileImage": ""
        },
        "getFirstComments": []
    })
    const [postComments, setPostComments] = React.useState([])
    React.useEffect(() => {
        PostService.getPostDetails(currentRoute.Id)
            .then((postDetails) => {
                setPostComments(postDetails.getFirstComments.reverse())

                setPostDetails({ ...postDetails, getFirstComments: [] })
            })
    }, [])
    return (
        <div className="mainPostDetailsContainer">
            <div></div>
            <div className="postDetailsContainer">
                <div className="postCreatorInfoContainer">
                    <div style={{
                        width: '50px'
                    }} className="userImg">
                        <img src={postDetails.creatorInfo.profileImage} alt="" className="creatorImg" />
                    </div>
                    <div className="infoContainer">
                        <p style={{
                            margin: 0
                        }} className="creatorName">{postDetails.creatorInfo.name}</p>
                        <p style={{
                            margin: 0
                        }} className="creationTime"> {new Date(postDetails.posted_on).toLocaleString()} </p>
                    </div>
                </div>
                <div className="postBodyContainer">
                    <p className="postText">{postDetails.body}</p>
                </div>
                {JSON.parse(postDetails.attached_media).length > 0 && <PostImageContainer images={JSON.parse(postDetails.attached_media)} />}

                <div className="reactionsTab">
                    <div className="likes postInteractions">
                        <ThumbUpIcon className='reactionBtn' />
                        <p className="likesCount reactionText">{postDetails.numReactions ? postDetails.numReactions : 0}</p>
                    </div>
                    <div className="comments postInteractions">
                        <CommentIcon className='reactionBtn' />
                        <p className="commentsCount  reactionText">{postDetails.numComments ? postDetails.numComments : 0}</p>
                    </div>
                </div>
                {/* needs an event handler to update postComments when a comment is posted */}
                <PostComments onCommentCreated={(comment) => {
                    let newComment = {
                        commentBody: comment,
                        commentedBy: currentUser.Id,
                        postId: currentRoute.Id
                    }
                    CommentService.postComment(newComment)
                        .then(({ data }) => {
                            console.log(data);
                            setPostComments([...postComments, data])
                        })
                }} comments={postComments} />
            </div>
            <div></div>
        </div>

    );
}

export default PostDetailsRoot;