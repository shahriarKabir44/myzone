import React from 'react'
import './FloatingMenu.css'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { closeLeftMenu } from '../../../redux/HomeMenuSelector'
import LogoutIcon from '@mui/icons-material/Logout';
import Globals from '../../../service/Globals';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

import LogoutEventManager from '../../../service/LogOutEventManager';
import { useDispatch, useSelector } from 'react-redux';
export default function FloatingMenu() {
    const leftMenuStatus = useSelector(state => state.currentlySelectedView.value.toggleStatus)
    const leftMenuToggleDispatcher = useDispatch()
    const modalStyle = {
        position: 'absolute',
        top: 'var(--navBarHeightLarge);',
        right: '10px',
        width: "30vw",
        bgcolor: '#47494a',
        border: '1px solid',
        boxShadow: 24,
        p: 0,
        borderRadius: '10px'
    };
    return (
        <div>
            <Modal
                open={leftMenuStatus === 1}
                onClose={() => {
                    leftMenuToggleDispatcher(closeLeftMenu())
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <div className="conversationListHeading">
                        <h3 style={{
                            fontWeight: 200
                        }} className="headingTextSlideMessage">Menu</h3>

                    </div>
                    <div style={{
                        background: "#47494a",
                        right: 0
                    }} className={`notificationsContainerRoot`}  >
                        <div className="leftMenuItem">
                            <GroupAddIcon style={{
                                fontSize: "40px"
                            }} className="leftMenuIcon"></GroupAddIcon>
                            <p className="leftMenuText">Find friends</p>
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


                    </div>
                </Box>
            </Modal>
        </div>
    )
}

