import React from 'react';
import './PostImageContainer.css'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
function PostImageContainer({ images }) {
    const [currentlyViewingImageIndex, setCurrentlyViewingImageIndex] = React.useState(0)

    return (
        <div className='postImageContainer'>
            <div className="imgContainer">
                <img src={images[currentlyViewingImageIndex]} alt="" className="focusedImg" />
            </div>
            <div className="swipeContainerRoot">
                <div className="swipeContainer">
                    <button className="prev swipeBtn">
                        <ChevronLeftIcon />
                        <p className='swipeText'>Prev</p>
                    </button>
                    <p className="swipeCounter">{currentlyViewingImageIndex + 1} of {images.length}</p>
                    <button className="prev swipeBtn">
                        <p className='swipeText'>Prev</p><ChevronRightIcon />

                    </button>
                </div>
            </div>

        </div>
    );
}

export default PostImageContainer;