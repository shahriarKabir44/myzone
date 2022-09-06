import React from 'react';
import './LoginRegistration.css'
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import Button from '@mui/material/Button'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { updateUserInfo } from '../../../redux/CurrentUserManager'
import { useDispatch } from 'react-redux'
import UserService from '../../../service/UserServices'
const stockImageURL = "https://www.hoyletanner.com/wp-content/uploads/2017/07/img_3416_1-Square-300x300.jpg"
const coverPhotoURL = "https://cdn.vox-cdn.com/thumbor/cMoBp9foDH6ZIHLVpfIzI4AAGNM=/0x0:2000x1288/1200x800/filters:focal(840x484:1160x804)/cdn.vox-cdn.com/uploads/chorus_image/image/65855855/566006899.jpg.0.jpg"

const defaultImageURL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXUeyw_tNSf_cm7tM_q8uWbkcr0deNJhyItxp3ZSk&s"
function LoginRegistration(props) {
    const globalUserDispatcher = useDispatch()
    const [formMode, setFormMode] = React.useState(0)
    const [selectedImage, setSelectedImage] = React.useState(defaultImageURL)
    const fileInputRef = React.useRef(null)
    const [userData, setUserData] = React.useState({
        password: "",
        email: "",
        name: ""
    })
    function handleFileChange(event) {
        console.log('here')
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
            return;
        }

        setSelectedImage(URL.createObjectURL(fileObj))
    }
    return (
        <div className='unauthorizedViewContainer'>
            <div className="logoContainer">
                <img src="logo2.png" alt="" className="loginPageLogo" />
            </div>
            <div className="formContainer">
                <div className="formHeader">{`${(formMode === 2 || formMode === 0) ? "Log in" : "Sign up"}`}</div>
                <div className={`formItemsContainer ${formMode === 1 ? 'slideDown' : formMode === 2 ? 'slideUp' : ''}`}>
                    <div className="formElement">
                        <AlternateEmailIcon className='formIcon' />
                        <input onChange={e => {
                            setUserData({ ...userData, email: e.target.value })
                        }} className='inputContainerForm' type="email" name="" placeholder='Your email' autoComplete='off' id="" />
                    </div>
                    <div className="formElement">
                        <LockIcon className='formIcon' />
                        <input onChange={e => {
                            setUserData({ ...userData, password: e.target.value })
                        }} className='inputContainerForm' type="password" name="" placeholder='Password' autoComplete='off' id="" />
                    </div>
                    <div className="formElement">
                        <PersonIcon className='formIcon' />
                        <input onChange={e => {
                            setUserData({ ...userData, name: e.target.value })
                        }} className='inputContainerForm' type="text" name="" placeholder='Your name' autoComplete='off' id="" />
                    </div>
                    <div className="registrationFormImageUpload">
                        <p style={{
                            color: "white"
                        }}>Set your profile picture</p>
                        <input
                            style={{ display: 'none' }}
                            ref={fileInputRef}
                            type="file"
                            onChange={(handleFileChange)}
                        />

                        <div onClick={() => {
                            fileInputRef.current.click()
                        }}>
                            <AddPhotoAlternateIcon style={{
                                fontSize: "50px",
                                color: "#dddfe4"
                            }} />

                        </div>
                        <img src={selectedImage} style={{
                            height: "150px",
                            width: "150px"
                        }} alt="" className="tempProfileImageContainer" />
                    </div>

                </div>
                {(formMode === 1) && <div className='formActionBtnContainer'>
                    <Button onClick={() => {
                        console.log(userData)
                        UserService.registerThenUploadImage(userData, selectedImage)
                            .then(data => {
                                console.log(data)
                            })
                        globalUserDispatcher(updateUserInfo({
                            id: 1,
                            name: "Shahriar Kabir",
                            profileImageURL: stockImageURL,
                            email: "shahriar@gmail.com",
                            coverPhoto: coverPhotoURL
                        }))
                    }} variant="contained">Sign up</Button>
                    <p>Already have an account?</p>
                    <Button style={{
                        color: "white"
                    }} onClick={() => {
                        setFormMode(2)
                    }} variant="text">Log in</Button>
                </div>}

                {(formMode === 2 || formMode === 0) && <div className='formActionBtnContainer'>
                    <Button variant="contained">Log in</Button>
                    <p>Don't have an account?</p>
                    <Button style={{
                        color: "white"
                    }} onClick={() => {
                        setFormMode(1)
                    }} variant="text">Sign up</Button>
                </div>}
            </div>
        </div>
    );
}

export default LoginRegistration;