import Globals from "./Globals";
import NotidicationService from "./NotificationService";
export default class FriendshipService {
    static basePath = Globals.SERVER_IP + '/friendship'
    static async getAllFriends(userId) {
        return fetch(Globals.SERVER_IP + '/friendship/getFriends/' + userId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        }).then(res => res.json())
    }
    static async getFriendshipType(userId, friendId) {
        return Globals._fetch(this.basePath + '/getFriendshipType', { userId, friendId })
    }
    static async getFriendsipNotification(receiverId, pageNumber = 0) {
        console.log(receiverId)
        let { data } = await Globals._fetch(Globals.SERVER_IP + '/graphql', {
            query: `query{
                    getNotifications(receiverId:${receiverId},pageNumber:${pageNumber},groupType:1){
                      body
                      time
                      type
                      Id
                      relatedSchemaId
                      senderInfo{
                        Id
                        profileImage
                      }
                    }
                  }`
        })

        return data.getNotifications
    }
    static async cancelFriendRequest(userId, friendId) {
        return Globals._fetch(this.basePath + '/cancelFriendRequest', { userId, friendId })
    }
    static async createFriendRequest(currentUser, friendId) {
        return Promise.all([
            Globals._fetch(this.basePath + '/createFriendRequest',
                {
                    userId: currentUser.Id,
                    friendId
                }),
            NotidicationService.createNotification({
                senderId: currentUser.Id,
                receiverId: friendId,
                relatedSchemaId: currentUser.Id,
                body: `${currentUser.name} has send you a friend request.`,
                type: 3
            }),

        ])
    }
}