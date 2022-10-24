import Globals from "./Globals";
import NotidicationService from "./NotificationService";
export default class FriendshipService {
    static basePath = Globals.SERVER_URL + '/friendship'
    static async getAllFriends(userId) {
        console.log(userId);
        return fetch(Globals.SERVER_URL + '/friendship/getFriends/' + userId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        }).then(res => res.json())
    }
    static async getFriendRequests(userId) {
        return Globals._fetch(this.basePath + '/getFriendRequests/' + userId)

    }
    static async getFriendshipType(userId, friendId) {
        return Globals._fetch(this.basePath + '/getFriendshipType', { userId, friendId })
    }
    static async getMutualFriends(userId) {
        return Globals._fetch(this.basePath + '/getMutualFriends', { userId })
    }
    static async findUsersWithCommonInterests(userId) {
        return Globals._fetch(this.basePath + '/findUsersWithCommonInterests', { userId })
    }
    static async countMutualFriends(friend1, friend2) {
        return Globals._fetch(this.basePath + '/countMutualFriends', {
            friend1,
            friend2
        })
    }
    static async getFriendsipNotification(receiverId, pageNumber = 0) {
        let { data } = await Globals._fetch(Globals.SERVER_URL + '/graphql', {
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
    static async accept(friend1, friend2) {
        return Promise.all([
            Globals._fetch(this.basePath + '/accept', { friend1: friend1.Id, friend2 }),
            NotidicationService.createNotification({
                senderId: friend1.Id,
                receiverId: friend2,
                relatedSchemaId: friend1.Id,
                body: `${friend1.name} has accepted your friend request.`,
                type: 3
            })
        ])
    }
    static async removeFriendshipRecord(friend1, friend2) {
        return Globals._fetch(this.basePath + '/removeFriendshipRecord', { friend1, friend2 })
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
                body: `${currentUser.name} has sent you a friend request.`,
                type: 3
            }),

        ])
    }
    static async getActiveFriends(userId) {
        return Globals._fetch(this.basePath + '/getActiveFriends/' + userId)
    }
}