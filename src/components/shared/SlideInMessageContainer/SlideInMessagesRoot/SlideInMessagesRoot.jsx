import React from 'react';
import { useSelector } from 'react-redux';
import ConversationListRoot from '../MessagesContainer/ConversationListRoot';
import './SlideInMessagesRoot.css'
import Box from '@mui/material/Box';
import OpenWithIcon from '@mui/icons-material/OpenWith';

import { useDispatch } from 'react-redux';
import { closeConversationListView } from '../../../../redux/ConversatinListToggleManager'
import Modal from '@mui/material/Modal';
const modalStyle = {
    position: 'absolute',
    top: 'var(--navBarHeightLarge);',
    right: '10px',
    width: "30vw",
    height: 'calc(var(--containerHeightLarge) - 50px)',
    bgcolor: '#47494a',
    border: '1px solid',
    boxShadow: 24,
    p: 0,
};
function SlideInMessagesRoot(props) {
    const conversationsTrayToggleDispatcher = useDispatch()

    const toggleStatus = useSelector(state => state.conversationListToggleManager.value.status)
    React.useEffect(() => { }, [toggleStatus])
    return (
        <>

            <Modal
                open={toggleStatus === 1}
                onClose={() => {
                    conversationsTrayToggleDispatcher(closeConversationListView())
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <div className="conversationListHeading">
                        <h3 style={{
                            fontWeight: 200
                        }} className="headingTextSlideMessage">Messages</h3>
                        <div>
                            <OpenWithIcon />
                        </div>
                    </div>
                    {toggleStatus === 1 && <div style={{
                        background: "#47494a",
                        right: 0
                    }} className={`notificationsContainerRoot`}  >
                        <ConversationListRoot />

                    </div>}
                </Box>
            </Modal>



        </>

    );
}

export default SlideInMessagesRoot;