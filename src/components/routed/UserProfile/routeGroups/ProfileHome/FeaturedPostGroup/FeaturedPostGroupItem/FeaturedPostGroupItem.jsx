import React from 'react';
import { Link } from 'react-router-dom';
import Globals from '../../../../../../../service/Globals';
import './FeaturedPostGroupItem.css'
function FeaturedPostGroupItem({ post }) {
    return (
        <Link to={'/featured/' + post.Id} style={{
            textDecoration: "none"
        }}>
            <div className="featuredPostContainer">
                <div className="featuredImageContainer">
                    <img src={Globals.SERVER_URL + post.initialPhoto} alt="" className="featuredImage" />
                </div>
                <div className="groupLabel">
                    <p className="groupLabelText">{post.label}</p>
                </div>
            </div>
        </Link>
    );
}

export default FeaturedPostGroupItem;