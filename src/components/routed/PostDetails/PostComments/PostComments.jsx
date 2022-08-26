import React from 'react';
import './PostComments.css'

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
function PostComments(props) {
    return (
        <div className="postCommentsRoot">
            <p style={{
                fontSize: "20px",
                color: "white",
                fontWeight: "100"
            }}>Comments</p>
            {comments.map((comment, index) => {
                return <PostCommentItem key={index} comment={comment} />
            })}
        </div>
    );
}

function PostCommentItem({ comment }) {
    return (
        <div className="commentRoot">
            <div className="commenterImgContainer" style={{ width: "50px" }}>
                <img src={comment.commenterInfo.profileImage} alt="" style={{ width: "100%" }} className="commenterImg" />
            </div>
            <div className="commentsContainer">

                <p className="commenterName">{comment.commenterInfo.name}</p>
                <p className="commentBody">
                    {comment.body}
                </p>
                <p className="commentTime">{new Date(comment.time).toLocaleString()}</p>


            </div>
        </div>
    )
}

export default PostComments;