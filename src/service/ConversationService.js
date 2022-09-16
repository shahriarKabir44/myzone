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
}