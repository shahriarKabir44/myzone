import React from 'react';
import './PostItem.css'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
function PostItem(props) {

    return (
        <div className='postBody'>
            <div className="postHeader">
                <div className="postCreatorSection">
                    <div className="imageContainer">
                        <img src={props.post.img} alt="" className="creatorImg" />

                    </div>
                    <div className="info">
                        <p className="creatorName postViewText">{props.post.name}</p>
                        <p className="time postViewText">wed 14:45</p>
                    </div>
                </div>
                <MoreVertIcon className='moreBtn' />
            </div>
            <div className="postContent">
                <p className="postText">{props.post.txt}</p>
                <div className="postImageContainer">
                    <img src={props.post.postImg} alt="" style={{ width: "100%" }} className="postImage" />

                </div>
            </div>
            <div className="reactionsTab">
                <div className="likes postInteractions">
                    <ThumbUpIcon className='reactionBtn' />
                    <p className="likesCount reactionText">{Math.floor(Math.random() * 100) + 10}</p>
                </div>
                <div className="comments postInteractions">
                    <CommentIcon className='reactionBtn' />
                    <p className="commentsCount  reactionText">20</p>
                </div>
            </div>
        </div>
    );
}

export default PostItem;