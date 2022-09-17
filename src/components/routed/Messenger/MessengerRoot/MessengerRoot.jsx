import React from 'react';
import './MessengerRoot.css'
import ConversationListRoot from '../../../shared/SlideInMessageContainer/MessagesContainer/ConversationListRoot'
import TextingContainer from '../TextingContainer/TextingContainer';
import { useDispatch } from 'react-redux'

import { toggleConversationListView } from '../../../../redux/ConversatinListToggleManager'
function MessengerRoot(props) {
    const [isOnMobileScreen, setScreenType] = React.useState(false)
    const toggleSlideInConversationList = useDispatch()

    React.useEffect(() => {
        console.log('here')
        toggleSlideInConversationList(toggleConversationListView(0))
        setScreenType(window.innerWidth <= 620)
    }, [])
    return (
        <div>
            {isOnMobileScreen && <div className="mobileScreenMessengerViewRoot">
                <div className="messengerContainer">
                    <TextingContainer />

                </div>
            </div>}
            {!isOnMobileScreen && <div className="largeScreenMessengerViewRoot">
                <div className="conversationListContainer">
                    <ConversationListRoot />
                </div>
                <div className="messengerContainer">
                    <TextingContainer />

                </div>
            </div>}
        </div>
    );
}

export default MessengerRoot;