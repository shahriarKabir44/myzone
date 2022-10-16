import React from 'react';
import './PostComments.css'
import { Link } from 'react-router-dom'
import SendIcon from '@mui/icons-material/Send';
import Globals from '../../../../service/Globals';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import PostInteractionService from '../../../../service/PostInteractionService';
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: window.innerWidth > 620 ? 400 : '75vw',
    bgcolor: '#7a7a7a',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    color: 'white'
};

function SharedModal({ open, handleClose, children }) {
    return (<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        {children}
    </Modal>)
}


function CommentDeletionView({ open, handleClose, Id, handleCommentDeletion, }) {
    return (<SharedModal open={open} handleClose={handleClose} children={<Box sx={modalStyle}>
        <h2 style={{
            color: 'white',
            fontWeight: 100
        }}> Are you sure you want to delete the comment?</h2>
        <div className="flex" style={{
            justifyContent: 'space-between',

        }}>
            <Button variant="contained" onClick={() => {
                PostInteractionService.deleteComment(Id)
                    .then(() => {
                        handleClose()
                        handleCommentDeletion()
                    })
            }} color='error'>Yes</Button>
            <Button variant="contained" onClick={() => {
                handleClose();
            }} color='success'>No</Button>

        </div>
    </Box>} />)
}

function PostComments({ comments, onCommentCreated, postId, currentUserId, postedBy, onCommentUpdated }) {
    const [commentDeletionModalVisible, setCommentDeletionModalVisible] = React.useState(false)

    const [selectedCommentForModification, setSelectedCommentForModification] = React.useState({})
    const [commentModificationModalVisibility, setCommentModificationModalVisibility] = React.useState(false)
    return (
        <div className="postCommentsRoot">
            <CommentDeletionView handleCommentDeletion={() => {
                onCommentUpdated()
            }} open={commentDeletionModalVisible} handleClose={() => {
                setCommentDeletionModalVisible(false);
            }} Id={selectedCommentForModification} />

            <SharedModal open={commentModificationModalVisibility} handleClose={() => {
                setCommentModificationModalVisibility(false)
            }} children={<Box sx={modalStyle}>
                <h2 style={{
                    color: 'white',
                    fontWeight: 100
                }}> Update comment</h2>
                {selectedCommentForModification.commentId !== null && <>
                    <input type="text" name="" placeholder='Comment' value={(selectedCommentForModification.commentBody)}
                        onChange={(e) => {
                            let newComment = JSON.parse(JSON.stringify(selectedCommentForModification))
                            newComment.commentBody = e.target.value;
                            setSelectedCommentForModification(newComment)
                        }}
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '10px',
                            border: 'none',
                            margin: '10px 0'
                        }} />
                    <div className="flex" style={{
                        justifyContent: 'space-between',

                    }}>
                        <Button variant="contained" onClick={() => {
                            PostInteractionService.updateComment(selectedCommentForModification.commentId, selectedCommentForModification.commentBody)
                                .then(() => {
                                    onCommentUpdated()
                                    setCommentModificationModalVisibility(false)
                                })
                        }} color='success'>Yes</Button>
                        <Button variant="contained" onClick={() => {
                            setCommentModificationModalVisibility();
                        }} color='error'>No</Button>

                    </div>
                </>}
            </Box>} />

            <p style={{
                fontSize: "20px",
                color: "white",
                fontWeight: "100"
            }}>Comments</p>
            {comments.map((comment, index) => {
                return <PostCommentItem

                    onSelectedForModification={() => {
                        setSelectedCommentForModification(JSON.parse(JSON.stringify(comment)))
                        setCommentModificationModalVisibility(true)

                    }}

                    onSelectForDeletion={() => {
                        setSelectedCommentForModification(comment.commentId)
                        setCommentDeletionModalVisible(true)
                    }} postId={postId} postedBy={postedBy} currentUserId={currentUserId} key={index} comment={comment} />
            })} <CreateComment onCommentCreated={(comentBody) => {
                onCommentCreated(comentBody)
            }} />
        </div>
    );
}

function PostCommentItem({ comment, onSelectedForModification, onSelectForDeletion, currentUserId, postedBy }) {
    return (
        <div className="commentRoot">
            <div className="commenterImgContainer" style={{ width: "50px" }}>
                <img src={Globals.SERVER_URL + comment.commenterProfileImage} alt="" style={{ width: "100%" }} className="commenterImg" />
            </div>
            <div className="commentsContainer" style={{ width: '100%' }}>
                <Link style={{ textDecoration: 'none' }} to={"/profile/" + comment.commenterId}>
                    <p className="commenterName">{comment.commenterName}</p>
                </Link>

                <p className="commentBody">
                    {comment.commentBody}
                </p>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <p className="commentTime">{new Date(comment.time).toLocaleString()}</p>
                    {(postedBy * 1 === currentUserId * 1 || comment.commenterId * 1 === currentUserId * 1) && <div onClick={() => {
                        onSelectForDeletion()
                    }} className='commentAction'>
                        Delete
                    </div>}
                    {comment.commenterId * 1 === currentUserId * 1 && <div onClick={() => {
                        onSelectedForModification()
                    }} className='commentAction'>
                        Update
                    </div>}
                </div>


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