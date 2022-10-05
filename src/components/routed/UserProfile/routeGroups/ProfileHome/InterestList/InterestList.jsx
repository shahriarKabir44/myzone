import React from 'react';
import './InterestList.css'
let interests = [
    "🚴 cycling", "🏊 swimming", "📖books", "📸photography", "♬ music", "💃 dance", "🧘 yoga", "☕ coffee", "🍕 pizza", "🎨 painting", "✈ travel", "💍 jwellery"
]
function InterestList(props) {
    return (
        <div className="interestListContainer">
            <p className="interestListHeading">
                Interests
            </p>
            <div className='interestListPanel' >
                {interests.map((interest, index) => {
                    return <InterestItem key={index} interest={interest} />
                })}
            </div>
        </div>

    );
}
export function InterestItem({ interest, additionalInfo }) {
    return <div className="interestItem" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center'
    }}>
        <p className="itemText">{interest}</p>
        {additionalInfo}
    </div>
}

export default InterestList;