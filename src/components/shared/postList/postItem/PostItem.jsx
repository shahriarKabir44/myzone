import React from 'react';
import './PostItem.css'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Link } from 'react-router-dom';
function PostItem(props) {
    const creatorInfo = props.post.creatorInfo
    return (
        <div className='postBody'>
            <div className="postHeader">
                <div className="postCreatorSection">
                    <div className="imageContainer">
                        <img src={creatorInfo.profileImage} alt="" className="creatorImg" />

                    </div>
                    <div className="info">
                        <p className="creatorName postViewText">{creatorInfo.name}</p>
                        <p className="time postViewText">{new Date(props.post.posted_on).toLocaleString()}</p>
                    </div>
                </div>
                <MoreVertIcon className='moreBtn' />
            </div>
            <Link to={`/post/${props.post.Id}`}>
                <div className="postContent">
                    <p className="postText">{props.post.body}</p>
                    {JSON.parse(props.post.attached_media)[0] !== null && <div className="postImageContainer">
                        <img src={JSON.parse(props.post.attached_media)[0]} alt="" style={{ width: "100%" }} className="postImage" />

                    </div>}
                </div>
            </Link>
            {/*  */}
            <div className="reactionsTab">
                <div className="likes postInteractions">
                    <ThumbUpIcon className='reactionBtn' />
                    <p className="likesCount reactionText">{props.post.numReactions ? props.post.numReactions : 0}</p>
                </div>
                <div className="comments postInteractions">
                    <CommentIcon className='reactionBtn' />
                    <p className="commentsCount  reactionText">{props.post.numComments ? props.post.numComments : 0}</p>
                </div>
            </div>
        </div>
    );
}

export default PostItem;