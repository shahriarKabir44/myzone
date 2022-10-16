import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import './CreatePostModal.css'
import UserInfoContainer from '../../UserInfoContainer'
import CancelIcon from '@mui/icons-material/Cancel';
import Snackbar from '@mui/material/Snackbar';
import PostService from '../../../../service/PostService';
import EditPostEventHandler from '../../../../service/EditPostEventHandler';
import Globals from '../../../../service/Globals';
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#242526',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
function EditPostModal(props) {
    const [modalVisibility, setModalVisibility] = React.useState(false)
    const [post, setPost] = React.useState({})
    React.useEffect(() => {
        EditPostEventHandler.subscribe({
            handlePostEditEvent: (post) => {
                setPost(post)
                setModalVisibility(true)
            }
        })
    }, [])
    return (
        <div>
            <Modal keepMounted
                open={modalVisibility}
                onClose={() => {

                    setModalVisibility(false)
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={modalStyle}>
                    <h2 className='createPostModalHeader'>
                        Create a post
                    </h2>
                    {modalVisibility && <PostEditingContainer post={post} />}
                </Box>

            </Modal>
            <Snackbar
                open={false}
                autoHideDuration={4000}
                onClose={() => {

                }}
                message="Creating post.."
                action={<IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={() => {

                    }}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>}
            />
        </div>
    );
}

function PostEditingContainer({ post }) {
    const [postBody, setPostBody] = React.useState(post.body)
    const [newImages, setNewImages] = React.useState([])
    const fileInputRef = React.useRef(null)
    function handleFileChange(event) {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
            return;
        }
        const imgId = (URL.createObjectURL(fileObj).split('/')[3])

        setNewImages([...newImages, { Id: imgId, image: URL.createObjectURL(fileObj) }])
    }
    const [initialPosts, setInitialPosts] = React.useState(JSON.parse(post.attached_media).map(item => {
        return {
            image: item,
            isDeleted: false
        }
    }))
    return (
        <div id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="postCreatorContainer">
                <UserInfoContainer name={post.creatorInfo.name} imgURL={post.creatorInfo.profileImage} />
            </div>
            <div className="createPostTextContainer" style={{
                margin: "10px"
            }}>
                <textarea value={postBody} onChange={(e) => {
                    setPostBody(e.target.value)
                }} style={{
                    resize: 'none'
                }} className='postTextInput' name="" id="" cols="30" rows="10"></textarea>
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
                    {initialPosts.map((image, index) => {
                        return <AttachedPostImage file={Globals.SERVER_URL + image.image} undo={() => {
                            let temp = initialPosts
                            for (let post of temp) {
                                if (post.image === image.image) {
                                    post.isDeleted = false
                                }
                            }
                            console.log(temp)
                            setInitialPosts(JSON.parse(JSON.stringify(temp)))
                        }} isDeleted={image.isDeleted} key={index} onDelete={() => {
                            let temp = initialPosts
                            for (let post of temp) {
                                if (post.image === image.image) {
                                    post.isDeleted = true
                                }
                            }
                            setInitialPosts(JSON.parse(JSON.stringify(temp)))
                        }} />
                    })}
                    {newImages.map((image, index) => {
                        return <AttachedPostImage file={image.image} key={index} onDelete={() => {
                            setNewImages(newImages.filter(img => img.Id !== image.Id))
                        }} />
                    })}

                </div>

            </div>
            <div className="createPostBtn">
                <Button onClick={() => {
                    console.log({
                        newPostBody: postBody,
                        newImages: newImages,
                        remainingOriginalImages: initialPosts.filter(img => img.isDeleted === false).map(img => {
                            return img.image
                        })

                    }, initialPosts)
                    PostService.editPost({
                        newPostBody: postBody,
                        newImages: newImages,
                        remainingOriginalImages: initialPosts.filter(img => img.isDeleted === false).map(img => {
                            return img.image
                        }),
                        imagesToDelete: initialPosts.filter(img => img.isDeleted === true).map(img => {
                            return img.image
                        })

                    }, post.Id, post.creatorInfo.Id).then(() => {
                        window.location.reload()
                    })
                }} style={{
                    width: "100%",
                    margin: "10px 0px"
                }} variant="contained">Done</Button>
            </div>
        </div>
    )
}

function AttachedPostImage(props) {

    return (<div className="attachedImageContainer" style={{
        position: 'relative'
    }}>
        <div className="closeBtn" onClick={() => {
            if (!props.isDeleted) props.onDelete()
        }}>
            <CancelIcon />
        </div>
        <img src={props.file} alt="" className="attachedImage" />
        {props.isDeleted && <div onClick={() => {
            props.undo()
        }} style={{
            position: 'absolute',
            height: ' 100%',
            width: '100%',
            top: 0,
            background: 'rgb(0, 0, 0, .6)'
        }}></div>}
    </div>)
}

export default EditPostModal;