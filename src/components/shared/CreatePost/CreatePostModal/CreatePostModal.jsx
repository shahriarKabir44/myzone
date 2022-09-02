import React from 'react';
import './CreatePostModal.css'
function CreatePostModal(props) {
    return (
        <div className='createPostModalRoot'>

            <div className="createPostModalHeading">
                <h2>Create a post</h2>
            </div>
            <div className="postCreatorContainer"></div>
            <div className="createPostTextContainer"></div>
            <div className="attachedImagesContainer"></div>
            <div className="createPostBtn"></div>
        </div>
    );
}

export default CreatePostModal;