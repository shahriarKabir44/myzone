import { configureStore } from '@reduxjs/toolkit';
import ConversatinListToggleManager from './ConversatinListToggleManager';

import CurrentUserManager from './CurrentUserManager';
import homeMenuSelection from './HomeMenuSelector'
let store = configureStore({
    reducer: {
        currentlySelectedView: homeMenuSelection,
        currentUser: CurrentUserManager,
        conversationListToggleManager: ConversatinListToggleManager
    }
})

export default store