import React from 'react';
import Button from '@mui/material/Button';
import './PostImageContainer.css'
import PhotoFeaturingModal from './PhotoFeaturingModal/PhotoFeaturingModal'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Globals from '../../../../service/Globals';
function PostImageContainer({ images, postDetails, currentUser }) {
    const [albumSelectorModalVisibility, setAlbumSelectorModalVisibility] = React.useState(false)
    const [currentlyViewingImageIndex, setCurrentlyViewingImageIndex] = React.useState(0)
    function swipe(direction) {

        setCurrentlyViewingImageIndex((currentlyViewingImageIndex + direction + images.length) % images.length);
    }
    const [selectedImgURL, setSelctedImgURL] = React.useState("")
    React.useEffect(() => { }, [])
    return (
        <div className='postDetailsImageContainer'>
            <div className="postImgContainer">
                <img src={Globals.SERVER_URL + images[currentlyViewingImageIndex]} alt="" className="focusedImg" />
            </div>
            <div className="swipeContainerRoot">
                <div className="swipeContainer">
                    <button onClick={() => {
                        swipe(-1)
                    }} className="prev swipeBtn">
                        <ChevronLeftIcon />
                        <p className='swipeText'>Prev</p>
                    </button>
                    <p className="swipeCounter">{currentlyViewingImageIndex + 1} of {images.length}</p>
                    <button onClick={() => {
                        swipe(1)
                    }} className="prev swipeBtn">
                        <p className='swipeText'>Next</p><ChevronRightIcon />

                    </button>
                </div>

            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '10px'
            }}>
                {currentUser.Id * 1 === postDetails.creatorInfo.Id * 1 && <>
                    <Button onClick={() => {
                        setSelctedImgURL(images[currentlyViewingImageIndex])
                        setAlbumSelectorModalVisibility(true)
                    }} variant="contained">Feature this photo</Button>
                    <PhotoFeaturingModal open={albumSelectorModalVisibility} selectedImgURL={selectedImgURL} handleClose={() => {
                        setAlbumSelectorModalVisibility(false)
                    }} />

                </>}

            </div>
        </div>
    );
}

export default PostImageContainer;