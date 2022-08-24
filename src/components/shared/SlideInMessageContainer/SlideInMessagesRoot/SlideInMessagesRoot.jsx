import React from 'react';
import { useSelector } from 'react-redux';
import ConversationListRoot from '../MessagesContainer/ConversationListRoot/ConversationListRoot';
import './SlideInMessagesRoot.css'


function SlideInMessagesRoot(props) {
    const toggleStatus = useSelector(state => state.conversationListToggleManager.value.status)
    return (
        <div className={`SlideInMessagesRoot ${toggleStatus === 1 ? 'slideContainerRight' : toggleStatus === 0 ? 'slideContainerLeft' : ""}`}>

            <ConversationListRoot />

        </div>
    );
}

export default SlideInMessagesRoot;