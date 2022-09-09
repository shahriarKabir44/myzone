import Globals from "./Globals";
import UploadManager from "./UploadManager";

export default class UserService {
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
    static async registerThenUploadImage(userInfo, profileImgeURL) {
        let { Id, token } = await UserService.registerUser(userInfo)
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