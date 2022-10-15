import Globals from "./Globals";
import UploadManager from "./UploadManager";
export default class PostService {
    static async editPost({
        newPostBody,
        newImages,
        remainingOriginalImages, imagesToDelete }, postId, postedBy) {
        let imageUploadPromises = []
        let newURLs = []
        for (let newImage of newImages) {
            imageUploadPromises.push(UploadManager.uploadImage(newImage.image, {
                postedby: postedBy,
                postid: postId,
                index: newImage.Id,
                token: localStorage.getItem('token')
            }, 'file', '/post/uploadPostImage').then(({ url }) => {
                console.log(url)
                newURLs.push(url)
            }))
        }
        console.log(imagesToDelete)
        for (let url of imagesToDelete) {
            this.deleteImage(url)
        }
        return await Promise.all(imageUploadPromises)
            .then(() => {
                console.log(remainingOriginalImages)
                PostService.editPostInfo(postId, newPostBody, JSON.stringify([...remainingOriginalImages, ...newURLs]))

            })

    }
    static async deleteImage(imageURL) {
        console.log(imageURL)
        return Globals._fetch(Globals.SERVER_IP + '/post/deleteImage', { imageURL })
    }
    static async editPostInfo(postId, postBody, imageURLs) {
        return Globals._fetch(Globals.SERVER_IP + '/post/edit', { postId, postBody, imageURLs })
    }
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
    static async delete(postId) {
        return Globals._fetch(Globals.SERVER_IP + '/post/delete/' + postId)
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
    static async getNewsFeed(userId, pageNumber = 0) {
        let { data } = await Globals._fetch(Globals.SERVER_IP + '/graphql', {
            query: `query{
                getNewFeed(userId: ${userId}, pageNumber: ${pageNumber}){
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
            }`
        })
        return data.getNewFeed
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