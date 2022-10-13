import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useSelector } from 'react-redux'
import './PhotoFeaturingModal.css'
import Button from '@mui/material/Button';
import FeaturingService from '../../../../../service/FeaturingService';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function PhotoFeaturingModal(props) {
    const [featuringConfirmationVisibility, setFeaturingConfirmationVisibility] = React.useState(false)

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
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={modalStyle}>
                    {props.open && <AlbumSelector {...props} setFeaturingConfirmationVisibility={setFeaturingConfirmationVisibility} />}
                </Box>
            </Modal>

            <Snackbar
                open={featuringConfirmationVisibility}
                autoHideDuration={4000}
                onClose={() => {
                    setFeaturingConfirmationVisibility(false)
                }}
                message="Photo featured successfully"
                action={<IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={() => {
                        setFeaturingConfirmationVisibility(false)
                    }}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>}
            />
        </div>
    )
}

function AlbumSelector(props) {
    const currentUser = useSelector(state => state.currentUser.value)
    const [newAlbumInputVisibility, setNewAlbumInputVisibility] = React.useState(false)
    const [albumList, setAlbumList] = React.useState([{
        Id: 0, label: "s", numPhotos: 0
    }])
    const [newAlbumName, setNewAlbumName] = React.useState('')
    const [selectedAlbumId, setSelectedAlbumId] = React.useState(-1)
    React.useEffect(() => {
        FeaturingService.getFeaturedAlbums(currentUser.Id, props.selectedImgURL)
            .then(({ featuredAlbums }) => {

                setAlbumList(featuredAlbums)
            })
    }, [])
    return (<div>
        {!newAlbumInputVisibility && <div className='albumSelectorForm'>
            <label htmlFor="albumSelector"> <h3 style={{
                fontWeight: '100'
            }}>Select an album</h3></label>
            <select className='albumSelector' value={selectedAlbumId} onChange={(e) => {
                setSelectedAlbumId(e.target.value)
            }} name="albumSelector" id="">
                <option value="-1">Select an album</option>
                {albumList.map((album, index) => {
                    return <option key={index} value={album.Id}>
                        {album.label} - {album.numPosts} photo(s)
                    </option>
                })}
            </select>
        </div>}
        {!newAlbumInputVisibility && <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '10px'
        }}>

            <Button onClick={() => {
                FeaturingService.addPhotoToFeaturedAlbum(selectedAlbumId, props.selectedImgURL)
                    .then(() => {
                        props.setFeaturingConfirmationVisibility(true)

                        props.handleClose()
                    })
            }} variant='contained' color='success'>Done</Button>
            <Button onClick={() => {
                setNewAlbumInputVisibility(true)
            }} variant='contained'>Create new</Button>
        </div>}
        {newAlbumInputVisibility && <div>
            <h3 style={{
                fontWeight: '100'
            }}>Set the new album name</h3>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                margin: '10px'
            }}>

                <Button onClick={() => {
                    setNewAlbumInputVisibility(false)
                }} variant='contained' color='error'>cancel</Button>
                <input value={newAlbumName} onChange={(e) => {
                    setNewAlbumName(e.target.value)
                }} type="text" placeholder='new album name' autoComplete='off' />
                <Button variant='contained' onClick={() => {
                    FeaturingService.createFeaturedAlbum(newAlbumName, currentUser.Id)
                        .then(({ featuredAlbum }) => {
                            if (!featuredAlbum) alert("Name already taken!")
                            else {
                                FeaturingService.addPhotoToFeaturedAlbum(featuredAlbum.Id, props.selectedImgURL)
                                    .then(() => {
                                        props.setFeaturingConfirmationVisibility(true)
                                        props.handleClose()
                                    })
                            }
                        })
                }} color='success'>Done</Button>

            </div>
        </div>}

    </div>)
}

export default PhotoFeaturingModal