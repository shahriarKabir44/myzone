import Globals from './Globals'
export default class InterestManagerService {
    static basePath = Globals.SERVER_URL + '/interests/'
    static async updateInterestList(newItems, addedItems, removedItems, userId) {
        return Promise.all([
            this.createManyInterestItemAndConnect(newItems, userId),
            this.linkManyInterests(addedItems, userId),
            this.removeManyInterest(removedItems, userId)
        ])
    }
    static async removeManyInterest(interestList, userId) {
        let promises = []
        for (let interestName of interestList) {
            promises.push(InterestManagerService.removeInterest(userId, interestName))
        }
        return await Promise.all(promises)
    }
    /**
     * 
     * @param {String[]} interestList 
     * @param {Number} userId 
     */
    static async createManyInterestItemAndConnect(interestList, userId) {
        let promises = []
        for (let interestName of interestList) {
            promises.push(InterestManagerService.createInterest(interestName)
                .then(() => {
                    this.addInterest(userId, interestName)
                }))
        }
        return await Promise.all(promises)
    }
    static async linkManyInterests(interestList, userId) {
        let promises = []
        for (let interestName of interestList) {
            promises.push(InterestManagerService.addInterest(userId, interestName))
        }
        return await Promise.all(promises)
    }
    static async getInterestList(userId) {
        return Globals._fetch(this.basePath + 'getInterestList/' + userId)
    }
    static async getOtherInterests(userId) {
        return Globals._fetch(this.basePath + 'getOtherInterests/' + userId)
    }
    static async addInterest(userId, interestName) {
        return Globals._fetch(this.basePath + 'addInterest/', { userId, interestName })
    }
    static async removeInterest(userId, interestName) {
        return Globals._fetch(this.basePath + 'removeInterest/', { userId, interestName })
    }
    static async createInterest(interest_name) {
        return Globals._fetch(this.basePath + 'createInterest/', { interest_name })
    }
}