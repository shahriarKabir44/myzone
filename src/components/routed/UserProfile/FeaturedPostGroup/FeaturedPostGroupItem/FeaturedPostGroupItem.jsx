import React from 'react';
import './FeaturedPostGroupItem.css'
function FeaturedPostGroupItem({ post }) {
    return (
        <div>
            <div className="featuredPostContainer">
                <div className="featuredImageContainer">
                    <img src={post.imageURL} alt="" className="featuredImage" />
                </div>
                <div className="groupLabel">
                    <p className="groupLabelText">{post.label}</p>
                </div>
            </div>
        </div>
    );
}

export default FeaturedPostGroupItem;