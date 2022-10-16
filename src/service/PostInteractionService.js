import Globals from "./Globals";

export default class PostInteractionService {
    static basePath = Globals.SERVER_URL + '/postInteraction'
    // parameters required: commentBody, commentedBy, postId
    static async postComment(commentObject) {
        return await fetch(Globals.SERVER_URL + '/postInteraction/createComment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commentObject)
        }).then(res => res.json())
    }
    static async deleteComment(Id) {
        return Globals._fetch(this.basePath + '/deleteComment/' + Id)
    }
    static async updateComment(Id, commentBody) {
        return Globals._fetch(this.basePath + '/updateComment', { Id, commentBody })
    }
    static async react(reactionObject) {
        return await fetch(Globals.SERVER_URL + '/postInteraction/react', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reactionObject)
        }).then(res => res.json())
    }
    static async removeReaction(reactionObject) {
        return await fetch(Globals.SERVER_URL + '/postInteraction/removeReactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reactionObject)
        }).then(res => res.json())
    }
    static async hasReacted(reactionObject) {
        return await fetch(Globals.SERVER_URL + '/postInteraction/hasReacted', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reactionObject)
        }).then(res => res.json())
    }
    static async getPostComments(Id) {
        return await Globals._fetch(Globals.SERVER_URL + '/postInteraction/getPostComments/' + Id)
    }
}