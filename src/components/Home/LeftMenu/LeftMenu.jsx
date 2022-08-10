import React from 'react';
import GroupIcon from '@mui/icons-material/Group';
import './LeftMenu.css'
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import ThreePIcon from '@mui/icons-material/ThreeP';

import GroupAddIcon from '@mui/icons-material/GroupAdd';
const stockImage = "https://blog.hubspot.com/hubfs/employee-retention-rate.jpg"

function LeftMenu(props) {
    const [isOnMobile, setDeviceType] = React.useState(false)
    React.useEffect(() => {
        setDeviceType(window.innerWidth <= 620)
    }, [])
    return (
        <div className="leftMenuRoot">
            <div className="leftMenuItem">
                <div className="userImageContainer">
                    <img src={stockImage} alt="" className="userImage" />

                </div>
                <p className="leftMenuText">Shahriar Kabir</p>
            </div>
            <div className="leftMenuItem">
                <GroupIcon style={{
                    fontSize: "40px"
                }} className="leftMenuIcon" />
                <p className="leftMenuText">Friends list</p>
            </div>
            <div className="leftMenuItem">
                <GroupAddIcon style={{
                    fontSize: "40px"
                }} className="leftMenuIcon"></GroupAddIcon>
                <p className="leftMenuText">Find friends</p>
            </div>
            <div className="leftMenuItem">
                <BuildCircleIcon style={{
                    fontSize: "40px"
                }} className="leftMenuIcon"></BuildCircleIcon>
                <p className="leftMenuText">Manage interests</p>
            </div>
            {isOnMobile && <div className="leftMenuItem">
                <ThreePIcon style={{
                    fontSize: "40px"
                }} className="leftMenuIcon"></ThreePIcon>
                <p className="leftMenuText">Active users</p>
            </div>}
        </div>
    );
}

export default LeftMenu;