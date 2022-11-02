import ConversationService from "./ConversationService";

export default class MessengerTogglerService {
    static client = null
    static subscribe(client) {
        this.client = client;
    }
    static async findConversationAndCall(conversationId) {
        ConversationService.findById(conversationId).then(({ conversation }) => {
            if (this.client) {
                this.client.onCall(conversation)
            }
        })
    }
    static onCall(participant1, participant2) {
        if (this.client) {
            ConversationService.getConversationInfo(participant1, participant2)
                .then(({ conversationInfo }) => {
                    if (!conversationInfo) {
                        ConversationService.createConversation(participant1, participant2)
                            .then(({ data }) => {

                                this.client.onCall(data)
                            })
                    }
                    else {

                        this.client.onCall(conversationInfo)
                    }
                })

        }
    }
}