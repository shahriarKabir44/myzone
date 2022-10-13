import React from 'react';
import './ManageInterestsModal.css'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { InterestItem } from '../../routed/UserProfile/routeGroups/ProfileHome/InterestList/InterestList'
import InterestManagerService from '../../../service/InterestManagerService';
function ManageInterestsModal({ onComplete, closeModal, modalVisibility }) {
    const [interestConfirmationVisibility, setInterestConfirmationVisibility] = React.useState(false)

    React.useEffect(() => { }, [])
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',

        bgcolor: '#2a2b2c',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    return (
        <div>
            <Snackbar
                open={interestConfirmationVisibility}
                autoHideDuration={4000}
                onClose={() => {
                    setInterestConfirmationVisibility(false)
                }}
                message="Interests updated successfully!"
                action={<IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={() => {
                        setInterestConfirmationVisibility(false)
                    }}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>}
            />
            <Modal
                open={modalVisibility}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box style={{
                    width: "60vw"
                }} sx={modalStyle}>
                    {modalVisibility && <InterestsManagerRoot setInterestConfirmationVisibility={setInterestConfirmationVisibility} closeModal={closeModal} modalVisibility={modalVisibility} onComplete={onComplete} />}
                </Box>
            </Modal>
        </div>
    );
}

function InterestsManagerRoot(props) {
    const currentUser = useSelector(state => state.currentUser.value)
    const [overallList, setOverallList] = React.useState([])
    const [notAddedList, updateNotAddedList] = React.useState([])
    const [query, setQuery] = React.useState('')
    function removeInterest(interestObject) {
        let newOverAllList = overallList.filter(item => item.interest_name !== interestObject.interest_name)


        if (!interestObject.doesExist) {
            setOverallList(newOverAllList)
            return
        }
        newOverAllList = [...newOverAllList, {
            ...interestObject,
            isAdded: false,
            isAltered: true,

        }]
        setOverallList(newOverAllList)
        updateNotAddedList(newOverAllList.filter(item => !item.isAdded));

    }
    function confirmUpdateInterestList() {
        const alteredItems = overallList.filter(item => item.isAltered)
        const newItems = alteredItems.filter(item => !item.doesExist).map(item => item.interest_name)
        const addedItems = alteredItems.filter(item => item.isAdded).map(item => item.interest_name)
        const removedItems = alteredItems.filter(item => !item.isAdded).map(item => item.interest_name)
        InterestManagerService.updateInterestList(newItems, addedItems, removedItems, currentUser.Id)
            .then(() => {
                props.setInterestConfirmationVisibility(true)
                if (props.onComplete) props.onComplete()
                props.closeModal()
            })

    }
    function addInterest(interestObject) {
        let newOverAllList = overallList.filter(item => item.interest_name !== interestObject.interest_name)
        newOverAllList.push({
            ...interestObject,
            isAdded: true,
            isAltered: true,
        })
        setOverallList(newOverAllList)
        updateNotAddedList(newOverAllList.filter(item => !item.isAdded));

    }
    React.useEffect(() => {
        InterestManagerService.getInterestList(currentUser.Id)
            .then(({ interests }) => {
                let tempOverallList = []
                for (let interest of interests) {
                    tempOverallList.push({
                        ...interest,
                        isAdded: true,
                        isAltered: false,
                        doesExist: true
                    })

                }
                return tempOverallList

            })
            .then((tempOverallList) => {
                InterestManagerService.getOtherInterests(currentUser.Id)
                    .then((otherInterests) => {

                        for (let interest of otherInterests) {
                            tempOverallList.push({
                                ...interest,
                                isAdded: false,
                                isAltered: false,
                                doesExist: true
                            })



                        }
                        setOverallList([...tempOverallList])
                        updateNotAddedList(tempOverallList.filter(item => !item.isAdded))

                    })
            })

    }, [])
    function filterSearch(query) {
        setQuery(query)
        updateNotAddedList(overallList.filter(item => !item.isAdded && item.interest_name.startsWith(query)));
    }
    return (
        <div className='InterestsManagerRoot'>

            <div className="flex" style={{
                justifyContent: "space-between"
            }}>
                <Button onClick={() => {
                    props.closeModal()
                }} variant='contained' color='error' >cancel</Button>


                <Button onClick={() => {
                    confirmUpdateInterestList()
                }} variant='contained' color='success' >Done</Button>
            </div>
            <div className="flex" style={{
                alignItems: 'center'
            }}>
                <h1 style={{

                    color: 'white',
                    fontWeight: 100,
                    margin: '10px auto'
                }}>Your interests</h1>
            </div>

            <div className="interestsContainer">
                <div className="existingList flex">
                    {overallList.filter(item => item.isAdded).map((interestName, index) => {
                        return <InterestItem key={index} _onClick={() => {
                            removeInterest(interestName)
                        }}
                            additionalInfo={<DeleteIcon />}
                            interest={(interestName.interest_name)} />
                    })}
                </div>

                <label htmlFor="searchInterest" style={{
                    display: 'flex',
                    alignItems: 'center',
                    alignContent: 'center',
                }}>
                    <h3 style={{
                        margin: '10px auto',
                        color: 'white',
                        fontWeight: 100
                    }}>Search interest names</h3>
                </label>
                <div className="searchInterestContainer">
                    <input type="text" placeholder={'search'}
                        onChange={e => {
                            filterSearch(e.target.value)
                        }}
                        value={query} name="searchInterest" className="searchInterestInput" ></input>
                    <SearchOutlinedIcon className='searchBtn' />
                </div>
                <h3 style={{
                    margin: '10px auto',
                    color: 'white',
                    fontWeight: 100
                }}>Available tags</h3>
                {notAddedList.length > 0 && <div className='flex'>
                    {notAddedList.map((interest, index) => {
                        return <InterestItem key={index} _onClick={() => {
                            addInterest(interest)
                        }}
                            additionalInfo={<AddIcon style={{
                                color: 'white'
                            }} />}
                            interest={interest.interest_name} />
                    })}
                </div>}
                {notAddedList.length === 0 && query.length > 0 && <div>
                    <button className='addNewInterestBtn' variant="outlined" onClick={() => {
                        let newInterest = {
                            interest_name: query,
                            isAdded: true,
                            isAltered: true,
                            doesExist: false
                        }
                        setOverallList([...overallList, newInterest])
                        setQuery("")
                    }}>Add "{query}"?</button>
                </div>}
            </div>
        </div>
    )
}

export default ManageInterestsModal;