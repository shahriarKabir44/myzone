import React from 'react';
import './FloatingMessengerRoot.css'
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import FloatingMessenger from '../FloatingMessangerContainer/FloatingMessenger';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
let chatHeadList = [
    {
        name: "Rahul Islam",
        profileImageURL: "https://www.ecommercetimes.com/wp-content/uploads/sites/5/2022/02/office-worker.jpg"
        , id: 3
    },
    {
        id: 2,
        name: "Monir Islam",
        profileImageURL: "https://cdn.vox-cdn.com/thumbor/cMoBp9foDH6ZIHLVpfIzI4AAGNM=/0x0:2000x1288/1200x800/filters:focal(840x484:1160x804)/cdn.vox-cdn.com/uploads/chorus_image/image/65855855/566006899.jpg.0.jpg"
    },
    {
        id: 1,
        name: "Tarif Hasan",
        profileImageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfYRAWqd6TQyF2T7q3XretY6PCSDQVBnPhYg&usqp=CAU"
    },
    {
        name: "Rahul Islam",
        profileImageURL: "https://www.ecommercetimes.com/wp-content/uploads/sites/5/2022/02/office-worker.jpg"
        , id: 3
    },
    {
        id: 2,
        name: "Monir Islam",
        profileImageURL: "https://cdn.vox-cdn.com/thumbor/cMoBp9foDH6ZIHLVpfIzI4AAGNM=/0x0:2000x1288/1200x800/filters:focal(840x484:1160x804)/cdn.vox-cdn.com/uploads/chorus_image/image/65855855/566006899.jpg.0.jpg"
    },
    {
        id: 1,
        name: "Tarif Hasan",
        profileImageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfYRAWqd6TQyF2T7q3XretY6PCSDQVBnPhYg&usqp=CAU"
    }
]
function FloatingMessengerRoot(props) {
    const [isChatHeadSelected, setSelectionStatus] = React.useState(false)
    const [selectedChatHead, setSelectedChatHead] = React.useState(null)
    const [isChatHeadListExpanded, setExpansionStatus] = React.useState(false)
    function openFloatingMessenger(chatHead) {
        setSelectionStatus(true)
        setSelectedChatHead(chatHead)
    }
    return (
        <div>
            {!isChatHeadSelected && <div className="chatHeadContainer">
                {isChatHeadListExpanded && <>
                    <div onClick={() => {
                        setExpansionStatus(false)
                    }} style={{
                        margin: 0
                    }}><ExpandCircleDownIcon style={{
                        fontSize: "60px",
                        color: "white",

                    }} />
                    </div>
                    <div className="scrollableChatHeadListContainer">
                        {chatHeadList.map((chatHead, index) => {
                            return <div key={index} onClick={() => {
                                openFloatingMessenger(chatHead)
                            }} className="chatHead">
                                <img src={chatHead.profileImageURL} style={{
                                    height: "50px", width: "50px"
                                }} alt="" className="userImg" />
                            </div>
                        })}
                    </div>

                </>}
                {!isChatHeadListExpanded && <div onClick={() => {
                    setExpansionStatus(true)
                }} style={{
                    margin: 0
                }}>
                    <MapsUgcIcon style={{
                        fontSize: "60px",
                        color: "white",

                    }} />
                </div>}
            </div>}
            {isChatHeadSelected && selectedChatHead !== null && <FloatingMessenger selectedChatHead={selectedChatHead} onClose={() => {
                setSelectedChatHead(null)
                setSelectionStatus(false)
            }} />}
        </div>
    );
}

export default FloatingMessengerRoot;