export default class LogoutEventManager {
    static client = null
    static subscribe(client) {
        this.client = client
    }
    static onLogout() {
        this.client.handleLogout()
    }
}