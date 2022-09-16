import React from 'react';
import Globals from './Globals'
import { io } from 'socket.io-client'

export default function useChat(conversationId, sender, messageList) {
    const [messages, setMessages] = React.useState(messageList);
    const socketRef = React.useRef()
    React.useEffect(() => {
        try {
            socketRef.current = io(Globals.SERVER_IP)
        } catch (error) {
            console.log(error)
        }

        socketRef.current.on("messageReceived", (newMessage) => {
            setMessages([...messages, newMessage])
        })
    })
    function sendMessage(body) {
        console.log(body)
        let time = (new Date()) * 1
        let newMessage = {
            conversationId, sender, time, body
        }
        setMessages([...messages, newMessage])
        socketRef.current.emit('newPersonalMessage', newMessage)
    }
    return { messages, sendMessage, setMessages }
}