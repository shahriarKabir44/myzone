import React from 'react';
import { Link } from 'react-router-dom';
import './FeaturedPostGroupItem.css'
function FeaturedPostGroupItem({ post }) {
    return (
        <Link to={'/featured/' + post.Id}>
            <div className="featuredPostContainer">
                <div className="featuredImageContainer">
                    <img src={post.initialPhoto} alt="" className="featuredImage" />
                </div>
                <div className="groupLabel">
                    <p className="groupLabelText">{post.label}</p>
                </div>
            </div>
        </Link>
    );
}

export default FeaturedPostGroupItem;