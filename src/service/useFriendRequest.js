import React from "react";
import Globals from "./Globals";
import SocketSubscriptionManager from "./SocketSubscriptionManager";

export default function useFriendRequest({
    component,
    onFriendRequestReceived }) {

    const socketRef = React.useRef()

    React.useEffect(() => {
        socketRef.current = Globals.socket

    })
    function sendRequest(data, receiverId) {
        let message = {
            type: "friendRequest",
            body: {

                data, receiverId
            }
        }
        socketRef.current.send(JSON.stringify(message))
    }
    function subscribe() {
        SocketSubscriptionManager.subscribe({
            component,
            onMessage: (data) => {
                console.log(data)
                if (data.type == 'friendRequest') {
                    onFriendRequestReceived(data.body.newMessage)
                }

            }
        })
    }
    function unsubscribe() {
        SocketSubscriptionManager.unsubscribe(component)
    }
    return { subscribe, unsubscribe, sendRequest }

}