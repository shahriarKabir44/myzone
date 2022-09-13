import Globals from "./Globals";

export default class PostInteractionService {
    // parameters required: commentBody, commentedBy, postId
    static async postComment(commentObject) {
        return await fetch(Globals.SERVER_IP + '/postInteraction/createComment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commentObject)
        }).then(res => res.json())
    }
    static async react(reactionObject) {
        return await fetch(Globals.SERVER_IP + '/postInteraction/react', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reactionObject)
        }).then(res => res.json())
    }
    static async removeReaction(reactionObject) {
        return await fetch(Globals.SERVER_IP + '/postInteraction/removeReactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reactionObject)
        }).then(res => res.json())
    }
    static async hasReacted(reactionObject) {
        return await fetch(Globals.SERVER_IP + '/postInteraction/hasReacted', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reactionObject)
        }).then(res => res.json())
    }
}