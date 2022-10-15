export default class EditPostEventHandler {
    static client = null;
    static subscribe(client) {
        this.client = client
    }
    static handlePostEditEvent(postInfo) {
        if (this.client) {
            this.client.handlePostEditEvent(postInfo)
        }
    }
}