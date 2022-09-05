import React from 'react';
import './LoginRegistration.css'
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import Button from '@mui/material/Button'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
const defaultImageURL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXUeyw_tNSf_cm7tM_q8uWbkcr0deNJhyItxp3ZSk&s"
function LoginRegistration(props) {
    const [formMode, setFormMode] = React.useState(0)
    const [selectedImage, setSelectedImage] = React.useState(defaultImageURL)
    const fileInputRef = React.useRef(null)
    function handleFileChange(event) {
        console.log('here')
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
            return;
        }
        console.log(URL.createObjectURL(fileObj))
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
                        <input className='inputContainerForm' type="email" name="" placeholder='email' autoComplete='off' id="" />
                    </div>
                    <div className="formElement">
                        <LockIcon className='formIcon' />
                        <input className='inputContainerForm' type="password" name="" placeholder='Password' autoComplete='off' id="" />
                    </div>
                    <div className="formElement">
                        <PersonIcon className='formIcon' />
                        <input className='inputContainerForm' type="text" name="" placeholder='Your name' autoComplete='off' id="" />
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
                    <Button variant="contained">Sign up</Button>
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