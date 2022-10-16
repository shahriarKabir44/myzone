import Globals from "./Globals";
export default class ConversationService {
    static basePath = Globals.SERVER_URL + '/conversation'
    static async createConversation(participant1, participant2) {
        return fetch(Globals.SERVER_URL + '/conversation/createConversation', {
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
    static async findById(Id) {
        return Globals._fetch(this.basePath + '/findById', { Id })

    }
    static async getConversationInfo(participant1, participant2) {
        return Globals._fetch(this.basePath + '/getConversationInfo', { participant1, participant2 })
    }
    static async getConversationList(userId, pageNumber = 0) {
        return Globals._fetch(this.basePath + '/getConversationList', {
            userId, pageNumber
        })

    }
    static async getConversationMessages(conversationId, pageNumber = 0) {
        return fetch(Globals.SERVER_URL + '/conversation/getConversationMessages/', {
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
        return fetch(Globals.SERVER_URL + '/conversation/getParticipantInfo', {
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
        return fetch(Globals.SERVER_URL + '/conversation/createMessage', {
            method: 'POST',
            body: JSON.stringify(message),
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        }).then(res => res.json())
    }
}