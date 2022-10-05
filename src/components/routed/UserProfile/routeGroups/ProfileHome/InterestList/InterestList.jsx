import React from 'react';
import './InterestList.css'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ManageInterestsModal from '../../../../../shared/ManageInterestsModal/ManageInterestsModal';
let interests = [
    "🚴 cycling", "🏊 swimming", "📖books", "📸photography", "♬ music", "💃 dance", "🧘 yoga", "☕ coffee", "🍕 pizza", "🎨 painting", "✈ travel", "💍 jwellery"
]

function InterestList(props) {
    const [interestsEditModalVisibility, setInterestsEditModalVisibility] = React.useState(false)
    return (
        <div className="interestListContainer">
            <ManageInterestsModal closeModal={() => {
                setInterestsEditModalVisibility(false)
            }} modalVisibility={interestsEditModalVisibility} />
            <div className="flex" style={{
                alignItems: 'center',
                gap: '10px'
            }}>
                <p className="interestListHeading">
                    Interests
                </p>
                <div onClick={() => {
                    setInterestsEditModalVisibility(true)
                }}>
                    <BorderColorIcon style={{
                        color: 'white'
                    }} />
                </div>

            </div>

            <div className='interestListPanel' >
                {interests.map((interest, index) => {
                    return <InterestItem key={index} interest={interest} />
                })}
            </div>

        </div>

    );
}
export function InterestItem({ interest, _onClick, additionalInfo }) {
    return <div onClick={() => {
        _onClick()
    }} className="interestItem" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
        fontSize: '18px'
    }}>
        <p className="itemText">{interest}</p>
        {additionalInfo !== null && additionalInfo}
    </div>
}

export default InterestList;