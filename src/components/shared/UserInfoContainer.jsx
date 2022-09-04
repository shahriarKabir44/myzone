import React from 'react';

function UserInfoContainer({ imgURL, name }) {
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            gap: "10px"
        }}>
            <img src={imgURL} style={{
                height: "50px",
                width: "50px"
            }} alt="" className="userImg" />
            <p style={{
                color: "white",
                fontWeight: 200
            }}>{name}</p>
        </div>
    );
}

export default UserInfoContainer;