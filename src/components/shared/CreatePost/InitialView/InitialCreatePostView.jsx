import React from 'react';
import './InitialCreatePostView.css'
import { useSelector } from 'react-redux';
function InitialCreatePostView(props) {
    const currentUser = useSelector((state) => state.currentUser.value)
    return (
        <div className='createPostInitialViewRoot'>
            <p className="headingTextCreatePost">Create a post</p>
            <div className="createPostInitContainer">
                <div className="userImgContainer">
                    <img src={currentUser.profileImageURL} alt="" className="userImg" />
                </div>
                <div className="textContainer">
                    <p className="containerText">What's on your mind, {currentUser.name}?</p>
                </div>
            </div>
        </div>
    );
}

export default InitialCreatePostView;