import React from 'react';
import FeaturedPostGroupItem from '../FeaturedPostGroupItem/FeaturedPostGroupItem';
import './FeaturedPostGroupRoot.css'


function FeaturedPostGroupRoot({ featuredAlbums }) {
    return (
        <div className="featuredPostListContainer">
            <p className="featuredPostHeading">
                Featured
            </p>
            <div className='featuredPostsList' >
                {featuredAlbums.map((item, index) => {
                    return <FeaturedPostGroupItem post={item} key={index} />
                })}
            </div>
        </div>
    );
}

export default FeaturedPostGroupRoot;