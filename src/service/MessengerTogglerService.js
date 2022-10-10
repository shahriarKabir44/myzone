export default class MessengerTogglerService {
    static client = null
    static subscribe(client) {
        this.client = client;
    }
    static onCall(conversationId) {
        if (this.client) {
            this.client.onCall(conversationId);
        }
    }
}