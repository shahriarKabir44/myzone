import React from 'react';
import './PostComments.css'
import { Link } from 'react-router-dom'
import SendIcon from '@mui/icons-material/Send';
import Globals from '../../../../service/Globals';

function PostComments({ comments, onCommentCreated }) {
    return (
        <div className="postCommentsRoot">
            <p style={{
                fontSize: "20px",
                color: "white",
                fontWeight: "100"
            }}>Comments</p>
            {comments.map((comment, index) => {
                return <PostCommentItem key={index} comment={comment} />
            })} <CreateComment onCommentCreated={(comentBody) => {
                onCommentCreated(comentBody)
            }} />
        </div>
    );
}

function PostCommentItem({ comment }) {
    return (
        <div className="commentRoot">
            <div className="commenterImgContainer" style={{ width: "50px" }}>
                <img src={Globals.SERVER_IP + comment.commenterProfileImage} alt="" style={{ width: "100%" }} className="commenterImg" />
            </div>
            <div className="commentsContainer">
                <Link style={{ textDecoration: 'none' }} to={"/profile/" + comment.commenterId}>
                    <p className="commenterName">{comment.commenterName}</p>
                </Link>

                <p className="commentBody">
                    {comment.commentBody}
                </p>
                <p className="commentTime">{new Date(comment.time).toLocaleString()}</p>


            </div>
        </div >
    )
}

function CreateComment(props) {
    const [comment, setComment] = React.useState("")
    return (
        <div className="createCommentRoot">
            <p className='createCommentHeading'>Post a comment</p>
            <div className="commentActionsContainer">
                <input value={comment} onChange={(e) => {
                    setComment(e.target.value)
                }} type="text" name="" className='postCommentInput' placeholder='Comment something' id="" />

                <div onClick={() => {
                    setComment('')
                    props.onCommentCreated(comment)
                }} >
                    <SendIcon style={{
                        padding: "5px",
                        background: "white",
                        borderRadius: "5px"
                    }} />
                </div>


            </div>
        </div>
    )
}

export default PostComments;