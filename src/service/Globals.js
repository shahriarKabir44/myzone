
export default class Globals {
    static SERVER_IP_ADDRESS = 'http://192.168.43.90'
    static SERVER_IP = `${this.SERVER_IP_ADDRESS}:4000`
    static socket = null
    static hasSocketInitiated = false
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