import Globals from "./Globals";
import UploadManager from "./UploadManager";
export default class PostService {

    static async createPostObject(postedBy, postBody) {
        let body = {
            postedBy,
            postBody
        };
        return await fetch(Globals.SERVER_IP + '/post/createPost', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': "application/json",
                'token': localStorage.getItem('token')

            }
        }).then(res => res.json())

    }
    static async createPost(postedBy, postBody, imageURIs) {
        console.log(imageURIs)
        let { newPost } = await PostService.createPostObject(postedBy, postBody)
        console.log(newPost)
        let uploadedURLs = []
        let promises = []
        for (let n = 0; n < imageURIs.length; n++) {
            promises.push(UploadManager.uploadImage(imageURIs[n], {
                postedby: postedBy,
                postid: newPost.Id,
                index: n,
                token: localStorage.getItem('token')
            }, 'file', '/post/uploadPostImage').then(({ url }) => {
                console.log(url);
                uploadedURLs.push(url)
            }))
        }
        Promise.all(promises).then(() => {
            PostService.setPostImageURLs(newPost.Id, JSON.stringify(uploadedURLs))
        })
        console.log(uploadedURLs)
    }
    static async setPostImageURLs(Id, attached_media) {
        console.log(attached_media)
        return fetch(Globals.SERVER_IP + '/post/setPostImageURLs', {
            method: 'POST',
            body: JSON.stringify({
                Id, attached_media
            }),
            headers: {
                'Content-Type': "application/json",
                'token': localStorage.getItem('token')

            }
        })
    }
}