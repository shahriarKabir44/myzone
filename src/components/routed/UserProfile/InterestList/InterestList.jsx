import React from 'react';
import './InterestList.css'
let interests = [
    "🚴 cycling", "🏊 swimming", "📖books", "📸photography", "🚴 cycling", "🏊 swimming", "📖books", "📸photography", "🚴 cycling", "🏊 swimming", "📖books", "📸photography"
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