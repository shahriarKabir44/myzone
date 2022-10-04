import Globals from "./Globals";
export default class FeaturingService {
    static async getFeaturedAlbums(createdBy, selectedImgURL) {
        return fetch(Globals.SERVER_IP + '/featuredAlbums/getFeaturedAlbums/', {
            method: 'POST',
            body: JSON.stringify({ selectedImgURL, createdBy }),
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        }).then(res => res.json())
    }

    static async createFeaturedAlbum(label, createdBy) {
        return fetch(Globals.SERVER_IP + '/featuredAlbums/createFeaturedAlbum/', {
            method: 'POST',
            body: JSON.stringify({ label, createdBy }),
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        }).then(res => res.json())
    }
    static async addPhotoToFeaturedAlbum(groupId, photoURL) {
        return fetch(Globals.SERVER_IP + '/featuredAlbums/addPhotoToFeaturedAlbum/', {
            method: 'POST',
            body: JSON.stringify({ groupId, photoURL }),
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        }).then(res => res.json())
    }
    static async removePhotoFromFeaturedAlbum(albumName, photo) { }
}