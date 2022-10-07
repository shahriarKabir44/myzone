import { configureStore } from '@reduxjs/toolkit';
import ConversatinListToggleManager from './ConversatinListToggleManager';
import FriendRequestToggleManager from './FriendRequestToggleManager'
import CurrentUserManager from './CurrentUserManager';
import homeMenuSelection from './HomeMenuSelector'
import NotificationTrayToggleManager from './NotificationTrayToggleManager';
let store = configureStore({
    reducer: {
        FriendRequestToggleManager: FriendRequestToggleManager,
        currentlySelectedView: homeMenuSelection,
        currentUser: CurrentUserManager,
        conversationListToggleManager: ConversatinListToggleManager,
        notificationsTrayManager: NotificationTrayToggleManager
    }
})

export default store