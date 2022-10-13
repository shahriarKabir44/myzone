import React from 'react';
import ConversationService from './ConversationService';
import Globals from './Globals'
import SocketSubscriptionManager from './SocketSubscriptionManager'

export default function useChat(conversationId, sender, messageList, component = 'mainMessenger') {
    const [messages, setMessagesList] = React.useState(messageList);
    const socketRef = React.useRef()

    const [participantId, setParticipantId] = React.useState(-1)
    React.useEffect(() => {
        try {
            socketRef.current = Globals.socket
        } catch (error) {
            console.log(error)
        }

    }, [])
    function setMessages(data) {
        setMessagesList(data)
        localStorage.setItem('messages', JSON.stringify(data))
    }
    function getMessages() {
        return JSON.parse(localStorage.getItem('messages'))
    }
    function subscribe() {
        SocketSubscriptionManager.subscribe({
            component,
            onMessage: (data) => {
                if (data.type === 'personalMessage') {
                    //setMessages(messages)
                    let newList = JSON.parse(JSON.stringify(getMessages()))
                    newList.push(data.body.newMessage)
                    //console.log(getMessages(), newList)
                    setMessages(newList)
                }
            }
        })
    }
    function unsubscribe() {
        localStorage.removeItem('messages')
        SocketSubscriptionManager.unsubscribe(component)
    }

    function sendMessage(body) {
        let time = (new Date()) * 1
        let newMessage = {
            conversationId, sender, time, body
        }
        window.scrollBy(0, 100);
        ConversationService.createMessage({ ...newMessage, receiver: participantId })
        setMessages([...messages, newMessage])
        let message = {
            type: 'personalMessage',
            body: { newMessage, participantId, receiverId: participantId }
        }
        socketRef.current.send(JSON.stringify(message))
    }
    return { messages, sendMessage, setMessages, setParticipantId, unsubscribe, subscribe }
}