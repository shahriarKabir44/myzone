import Globals from "./Globals";

export default class UploadManager {
    static async getBlobFromURI(imageURI) {
        return await fetch(imageURI).then(data => data.blob());
    }

    static async uploadImage(URI, additionalData, fileName, apiURL) {
        let blob = await UploadManager.getBlobFromURI(URI)

        let formData = new FormData()

        formData.append("file", blob)

        let url = await fetch(Globals.SERVER_URL + apiURL, {
            method: 'POST',
            body: formData,
            headers: {

                ...additionalData
            }
        }).then(res => res.json())
        return url

    }
}