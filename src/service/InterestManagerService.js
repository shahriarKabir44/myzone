import Globals from './Globals'
export default class InterestManagerService {
    static basePath = Globals.SERVER_IP + '/interests/'
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
    static async createInterest(interestName) {
        return Globals._fetch(this.basePath + 'createInterest/', { interestName })
    }
}