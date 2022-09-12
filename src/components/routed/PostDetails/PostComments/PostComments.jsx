import React from 'react';
import './PostComments.css'
import SendIcon from '@mui/icons-material/Send';
let comments = [
    {
        commentedBy: 1,
        time: (new Date()) * 1,
        body: "Very nice",
        commenterInfo: {
            name: "Shahriar Kabir",
            profileImage: "https://www.ecommercetimes.com/wp-content/uploads/sites/5/2022/02/office-worker.jpg"
        }
    },
    {
        commentedBy: 1,
        time: (new Date()) * 1 - 3600,
        body: "Very nice indeed",
        commenterInfo: {
            name: "Monir Kabir",
            profileImage: "https://www.humanrights.vic.gov.au/static/6a24f35b5bd855d2b82601b7e130d239/ecd90/IMG-Hub_Employee_workplace_rights.jpg"
        }
    },
]
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

                <p className="commenterName">{comment.commenterName}</p>
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