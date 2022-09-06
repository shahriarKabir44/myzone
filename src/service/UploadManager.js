import Globals from "./Globals";

export default class UploadManager {
    static async getBlobFromURI(imageURI) {
        return await fetch(imageURI).then(data => data.blob());
    }
    static async blobToBase64(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
    static async uploadImage(URI, additionalData, fileName, apiURL) {
        let blob = await UploadManager.getBlobFromURI(URI)
        let base64str = await UploadManager.blobToBase64(blob)
        let formData = new FormData()

        formData.append("file", base64str)

        let url = await fetch(Globals.SERVER_IP + apiURL, {
            method: 'POST',
            body: formData,
            headers: {

                ...additionalData
            }
        }).then(res => res.json())
        return url

    }
}