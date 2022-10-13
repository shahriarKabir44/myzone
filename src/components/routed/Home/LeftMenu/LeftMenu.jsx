import React from 'react';
import GroupIcon from '@mui/icons-material/Group';
import './LeftMenu.css'
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import ThreePIcon from '@mui/icons-material/ThreeP';
import { useSelector } from 'react-redux';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { Link } from 'react-router-dom';
import ManageInterestsModal from '../../../shared/ManageInterestsModal/ManageInterestsModal';
import Globals from '../../../../service/Globals';

function LeftMenu(props) {
    const currentUser = useSelector((state) => state.currentUser.value)
    const [manageInterestModalVisibility, setManageInterestModalVisibility] = React.useState(false)
    const [isOnMobile, setDeviceType] = React.useState(false)
    React.useEffect(() => {
        setDeviceType(window.innerWidth <= 620)
    }, [])
    return (
        <div className="leftMenuRoot">
            <ManageInterestsModal modalVisibility={manageInterestModalVisibility} closeModal={() => {
                setManageInterestModalVisibility(false)
            }} onComplete={() => { }} />
            <Link style={{ textDecoration: 'none' }} to={"/profile/" + currentUser.Id}>
                <div className="leftMenuItem">
                    <div className="userImageContainer">
                        <img src={Globals.SERVER_IP + currentUser.profileImage} alt="" className="userImage" />

                    </div>
                    <p className="leftMenuText">{currentUser.name}</p>
                </div>
            </Link>
            <Link style={{ textDecoration: 'none' }} to={"/profile/" + currentUser.Id + "/friends"}>
                <div className="leftMenuItem">
                    <GroupIcon style={{
                        fontSize: "40px"
                    }} className="leftMenuIcon" />
                    <p className="leftMenuText">Friends list</p>
                </div>
            </Link>

            <div className="leftMenuItem">
                <GroupAddIcon style={{
                    fontSize: "40px"
                }} className="leftMenuIcon"></GroupAddIcon>
                <p className="leftMenuText">Find friends</p>
            </div>
            <div className="leftMenuItem" onClick={() => {
                setManageInterestModalVisibility(true)
            }} style={{
                cursor: 'pointer'
            }}>
                <BuildCircleIcon style={{
                    fontSize: "40px"
                }} className="leftMenuIcon"></BuildCircleIcon>
                <p className="leftMenuText">Manage interests</p>
            </div>
            {
                isOnMobile && <div className="leftMenuItem">
                    <ThreePIcon style={{
                        fontSize: "40px"
                    }} className="leftMenuIcon"></ThreePIcon>
                    <p className="leftMenuText">Active users</p>
                </div>
            }
        </div >
    );
}

export default LeftMenu;