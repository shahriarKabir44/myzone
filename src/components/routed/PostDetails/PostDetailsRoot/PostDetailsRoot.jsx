import React from 'react';
import PostImageContainer from '../PostImageContainer/PostImageContainer';
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './PostDetailsRoot.css'
import PostComments from '../PostComments/PostComments';
import PostService from '../../../../service/PostService';
import PostInteractionService from '../../../../service/PostInteractionService';
import NotificationService from '../../../../service/NotificationService'
import Globals from '../../../../service/Globals';
function PostDetailsRoot(props) {
    const currentUser = useSelector((state) => state.currentUser.value)
    const currentRoute = useParams()
    const [hasReacted, setReactionSatus] = React.useState(false)
    function checkReaction() {
        PostInteractionService.hasReacted({
            postId: currentRoute.Id,
            reactedBy: currentUser.Id
        }).then(({ data }) => {
            setReactionSatus(data)
        })
    }
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
                checkReaction()
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
                        <img src={Globals.SERVER_IP + postDetails.creatorInfo.profileImage} alt="" className="creatorImg" />
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
                {JSON.parse(postDetails.attached_media) && JSON.parse(postDetails.attached_media).length > 0 && <PostImageContainer currentUser={currentUser} postDetails={postDetails} images={JSON.parse(postDetails.attached_media)} />}

                <div className="reactionsTab">
                    <div className="likes postInteractions">
                        <div onClick={() => {
                            if (!hasReacted) {
                                if (currentUser.Id !== postDetails.creatorInfo.Id * 1) {
                                    NotificationService.createNotification({
                                        senderId: currentUser.Id,
                                        receiverId: postDetails.creatorInfo.Id,
                                        body: `${currentUser.name} has liked your post.`,
                                        relatedSchemaId: currentRoute.Id,
                                        type: 1
                                    })
                                }
                                PostInteractionService.react({
                                    postId: currentRoute.Id,
                                    reactedBy: currentUser.Id
                                }).then(() => {
                                    let reactionCount = postDetails.numReactions + 1

                                    setPostDetails({ ...postDetails, numReactions: reactionCount })
                                    setReactionSatus(true)
                                })
                            }
                            else {
                                PostInteractionService.removeReaction({
                                    postId: currentRoute.Id,
                                    reactedBy: currentUser.Id
                                }).then(() => {
                                    let reactionCount = postDetails.numReactions - 1
                                    setPostDetails({ ...postDetails, numReactions: reactionCount })
                                    setReactionSatus(false)
                                })
                            }

                        }}>
                            <ThumbUpIcon style={{
                                color: `${hasReacted ? "#2323ab" : "white"}`
                            }} className='reactionBtn' />

                        </div>
                        <p className="likesCount reactionText">{postDetails.numReactions ? postDetails.numReactions : 0} reaction(s)</p>
                    </div>
                    <div className="comments postInteractions">
                        <CommentIcon className='reactionBtn' />
                        <p className="commentsCount  reactionText">{postDetails.numComments ? postDetails.numComments : 0} comment(s)</p>
                    </div>
                </div>


                <PostComments onCommentCreated={(comment) => {
                    let newComment = {
                        commentBody: comment,
                        commentedBy: currentUser.Id,
                        postId: currentRoute.Id
                    }
                    if (currentUser.Id !== postDetails.creatorInfo.Id * 1) {
                        NotificationService.createNotification({
                            senderId: currentUser.Id,
                            receiverId: postDetails.creatorInfo.Id,
                            body: `${currentUser.name} has commented on your post.`,
                            relatedSchemaId: currentRoute.Id,
                            type: 2
                        })
                    }
                    PostInteractionService.postComment(newComment)
                        .then(({ data }) => {
                            setPostComments([...postComments, data])
                            let numComments = postDetails.numComments + 1
                            setPostDetails({ ...postDetails, numComments: numComments })

                        })
                }} comments={postComments} />
            </div>
            <div></div>
        </div>

    );
}

export default PostDetailsRoot;