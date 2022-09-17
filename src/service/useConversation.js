import React from 'react';
import Globals from './Globals'
import SocketSubscriptionManager from './SocketSubscriptionManager'
export default function useConversation(component = "messagesRoot") {
    const [conversationList, setConversationList] = React.useState([])
    const socketRef = React.useRef()
    React.useEffect(() => {
        socketRef.current = Globals.socket
        Globals.socket.onmessage = ({ data }) => {
            // SocketSubscriptionManager.sendMessages(data)
            data = (JSON.parse(data))
            console.log('hereeee', data)
            if (data.type !== 'personalMessage') return
            let { body } = data
            let { newMessage } = body
            handleOnMessage(newMessage)
        }
    })
    // SocketSubscriptionManager.subsciptions.push((e) => {
    //     console.log(e)
    // })
    function handleOnMessage(newMessage) {
        let tempList = conversationList.filter(conversation => conversation.Id === 1 * newMessage.conversationId)
        if (tempList.length) {

            let newData = tempList[0]
            newData.last_message = newMessage.body
            newData.time = newMessage.time
            let newList = [newData, ...conversationList.filter(conversation => conversation.Id !== 1 * newMessage.conversationId)]
            setConversationList(newList)
        }
    }
    return { conversationList, setConversationList, handleOnMessage }

}