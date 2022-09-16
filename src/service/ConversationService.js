import Globals from "./Globals";
export default class ConversationService {
    static async createConversation(participant1, participant2) {
        return fetch(Globals.SERVER_IP + '/conversation/createConversation', {
            method: 'POST',
            body: JSON.stringify({
                participant1, participant2
            }),
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        }).then(res => res.json())
    }
    static async getConversationMessages(conversationId, pageNumber = 0) {
        return fetch(Globals.SERVER_IP + '/conversation/getConversationMessages/', {
            method: 'POST',
            body: JSON.stringify({
                conversationId, pageNumber
            }),
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        }).then(res => res.json())
    }
    static async getParticipantInfo(conversationId, currentUserId) {
        return fetch(Globals.SERVER_IP + '/conversation/getParticipantInfo', {
            method: 'POST',
            body: JSON.stringify({
                conversationId, currentUserId
            }),
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        }).then(res => res.json())
    }
    static async createMessage(message) {
        return fetch(Globals.SERVER_IP + '/conversation/createMessage', {
            method: 'POST',
            body: JSON.stringify(message),
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        }).then(res => res.json())
    }
}