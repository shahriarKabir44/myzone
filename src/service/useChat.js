import React from 'react';
import Globals from './Globals'
// import { io } from 'socket.io-client'

export default function useChat(conversationId, sender, messageList) {
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
            setMessages([...messages, data.newMessage])
        }
    })
    function sendMessage(body) {
        console.log(body)
        let time = (new Date()) * 1
        let newMessage = {
            conversationId, sender, time, body
        }
        setMessages([...messages, newMessage])
        let message = {
            type: 'personalMessage',
            body: { newMessage, participantId }
        }
        socketRef.current.send(JSON.stringify(message))
    }
    return { messages, sendMessage, setMessages, setParticipantId }
}