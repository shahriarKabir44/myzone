import Globals from "./Globals";
export default class SearchingServices {
    static basePath = Globals.SERVER_IP + '/search'
    static async findUsers(query, currentUserId, pageNumber = 0) {
        return Globals._fetch(this.basePath + '/users', { query, currentUserId, pageNumber })
    }
    static async searchposts(query, pageNumber = 0) {
        console.log(query)
        let { data } = await Globals._fetch(Globals.SERVER_IP + '/graphql', {
            query: `query {
                        filterPost(query:"${query}",pageNumber:${pageNumber}){
                            attached_media
                            posted_on
                            Id
                            creatorInfo{
                                name
                                profileImage
                                Id
                            }
                            numComments
                            numReactions
                        }
                    }`
        })

        return data.filterPost
    }
}