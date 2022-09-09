import React from 'react';
import './CreatePostModal.css'
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Modal from '@mui/material/Modal';
import UserInfoContainer from '../../UserInfoContainer'

const style = {
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
function CreatePostModal(props) {
    const [selectedImages, setSelectedImages] = React.useState([])

    React.useEffect(() => {
        setSelectedImages([])
    }, [])
    const fileInputRef = React.useRef(null)
    function handleFileChange(event) {
        console.log('here')
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
                    setSelectedImages([])
                    props.onClose()
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={style}>
                    <h2 className='createPostModalHeader'>
                        Create a post
                    </h2>
                    <div id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="postCreatorContainer">
                            <UserInfoContainer name={currentUser.name} imgURL={currentUser.profileImage} />
                        </div>
                        <div className="createPostTextContainer" style={{
                            margin: "10px"
                        }}>
                            <textarea className='postTextInput' name="" id="" cols="30" rows="10"></textarea>
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
                                    return <AttachedPostImage file={image.image} key={index} />
                                })}
                            </div>

                        </div>
                        <div className="createPostBtn">
                            <Button style={{
                                width: "100%",
                                margin: "10px 0px"
                            }} variant="contained">Done</Button>
                        </div>
                    </div>
                </Box>

            </Modal>

        </div>
    );
}


function AttachedPostImage(props) {

    return (<div className="attachedImageContainer">
        <img src={props.file} alt="" className="attachedImage" />
    </div>)
}

export default CreatePostModal;