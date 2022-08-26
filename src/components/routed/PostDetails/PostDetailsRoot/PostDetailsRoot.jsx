import React from 'react';
import PostImageContainer from '../PostImageContainer/PostImageContainer';
import './PostDetailsRoot.css'
let postInfo = {
    postedBy: 1,
    creatorInfo: {
        id: 1,
        name: "Shahriar Kabir",
        profileImageURL: "https://biz30.timedoctor.com/images/2019/08/remote-employee-software.jpg"
    },
    postBody: "Nice \n sunset",
    linkedImages: [
        "https://images.unsplash.com/photo-1503803548695-c2a7b4a5b875?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2VhJTIwc3Vuc2V0fGVufDB8fDB8fA%3D%3D&w=1000&q=80",
        "https://upload.wikimedia.org/wikipedia/commons/5/58/Sunset_2007-1.jpg"
    ],
    time: (new Date()) * 1
};
function PostDetailsRoot(props) {
    return (
        <div className="mainPostDetailsContainer">
            <div></div>
            <div className="postDetailsContainer">
                <div className="postCreatorInfoContainer">
                    <div style={{
                        width: '50px'
                    }} className="userImg">
                        <img src={postInfo.creatorInfo.profileImageURL} alt="" className="creatorImg" />
                    </div>
                    <div className="infoContainer">
                        <p style={{
                            margin: 0
                        }} className="creatorName">{postInfo.creatorInfo.name}</p>
                        <p style={{
                            margin: 0
                        }} className="creationTime"> {new Date(postInfo.time).toLocaleString()} </p>
                    </div>
                </div>
                <div className="postBodyContainer">
                    <p className="postText">{postInfo.postBody}</p>
                </div>
                {postInfo.linkedImages.length > 0 && <PostImageContainer images={postInfo.linkedImages} />}
            </div>
            <div></div>
        </div>

    );
}

export default PostDetailsRoot;