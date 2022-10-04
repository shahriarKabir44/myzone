import Globals from "./Globals";
import UploadManager from "./UploadManager";

export default class UserService {
    static async login(userInfo) {
        return await fetch(Globals.SERVER_IP + '/user/login', {
            method: 'POST',
            body: JSON.stringify(userInfo),
            headers: {
                'Content-Type': "application/json"
            }
        }).then(res => res.json())
    }
    static async registerUser(userInfo) {
        return await fetch(Globals.SERVER_IP + '/user/register', {
            method: 'POST',
            body: JSON.stringify(userInfo),
            headers: {
                'Content-Type': "application/json"
            }
        }).then(res => res.json())
    }
    static async isAuthorized() {
        return fetch(Globals.SERVER_IP + '/user/isAuthorized', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        }).then(res => res.json())
    }
    static async getUserInfo(Id) {
        let { data } = await fetch(Globals.SERVER_IP + '/graphql', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                query: `query{
                    findUserById(Id:${Id}){
                      name
                      profileImage
                    }
                  }`
            })
        }).then(res => res.json())

        return data.findUserById
    }
    static async getUserProfileInfo(Id) {
        console.log(Id)
        let { data } = await fetch(Globals.SERVER_IP + '/graphql', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                query: `query{
                    findUserById(Id:${Id}){
                      name
                      profileImage
                      coverPhoto
                      createdPosts{
                        Id
                        body
                        posted_by
                        posted_on
                        numReactions
                        attached_media
                        numComments
                        creatorInfo{
                            Id
                            name
                            profileImage
                          }
                      }
                    }
                  }`
            })
        }).then(res => res.json())

        return data.findUserById
    }
    static async registerThenUploadImage(userInfo, profileImgeURL) {
        let { Id, token } = await UserService.registerUser(userInfo)
        if (Id == null) return null
        localStorage.setItem('token', token)
        let createdProfileImageURL = await UploadManager.uploadImage(profileImgeURL, {
            "title": "profile_image",
            "Id": Id,

        }, "file", '/user/setProfileImage')
        UserService.setProfileImage(Id, createdProfileImageURL.data)
            .then(({ data, token }) => {
                localStorage.setItem('token', token);
            })
        return {
            ...userInfo,
            Id: Id,
            profileImage: createdProfileImageURL.data
        }
    }
    static async setProfileImage(Id, url) {
        return await fetch(Globals.SERVER_IP + '/user/setProfileImageUrl', {
            method: 'POST',
            body: JSON.stringify({
                Id: Id,
                profileImage: url
            }),
            headers: {
                'Content-Type': "application/json",
                'token': localStorage.getItem('token')
            }
        }).then(res => res.json())

    }
}