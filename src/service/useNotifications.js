
import SocketSubscriptionManager from './SocketSubscriptionManager'
export default function useNotifications(component, onNotificationReceived) {

    function subscribe() {
        SocketSubscriptionManager.subscribe({
            component,
            onMessage: (data) => {
                if (data.type === 'notification') {
                    onNotificationReceived(data.body)
                }
            }
        })
    }
    function unsubscribe() {
        SocketSubscriptionManager.unsubscribe(component)
    }
    return { subscribe, unsubscribe }
}