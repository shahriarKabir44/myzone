import React from 'react';
import './LoginRegistration.css'
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import Button from '@mui/material/Button'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
function LoginRegistration(props) {
    const [formMode, setFormMode] = React.useState(0)
    return (
        <div className='unauthorizedViewContainer'>
            <div className="logoContainer">
                <img src="logo2.png" alt="" className="loginPageLogo" />
            </div>
            <div className="formContainer">
                <div className="formHeader">Login</div>
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
                        <AddPhotoAlternateIcon style={{
                            color: "white",
                            fontSize: "100px"
                        }} className='formIcon' />
                    </div>

                </div>
                {(formMode === 1) && <Button onClick={() => {
                    setFormMode(2)
                }} variant="contained">Sign up</Button>}

                {(formMode === 2 || formMode === 0) && <Button onClick={() => {
                    setFormMode(1)
                }} variant="contained">Log in</Button>}
            </div>
        </div>
    );
}

export default LoginRegistration;