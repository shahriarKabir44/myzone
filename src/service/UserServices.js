import Globals from "./Globals";
import UploadManager from "./UploadManager";

export default class UserService {
    static async registerUser(userInfo) {
        console.log(userInfo)
        return await fetch(Globals.SERVER_IP + '/user/register', {
            method: 'POST',
            body: JSON.stringify(userInfo),
            headers: {
                'Content-Type': "application/json"
            }
        }).then(res => res.json())
    }
    static async registerThenUploadImage(userInfo, profileImgeURL) {
        let { data } = await UserService.registerUser(userInfo)
        let id = data
        let createdProfileImageURL = await UploadManager.uploadImage(profileImgeURL, {
            "title": "profile_image",
            "id": id
        }, "file", '/user/setProfileImage')
        UserService.setProfileImage(id, createdProfileImageURL.data)
        return {
            ...userInfo,
            profileImageURL: createdProfileImageURL.data
        }
    }
    static async setProfileImage(id, url) {
        return await fetch(Globals.SERVER_IP + '/user/setProfileImageUrl', {
            method: 'POST',
            body: JSON.stringify({
                Id: id,
                profileImageURL: url
            }),
            headers: {
                'Content-Type': "application/json"
            }
        }).then(res => res.json())

    }
}