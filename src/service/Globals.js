import socketIOClient from 'socket.io-client'

export default class Globals {
    static SERVER_IP = "http://localhost:4000"
    static socket = socketIOClient(Globals.SERVER_IP)

}