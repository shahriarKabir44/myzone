import React from 'react';
import ConversationService from './ConversationService';
import Globals from './Globals'
import SocketSubscriptionManager from './SocketSubscriptionManager'

// import { io } from 'socket.io-client'

export default function useChat(conversationId, sender, messageList, component = 'mainMessenger') {
    const [messages, setMessages] = React.useState(messageList);
    const socketRef = React.useRef()
    const [participantId, setParticipantId] = React.useState(-1)
    React.useEffect(() => {
        try {
            socketRef.current = Globals.socket
        } catch (error) {
            console.log(error)
        }

        socketRef.current.onmessage = ({ data }) => {

            data = (JSON.parse(data))
            SocketSubscriptionManager.sendMessages(data)

            if (data.type === 'personalMessage')
                setMessages([...messages, data.body.newMessage])
        }
    })
    function subscribe() {
        SocketSubscriptionManager.subscriptions.push({
            'component': component,
            onMessage: (e) => {
                console.log(e)
            }
        })
    }
    function unsubscribe() {
        SocketSubscriptionManager.subscriptions = SocketSubscriptionManager.subscriptions.filter(subscription => subscription.component !== component)
    }

    function sendMessage(body) {
        let time = (new Date()) * 1
        let newMessage = {
            conversationId, sender, time, body
        }
        window.scrollBy(0, 100);
        ConversationService.createMessage(newMessage)
        setMessages([...messages, newMessage])
        let message = {
            type: 'personalMessage',
            body: { newMessage, participantId }
        }
        socketRef.current.send(JSON.stringify(message))
    }
    return { messages, sendMessage, setMessages, setParticipantId, unsubscribe, subscribe }
}