import React from 'react';
import Globals from '../../service/Globals';

function UserInfoContainer({ imgURL, name, additionalInfo }) {
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            gap: "10px"
        }}>
            <img src={Globals.SERVER_IP + imgURL} style={{
                height: "50px",
                width: "50px"
            }} alt="" className="userImg" />
            <div>
                <p style={{
                    color: "white",
                    fontWeight: 200
                }}>{name}</p>
                {additionalInfo}
            </div>
        </div>
    );
}

export default UserInfoContainer;