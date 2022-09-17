export default class SocketSubscriptionManager {
    static subscriptions = []
    static sendMessages(e) {
        SocketSubscriptionManager.subscriptions.forEach((sub) => {
            sub.onMessage(e)
        })
    }
} 