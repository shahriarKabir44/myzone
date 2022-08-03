import React from 'react';
import ActiveUser from './ActiveUser/ActiveUser';
import './ActiveUsersList.css'
function ActiveUsersList(props) {
    return (
        <div className='ActiveUsersList'>
            <div className="heading">
                <p className="headingText">Active users</p>
            </div>
            <ActiveUser name="Nabila Farzana Tithy" />
            <ActiveUser name="Farzana Afroz Biva" />
            <ActiveUser name="Noor Mohammad" />
            <ActiveUser name="Samirul Alam" />
            <ActiveUser name="Arnisha Biswas" />
            <ActiveUser name="Tanjila Afrin" />
            <ActiveUser name="Farhana Liya" />
            <ActiveUser name="Fahima Momi" />


        </div>
    );
}

export default ActiveUsersList;