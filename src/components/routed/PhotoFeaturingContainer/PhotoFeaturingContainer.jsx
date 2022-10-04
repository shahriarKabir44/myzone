import React from 'react'
import './PhotoFeaturingContainer.css'
import { useParams } from 'react-router-dom'
import UserInfoContainer from '../../shared/UserInfoContainer'
import FeaturingService from '../../../service/FeaturingService'
export default function PhotoFeaturingContainer() {
    const currentRoute = useParams()
    const [photos, setPhotoList] = React.useState([])
    const [creatorInfo, setCreatorInfo] = React.useState({})
    const [label, setLabel] = React.useState("")
    React.useEffect(() => {
        console.log(currentRoute)
        FeaturingService.getAlbumInfo(currentRoute.groupId)
            .then(albumInfo => {
                setCreatorInfo(albumInfo.creatorInfo)
                setPhotoList(albumInfo.attachedPhotos)
                setLabel(albumInfo.label)
            })
    }, [])
    return (
        <div className='featuredPhotoContainerRoot'>
            <div className="storyContainer">
                <div className="creatorInfoContainer">
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px"
                    }}>
                        <img src={creatorInfo.profileImage} style={{
                            height: "50px",
                            width: "50px"
                        }} alt="" className="userImg" />
                        <div style={{

                            margin: '5px'
                        }}>
                            <p style={{
                                color: "white",
                                fontWeight: 200,
                                fontSize: "25px",
                                margin: 0
                            }}>{creatorInfo.name}</p>
                            <p style={{
                                color: "white",

                                margin: 0
                            }}>{label}</p>
                        </div>
                    </div>
                </div>
                <div className="photoContainer">
                    <img className="photo" alt="imag" src={photos[0]} />
                </div>
                <div className="navContainer">

                </div>
            </div>
        </div>
    )
}

