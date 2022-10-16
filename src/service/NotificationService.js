import Globals from './Globals'

export default class NotidicationService {
    static async createNotification({ senderId, receiverId, body, relatedSchemaId, type }) {
        const time = (new Date()) * 1
        return await fetch(Globals.SERVER_URL + '/notification/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                senderId, receiverId, body, relatedSchemaId, time, type
            })
        }).then(res => res.json())
            .then(data => {
                Globals.socket.send(JSON.stringify({
                    type: 'notification',
                    body: { senderId, receiverId, body, relatedSchemaId, time, Id: data.Id, type }
                }))
            })
    }
    static async getNotifications(receiverId, pageNumber = 0) {
        const { data } = await fetch(Globals.SERVER_URL + '/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                query: `query{
                    getNotifications(receiverId:${receiverId},pageNumber:${pageNumber},groupType:0){
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
        }).then(res => res.json())
        return data.getNotifications
    }
}

/**
 * type 1: like
 * type 2: comment
 * type 3: sent friend request
 * type 4: accept friend request
 */