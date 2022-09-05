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
    static async registerThenUploadImage(userInfo, profileImgeURL) {
        let createdUserInfo = await UserService.registerUser(userInfo)
        let createdProfileImageURL = await UploadManager.uploadImage(profileImgeURL, {
            "title": "profile_image",
            "id": createdUserInfo.id
        }, "proffile_picture")
        return {
            ...createdProfileImageURL,
            profileImageURL: createdProfileImageURL
        }
    }
}