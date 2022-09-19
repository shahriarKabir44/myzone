import React from 'react';
import Globals from './Globals'
import UserService from './UserServices'
import SocketSubscriptionManager from './SocketSubscriptionManager'
export default function useConversation(component = "messagesRoot", onMessageReceived = null) {
    const [conversations, setConversationList] = React.useState([])
    const socketRef = React.useRef()

    React.useEffect(() => {
        socketRef.current = Globals.socket

    })
    function subscribe() {
        SocketSubscriptionManager.subscribe({
            component,
            onMessage: (data) => {
                if (data.type == 'personalMessage') {
                    handleOnMessage(data.body.newMessage)
                }

            }
        })
    }
    function unsubscribe() {
        SocketSubscriptionManager.unsubscribe(component)
    }
    function handleOnMessage(newMessage) {
        let tempList = conversations.filter(conversation => conversation.Id === 1 * newMessage.conversationId)
        if (tempList.length) {

            let newData = tempList[0]
            newData.last_message = newMessage.body
            newData.time = newMessage.time
            let newList = [newData, ...conversations.filter(conversation => conversation.Id !== 1 * newMessage.conversationId)]
            setConversationList(newList)
            setTimeout(() => { if (onMessageReceived) onMessageReceived(newData) }, 100)

        }
        else {
            UserService.getUserInfo(newMessage.sender)
                .then(userInfo => {
                    newMessage.last_message = newMessage.body
                    newMessage.participantInfo = userInfo

                    setConversationList([newMessage, ...conversations])
                    setTimeout(() => { if (onMessageReceived) onMessageReceived(newMessage) }, 100)
                })
        }
    }
    return { conversations, setConversationList, handleOnMessage, subscribe, unsubscribe }

}