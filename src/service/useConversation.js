import React from 'react';
import Globals from './Globals'
import SocketSubscriptionManager from './SocketSubscriptionManager'
export default function useConversation(component = "messagesRoot") {
    const [conversationList, setConversationList] = React.useState([])
    const socketRef = React.useRef()
    React.useEffect(() => {
        socketRef.current = Globals.socket

    })
    function subscribe() {
        SocketSubscriptionManager.subscribe({
            component,
            onMessage: (data) => {
                console.log(data.type == 'personalMessage')
                if (data.type == 'personalMessage')
                    handleOnMessage(data.body.newMessage)
            }
        })
    }
    function unsubscribe() {
        SocketSubscriptionManager.unsubscribe(component)
    }
    function handleOnMessage(newMessage) {
        let tempList = conversationList.filter(conversation => conversation.Id === 1 * newMessage.conversationId)
        if (tempList.length) {

            let newData = tempList[0]
            newData.last_message = newMessage.body
            newData.time = newMessage.time
            let newList = [newData, ...conversationList.filter(conversation => conversation.Id !== 1 * newMessage.conversationId)]
            console.log(newList)
            setConversationList(newList)
        }
        else {
            setConversationList([newMessage, ...conversationList])
        }
    }
    return { conversationList, setConversationList, handleOnMessage, subscribe, unsubscribe }

}