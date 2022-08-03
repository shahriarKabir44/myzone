import React from 'react';
import ActiveUser from './ActiveUser/ActiveUser';
import './ActiveUsersList.css'

let users = [
    {
        name: "rahul",
        img: "https://blog.hubspot.com/hubfs/employee-retention-rate.jpg"
    },
    {
        name: "Noor",
        img: "https://www.ecommercetimes.com/wp-content/uploads/sites/5/2022/02/office-worker.jpg"
    },
    {
        name: "monir",
        img: "https://usveteransmagazine.com/wp-content/uploads/2017/10/Interview-Tips-1.jpg"
    },
    {
        name: "samir",
        img: "https://www-assets.perkbox.com/media/10327/i620/4e203c806075308869b4.jpg"
    }
]
function ActiveUsersList(props) {
    return (
        <div className='ActiveUsersList'>
            <div className="heading">
                <p className="headingText">Active users</p>
            </div>
            {users.map((user, index) => {
                return <ActiveUser key={index} user={user} />
            })}




        </div>
    );
}

export default ActiveUsersList;