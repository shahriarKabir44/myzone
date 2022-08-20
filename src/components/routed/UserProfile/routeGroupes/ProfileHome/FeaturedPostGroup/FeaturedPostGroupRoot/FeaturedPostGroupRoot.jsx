import React from 'react';
import FeaturedPostGroupItem from '../FeaturedPostGroupItem/FeaturedPostGroupItem';
import './FeaturedPostGroupRoot.css'

let featuredList = [
    {
        imageURL: "https://post.healthline.com/wp-content/uploads/2020/08/3180-Pug_green_grass-732x549-thumbnail-732x549.jpg",
        label: "Dog 🐶"
    },
    {
        imageURL: "https://www.goalcast.com/wp-content/uploads/2021/06/Sunset-quotes.jpg",
        label: "Sunset🌇"
    },
    {
        imageURL: "https://www.hubspot.com/hubfs/employee-retention-rate.jpg",
        label: "Work"
    },
    {
        imageURL: "https://images.unsplash.com/photo-1564594736624-def7a10ab047?ixlib=rb-1.2.1&w=1080&fit=max&q=80&fm=jpg&crop=entropy&cs=tinysrgb",
        label: "Paris "
    },
    {
        imageURL: "https://www.brides.com/thmb/umh5TKE4fIOD5bbbmfTHzqqj2lM=/735x0/brides-cover-image-36476d79c52f4b6d8bc9894d859649a6.jpeg",
        label: "Wedding"
    }
]
function FeaturedPostGroupRoot(props) {
    return (
        <div className="featuredPostListContainer">
            <p className="featuredPostHeading">
                Featured
            </p>
            <div className='featuredPostsList' >
                {featuredList.map((item, index) => {
                    return <FeaturedPostGroupItem post={item} key={index} />
                })}
            </div>
        </div>
    );
}

export default FeaturedPostGroupRoot;