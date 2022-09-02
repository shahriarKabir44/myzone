import React from 'react';
import MessageContainerRoot from '../MessagesContainer/MessageContainerRoot/MessageContainerRoot';
import './FloatingMessenger.css'
let messagesData = {
    senderInfo: {
        id: 1,
        name: "Rahul Islam",
        profileImageURL: "https://www.hoyletanner.com/wp-content/uploads/2017/08/IMG_8280_1-Square-300x300.jpg"
    },
    messages: [
        {
            sender: 1,
            body: `def shrinking(factor=2):
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
function FloatingMessenger(props) {
    return (
        <div className='floatingMessengerContainer'>
            <div className="messengerHeadingContainer">
                <div className="userInfoContainer">
                    <img src={messagesData.senderInfo.profileImageURL} style={{
                        width: "50px", height: "50px"
                    }} alt="" className="userImage" />
                    <div className="chatHeadTextData">
                        <p style={{
                            margin: 0
                        }} className="otherUserName">{messagesData.senderInfo.name}</p>
                        <p style={{
                            margin: 0
                        }}>Active now🟢</p>
                    </div>
                </div>
            </div>
            <div className="textMessagesContainer">
                <MessageContainerRoot messages={messagesData} />
            </div>
        </div>
    );
}

export default FloatingMessenger;