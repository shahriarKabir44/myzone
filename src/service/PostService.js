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
        let { newPost } = await PostService.createPostObject(postedBy, postBody)
        let uploadedURLs = []
        let promises = []
        for (let n = 0; n < imageURIs.length; n++) {
            promises.push(UploadManager.uploadImage(imageURIs[n], {
                postedby: postedBy,
                postid: newPost.Id,
                index: n,
                token: localStorage.getItem('token')
            }, 'file', '/post/uploadPostImage').then(({ url }) => {
                uploadedURLs.push(url)
            }))
        }
        Promise.all(promises).then(() => {
            PostService.setPostImageURLs(newPost.Id, JSON.stringify(uploadedURLs))
        })
    }
    static async setPostImageURLs(Id, attached_media) {
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
    static async getPostDetails(Id) {
        let { data } = await fetch(Globals.SERVER_IP + '/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                query: `query{
                    findPostById(Id:${Id}){
                       Id
                      body
                      attached_media
                      posted_on
                      numReactions
                      numComments
                      creatorInfo{
                        Id
                        name
                        profileImage
                        
                      }
                      getFirstComments{
                        commentId
                        commentBody
                        commenterId
                        commenterName
                        time
                        commenterProfileImage
                      }
                    }
                  }`
            }),

        }).then(res => res.json())
        return data.findPostById
    }
}