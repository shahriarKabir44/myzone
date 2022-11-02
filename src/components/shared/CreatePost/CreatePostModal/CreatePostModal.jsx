import React from 'react';
import './CreatePostModal.css'
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import UserInfoContainer from '../../UserInfoContainer'
import CancelIcon from '@mui/icons-material/Cancel';
import Snackbar from '@mui/material/Snackbar';
import PostService from '../../../../services/PostService';
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: window.innerWidth > 620 ? 400 : '75vw',
    bgcolor: '#242526',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
function CreatePostModal(props) {
    const [selectedImages, setSelectedImages] = React.useState([])
    const [postBody, setPostBody] = React.useState("")
    const [uploadConfirmationModalVisible, setUploadConfirmationgModalVisible] = React.useState(false)
    const [uploadWaitingModalVisible, setUploadWaitingModalVisible] = React.useState(false)
    React.useEffect(() => {
        setSelectedImages([])
    }, [])
    const fileInputRef = React.useRef(null)
    function handleFileChange(event) {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
            return;
        }
        setSelectedImages([...selectedImages, { Id: selectedImages.length, image: URL.createObjectURL(fileObj) }])
    }
    const currentUser = useSelector((state) => state.currentUser.value)
    return (
        <div className='createPostModalRoot'>
            <Modal keepMounted
                open={props.open}
                onClose={() => {
                    setPostBody('')
                    setSelectedImages([])
                    props.onClose()
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={modalStyle}>
                    <div className="flex" style={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <h2 className='createPostModalHeader'>
                            Create a post
                        </h2>
                        <div onClick={() => {
                            setPostBody('')
                            setSelectedImages([])
                            props.onClose()
                        }}>
                            <CloseIcon style={{
                                color: 'white'
                            }} />
                        </div>
                    </div>

                    <div id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="postCreatorContainer">
                            <UserInfoContainer name={currentUser.name} imgURL={currentUser.profileImage} />
                        </div>
                        <div className="createPostTextContainer" style={{
                            margin: "10px"
                        }}>
                            <textarea value={postBody} onChange={(e) => {
                                setPostBody(e.target.value)
                            }} style={{
                                resize: 'none'
                            }} className='postTextInput' name="" id="" cols="30" rows="5"></textarea>
                        </div>
                        <div className="attachedImagesContainer">
                            <input
                                style={{ display: 'none' }}
                                ref={fileInputRef}
                                type="file"
                                onChange={(handleFileChange)}
                            />

                            <div onClick={() => {
                                fileInputRef.current.click()
                            }}>
                                <AddPhotoAlternateIcon style={{
                                    fontSize: "80px",
                                    color: "#dddfe4"
                                }} />

                            </div>
                            <div className="horizontalImagesContainer">
                                {selectedImages.map((image, index) => {
                                    return <AttachedPostImage file={image.image} key={index} onDelete={() => {
                                        setSelectedImages(selectedImages.filter(img => img.Id !== image.Id))
                                    }} />
                                })}
                            </div>

                        </div>
                        <div className="createPostBtn">
                            <Button onClick={() => {
                                setUploadWaitingModalVisible(true)
                                props.onClose()
                                PostService.createPost(currentUser.Id, postBody, selectedImages.map(img => img.image))
                                    .then(() => {
                                        setUploadConfirmationgModalVisible(true)
                                        setSelectedImages([])
                                    })
                            }} style={{
                                width: "100%",
                                margin: "10px 0px"
                            }} variant="contained">Done</Button>
                        </div>
                    </div>
                </Box>

            </Modal>
            <Snackbar
                open={uploadWaitingModalVisible}
                autoHideDuration={4000}
                onClose={() => {
                    setUploadWaitingModalVisible(false)
                }}
                message="Creating post.."
                action={<IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={() => {
                        setUploadWaitingModalVisible(false)
                    }}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>}
            />
            <Snackbar
                open={uploadConfirmationModalVisible}
                autoHideDuration={4000}
                onClose={() => {
                    setUploadConfirmationgModalVisible(false)
                }}
                message="Post created successfully"
                action={<IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={() => {
                        setUploadConfirmationgModalVisible(false)
                    }}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>}
            />
        </div>
    );
}


function AttachedPostImage(props) {

    return (<div className="attachedImageContainer">
        <div className="closeBtn" onClick={props.onDelete}>
            <CancelIcon />
        </div>
        <img src={props.file} alt="" className="attachedImage" />
    </div>)
}

export default CreatePostModal;