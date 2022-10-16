import React from 'react';
import './PostDeletionModal.css'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import PostService from '../../../service/PostService';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#7a7a7a',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    color: 'white'
};
function PostDeletionModal({ open, handleClose, postId }) {
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h2 style={{
                        color: 'white',
                        fontWeight: 100
                    }}> Are you sure you want to delete the post?</h2>
                    <div className="flex" style={{
                        justifyContent: 'space-between',

                    }}>
                        <Button variant="contained" onClick={() => {
                            PostService.delete(postId)
                                .then(() => {
                                    window.location.href = "/"
                                })
                        }} color='error'>Yes</Button>
                        <Button variant="contained" onClick={() => {
                            handleClose();
                        }} color='success'>No</Button>

                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default PostDeletionModal;