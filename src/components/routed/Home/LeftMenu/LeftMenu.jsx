import React from 'react';
import GroupIcon from '@mui/icons-material/Group';
import './LeftMenu.css'
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector } from 'react-redux';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { Link } from 'react-router-dom';
import ManageInterestsModal from '../../../shared/ManageInterestsModal/ManageInterestsModal';
import Globals from '../../../../services/Globals';
import LogoutEventManager from '../../../../services/LogOutEventManager';
function LeftMenu(props) {
    const currentUser = useSelector((state) => state.currentUser.value)
    const [manageInterestModalVisibility, setManageInterestModalVisibility] = React.useState(false)
    React.useEffect(() => {
    }, [])
    return (
        <div className="leftMenuRoot" style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            padding: 0
        }}>
            <div>
                <ManageInterestsModal modalVisibility={manageInterestModalVisibility} closeModal={() => {
                    setManageInterestModalVisibility(false)
                }} onComplete={() => { }} />
                <Link style={{ textDecoration: 'none' }} to={"/profile/" + currentUser.Id}>
                    <div className="leftMenuItem">
                        <div className="userImageContainer">
                            <img src={Globals.SERVER_URL + currentUser.profileImage} alt="" className="userImage" />

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

                <Link to={'/findFriends'} style={{ textDecoration: 'none' }}>
                    <div className="leftMenuItem">
                        <GroupAddIcon style={{
                            fontSize: "40px"
                        }} className="leftMenuIcon"></GroupAddIcon>
                        <p className="leftMenuText">Find friends</p>
                    </div></Link>
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
            </div>
            <div className="leftMenuItem" style={{
                cursor: 'pointer'
            }} onClick={() => {
                localStorage.clear()
                Globals.socket.close()
                LogoutEventManager.onLogout()
            }}>
                <LogoutIcon style={{
                    fontSize: "40px"
                }} />
                <p>Log out</p>
            </div>
        </div >
    );
}

export default LeftMenu;