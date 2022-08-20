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
                    return <div key={index} className="interestItem">
                        <p className="itemText">{interest}</p>
                    </div>
                })}
            </div>
        </div>

    );
}

export default InterestList;