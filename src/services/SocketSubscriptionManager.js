export default class SocketSubscriptionManager {
    static subscriptions = []
    static sendMessages(e) {
        SocketSubscriptionManager.subscriptions.forEach((sub) => {
            let message = JSON.stringify(e)
            sub.onMessage(JSON.parse(message))
        })
    }
    static subscribe(sub) {
        SocketSubscriptionManager.unsubscribe(sub.component)
        SocketSubscriptionManager.subscriptions.push(sub)
    }
    static unsubscribe(sub) {
        SocketSubscriptionManager.subscriptions = SocketSubscriptionManager.subscriptions.filter(subscription => subscription.component !== sub)
    }
} 