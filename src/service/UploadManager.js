import Globals from "./Globals";

export default class UploadManager {
    static async getBlobFromURI(imageURI) {
        return await fetch(imageURI).then(data => data.blob());
    }

    static async uploadImage(URI, additionalData, fileName) {
        let blob = await UploadManager.getBlobFromURI(URI)

        let formData = new FormData()
        formData.append(fileName, blob)
        let url = await fetch(Globals.SERVER_IP + '/user/setProfileImage', {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data; ',
                ...additionalData
            }
        }).then(res => res.json())
        return url

    }
}