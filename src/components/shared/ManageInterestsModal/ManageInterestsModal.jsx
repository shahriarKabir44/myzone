import React from 'react';
import './ManageInterestsModal.css'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { InterestItem } from '../../routed/UserProfile/routeGroups/ProfileHome/InterestList/InterestList'
import InterestManagerService from '../../../service/InterestManagerService';
function ManageInterestsModal(props) {
    React.useEffect(() => { }, [])
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    return (
        <div>
            <Modal
                open={props.modalVisibility}
                onClose={props.closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    {props.modalVisibility && <InterestsManagerRoot {...props} />}
                </Box>
            </Modal>
        </div>
    );
}

function InterestsManagerRoot(props) {
    const currentUser = useSelector(state => state.currentUser.value)
    React.useEffect(() => {
        InterestManagerService.getInterestList(currentUser.Id)
            .then((response) => {
                console.log(response)
            })
        InterestManagerService.getOtherInterests(currentUser.Id)
            .then(otherInterests => {
                console.log(otherInterests)
            })
    }, [])
    return (
        <div className='InterestsManagerRoot'>

        </div>
    )
}

export default ManageInterestsModal;