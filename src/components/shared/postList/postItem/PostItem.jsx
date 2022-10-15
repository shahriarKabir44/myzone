import React from 'react';
import './PostItem.css'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import PostInteractionService from '../../../../service/PostInteractionService'
import { Global } from '@emotion/react';
import Globals from '../../../../service/Globals';
import PostModificationModal from '../../PostModificationModal/PostModificationModal';
function PostItem(props) {

    const [post, setPostDetails] = React.useState(props.post)
    const currentUser = useSelector((state) => state.currentUser.value)
    const [hasReacted, setReactionSatus] = React.useState(false)
    const [postActionVisibility, setPostActionVisibility] = React.useState(false)
    const [postModificationModalVisibility, setPostModificationModalVisibility] = React.useState(false)
    React.useEffect(() => {
        PostInteractionService.hasReacted({
            postId: post.Id,
            reactedBy: currentUser.Id
        }).then(({ data }) => {
            setReactionSatus(data)
        })
    }, [currentUser])
    const creatorInfo = post.creatorInfo
    return (
        <div className='postBody'>
            <div className="postHeader">
                <Link to={'profile/' + creatorInfo.Id} style={{
                    textDecoration: 'none',
                }}>
                    <div className="postCreatorSection">
                        <div className="imageContainer">
                            <img src={Globals.SERVER_IP + creatorInfo.profileImage} alt="" className="creatorImg" />

                        </div>
                        <div className="info">
                            <p className="creatorName postViewText">{creatorInfo.name}</p>
                            <p className="time postViewText">{new Date(post.posted_on).toLocaleString()}</p>
                        </div>
                    </div></Link>
                {post.creatorInfo.Id * 1 === currentUser.Id && <div className='actionContainer'>
                    {postActionVisibility && <div className="postOptionContainer">
                        <div onClick={() => {
                            setPostModificationModalVisibility(true)
                        }} className="postOption">Delete</div>
                        <div className="postOption">Update</div>
                    </div>}
                    <div onClick={() => {
                        setPostActionVisibility(!postActionVisibility);
                    }} style={{
                        cursor: 'pointer',

                    }}>
                        <MoreVertIcon className='moreBtn' />
                    </div>
                </div>}
            </div>
            <Link to={`/post/${post.Id}`} style={{ textDecoration: 'none' }}>
                <div className="postContent">
                    <p className="postText">{post.body}</p>
                    {JSON.parse(post.attached_media)[0] !== null && <div className="postImageContainer">
                        <img src={Globals.SERVER_IP + JSON.parse(post.attached_media)[0]} alt="" className="postImage" />

                    </div>}
                </div>
            </Link>
            {/*  */}
            <div className="reactionsTab">
                <div className="likes postInteractions">
                    <div onClick={() => {
                        if (!hasReacted) {
                            PostInteractionService.react({
                                postId: post.Id,
                                reactedBy: currentUser.Id
                            }).then(() => {
                                let reactionCount = post.numReactions + 1

                                setPostDetails({ ...post, numReactions: reactionCount })
                                setReactionSatus(true)
                            })
                        }
                        else {
                            PostInteractionService.removeReaction({
                                postId: post.Id,
                                reactedBy: currentUser.Id
                            }).then(() => {
                                let reactionCount = post.numReactions - 1
                                setPostDetails({ ...post, numReactions: reactionCount })
                                setReactionSatus(false)
                            })
                        }

                    }}>
                        <ThumbUpIcon style={{
                            color: `${hasReacted ? "#2323ab" : "white"}`
                        }} className='reactionBtn' />

                    </div>
                    <p className="likesCount reactionText">{post.numReactions ? post.numReactions : 0} reaction(s)</p>
                </div>
                <div className="comments postInteractions">
                    <CommentIcon className='reactionBtn' />
                    <p className="commentsCount  reactionText">{post.numComments ? post.numComments : 0} comment(s)</p>
                </div>
            </div>

            <PostModificationModal open={postModificationModalVisibility} handleClose={() => {
                setPostModificationModalVisibility(false)
            }} postId={post.Id} />

        </div>
    );
}

export default PostItem;