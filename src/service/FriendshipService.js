import Globals from "./Globals";
export default class FriendshipService {
    static async getAllFriends(userId) {
        return fetch(Globals.SERVER_IP + '/friendship/getFriends/' + userId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        }).then(res => res.json())
    }
}