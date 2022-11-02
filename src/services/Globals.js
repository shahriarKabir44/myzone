export default class Globals {
    static SERVER_IP_ADDRESS = 'http://192.168.43.90'
    static SERVER_URL = `${this.SERVER_IP_ADDRESS}:4000`
    static socket = null
    static hasSocketInitiated = false
    static CLEINT_URL = `${this.SERVER_IP_ADDRESS}:3000`
    static conversationsListClient = null
    static subscribeToSelfMessageEvent(client) {
        this.conversationsListClient = client
    }
    static onSelfMessage(newMessage) {
        newMessage.last_message = newMessage.body
        if (this.conversationsListClient)
            this.conversationsListClient.handleOnMessage(newMessage)
    }
    static onIncomingMessage(newMessage) {
        this.onSelfMessage(newMessage)
    }
    static initSocket(currentUserId) {
        if (Globals.hasSocketInitiated) return

        let socket = new WebSocket('ws://192.168.43.90:4030')
        socket.onopen = (e) => {
            const message = {
                type: 'setWebSocketId',
                body: {
                    userId: currentUserId
                }
            }
            socket.send(JSON.stringify(message))
        }

        Globals.socket = socket
        Globals.hasSocketInitiated = true
    }
    static async _fetch(url, body) {

        return fetch(url, {
            method: body ? 'POST' : 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token'),
            },
            body: body ? JSON.stringify(body) : null
        }).then(res => res.json())
    }

}