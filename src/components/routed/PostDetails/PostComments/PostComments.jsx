import React from 'react';
import './PostComments.css'
import { Link } from 'react-router-dom'
import SendIcon from '@mui/icons-material/Send';

function PostComments({ comments }) {
    return (
        <div className="postCommentsRoot">
            <p style={{
                fontSize: "20px",
                color: "white",
                fontWeight: "100"
            }}>Comments</p>
            {comments.map((comment, index) => {
                return <PostCommentItem key={index} comment={comment} />
            })} <CreateComment />
        </div>
    );
}

function PostCommentItem({ comment }) {
    return (
        <div className="commentRoot">
            <div className="commenterImgContainer" style={{ width: "50px" }}>
                <img src={comment.commenterProfileImage} alt="" style={{ width: "100%" }} className="commenterImg" />
            </div>
            <div className="commentsContainer">
                <Link to={"/profile/" + comment.commenterId}>
                    <p className="commenterName">{comment.commenterName}</p>
                </Link>

                <p className="commentBody">
                    {comment.commentBody}
                </p>
                <p className="commentTime">{new Date(comment.time).toLocaleString()}</p>


            </div>
        </div>
    )
}

function CreateComment(props) {
    return (
        <div className="createCommentRoot">
            <p className='createCommentHeading'>Post a comment</p>
            <div className="commentActionsContainer">
                <input type="text" name="" className='postCommentInput' placeholder='Comment something' id="" />

                <SendIcon style={{
                    padding: "5px",
                    background: "white",
                    borderRadius: "5px"
                }} />

            </div>
        </div>
    )
}

export default PostComments;