import React from 'react';
import './InterestList.css'
import { useParams, useNavigate } from 'react-router-dom'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ManageInterestsModal from '../../../../../shared/ManageInterestsModal/ManageInterestsModal';
import InterestManagerService from '../../../../../../services/InterestManagerService';
import { useSelector } from 'react-redux'
function InterestList(props) {
    const { userId } = useParams()
    const navigate = useNavigate()
    const currentUser = useSelector((state) => state.currentUser.value)
    const [interestList, setInterestList] = React.useState([])
    function getInterestList(userId) {
        InterestManagerService.getInterestList(userId)
            .then(({ interests }) => {
                let tempList = []
                for (let interest of interests) {
                    tempList.push(interest.interest_name)
                }
                setInterestList(tempList)
            })
    }
    React.useEffect(() => {
        getInterestList(userId)
    }, [])
    const [interestsEditModalVisibility, setInterestsEditModalVisibility] = React.useState(false)
    return (
        <div className="interestListContainer">
            <ManageInterestsModal onComplete={() => {
                getInterestList(userId)
            }} closeModal={() => {
                setInterestsEditModalVisibility(false)
            }} modalVisibility={interestsEditModalVisibility} />
            <div className="flex" style={{
                alignItems: 'center',
                gap: '10px'
            }}>
                <p className="interestListHeading">
                    Interests
                </p>

                {userId * 1 === currentUser.Id * 1 && <div onClick={() => {
                    setInterestsEditModalVisibility(true)
                }}>
                    <BorderColorIcon style={{
                        color: 'white'
                    }} />
                </div>}

            </div>

            <div className='interestListPanel' >
                {interestList.map((interest, index) => {
                    return <InterestItem _onClick={() => {
                        navigate(`/search/query=${interest}/interest`)
                    }} key={index} interest={interest} />
                })}
            </div>

        </div>

    );
}
export function InterestItem({ interest, _onClick, additionalInfo }) {
    return <div onClick={() => {
        if (_onClick)
            _onClick()
    }} className="interestItem" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
        fontSize: '18px',
        cursor: 'pointer',
    }}>
        <p className="itemText">{interest}</p>
        {additionalInfo !== null && additionalInfo}
    </div>
}

export default InterestList;