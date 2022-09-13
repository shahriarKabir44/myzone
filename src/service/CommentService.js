import Globals from "./Globals";

export default class CommentService {
    // parameters required: commentBody, commentedBy, postId
    static async postComment(commentObject) {
        return await fetch(Globals.SERVER_IP + '/comment/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commentObject)
        }).then(res => res.json())
    }
}