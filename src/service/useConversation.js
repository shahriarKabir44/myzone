import React from 'react';
import Globals from './Globals'
import UserService from './UserServices'
import SocketSubscriptionManager from './SocketSubscriptionManager'
export default function useConversation(component = "messagesRoot", fetchConversations = 0) {
    const [conversations, setConversationList] = React.useState([])
    const socketRef = React.useRef()

    React.useEffect(() => {
        socketRef.current = Globals.socket

    })
    function subscribe() {
        SocketSubscriptionManager.subscribe({
            component,
            onMessage: (data) => {
                if (data.type == 'personalMessage')
                    handleOnMessage(data.body.newMessage)
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
        }
        else {
            UserService.getUserInfo(newMessage.sender)
                .then(userInfo => {
                    newMessage.last_message = newMessage.body
                    newMessage.participantInfo = userInfo
                    setConversationList([newMessage, ...conversations])
                })
        }
    }
    return { conversations, setConversationList, handleOnMessage, subscribe, unsubscribe }

}