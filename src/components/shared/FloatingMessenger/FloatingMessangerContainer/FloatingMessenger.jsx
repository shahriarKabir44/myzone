import React from 'react';
import MessageContainerRoot from '../../MessagesContainer/MessageContainerRoot/MessageContainerRoot';
import './FloatingMessenger.css'
import CloseIcon from '@mui/icons-material/Close';
import LaunchIcon from '@mui/icons-material/Launch';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from "react-router-dom";
let messagesData = {
    senderInfo: {
        Id: 1,
        name: "Rahul Islam",
        profileImage: "https://www.hoyletanner.com/wp-content/uploads/2017/08/IMG_8280_1-Square-300x300.jpg"
    },
    messages: [
        {
            sender: 1,
            body: `def shrinking(factor=2):\n
            imgObject=Image.open(imageURL)
            width, height=imgObject.size
            imgAccess=imgObject.load()
             
            newMat=np.zeros((height//factor,width//factor,3),dtype=np.uint8)
            rowNum=0
            for n in range(height):
                if n%factor!=0:
                    continue
                colNum=0
                for k in  range(width):
                    if k%factor!=0:
                        continue
                    [r,g,b]=imgAccess[k,n]
                    try:
        
                        newMat[rowNum,colNum]=(r,g,b)
                    except IndexError:
                        continue
                    colNum+=1
                rowNum+=1
            newImage=Image.fromarray((newMat) )
            print(newImage.size)
            return newImag`,

        },
        {
            sender: 2,
            body: "Good day!"
        },
        {
            sender: 2,
            body: "How are you doing?"
        },
        {
            sender: 1,
            body: "Hello there!",

        },
        {
            sender: 2,
            body: "Good day!"
        },
        {
            sender: 2,
            body: "How are you doing?"
        },
        {
            sender: 1,
            body: "Hello there!",

        },
        {
            sender: 2,
            body: "Good day!"
        },
        {
            sender: 2,
            body: "How are you doing?"
        },
        {
            sender: 1,
            body: "Hello there!",

        },
        {
            sender: 2,
            body: "Good day!"
        },
        {
            sender: 2,
            body: "How are you doing?"
        },
        {
            sender: 1,
            body: "Hello there!",

        },
        {
            sender: 2,
            body: "Good day!"
        },
        {
            sender: 2,
            body: "How are you doing?"
        }
    ]
};
function FloatingMessenger({ selectedChatHead, onClose }) {
    let navigate = useNavigate();

    return (
        <div className='floatingMessengerContainer'>
            <div className="messengerHeadingContainer">
                <div className="userInfoContainer">
                    <img src={selectedChatHead.profileImage} style={{
                        width: "50px", height: "50px"
                    }} alt="" className="userImage" />
                    <div className="chatHeadTextData">
                        <p style={{
                            margin: 0
                        }} className="otherUserName">{selectedChatHead.name}</p>
                        <p style={{
                            margin: 0
                        }}>Active now🟢</p>
                    </div>
                </div>
                <div className="actionBtnContainer">
                    <div onClick={() => {
                        onClose()
                    }}>
                        <CloseIcon />
                    </div>
                    <div onClick={() => {
                        navigate("/messenger/1")
                    }} >
                        <LaunchIcon />
                    </div>

                </div>
            </div>
            <div className="textMessagesContainer">
                <MessageContainerRoot messages={messagesData} />
            </div>
            <div className="messageInputContainer">
                <div className="commentActionsContainer">
                    <input type="text" name="" className='postCommentInput' placeholder='Your message' id="" />

                    <SendIcon style={{
                        padding: "5px",
                        background: "white",
                        borderRadius: "5px"
                    }} />

                </div>
            </div>
        </div>
    );
}

export default FloatingMessenger;