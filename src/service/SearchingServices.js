import Globals from "./Globals";
export default class SearchingServices {
    static basePath = Globals.SERVER_IP + '/search'
    static async findUsers(query, currentUserId, pageNumber = 0) {
        return Globals._fetch(this.basePath + '/users', { query, currentUserId, pageNumber })
    }
}