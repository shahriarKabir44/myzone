import React from 'react';
import { useSelector } from 'react-redux';
import ConversationListRoot from '../MessagesContainer/ConversationListRoot';
import './SlideInMessagesRoot.css'


function SlideInMessagesRoot(props) {
    const toggleStatus = useSelector(state => state.conversationListToggleManager.value.status)
    React.useEffect(() => { }, [toggleStatus])
    return (
        <>
            {toggleStatus === 1 && <div style={{
                background: "#47494a",
                right: 0
            }} className={`SlideInContainerRoot`}  >

                <ConversationListRoot />
            </div>}

        </>

    );
}

export default SlideInMessagesRoot;