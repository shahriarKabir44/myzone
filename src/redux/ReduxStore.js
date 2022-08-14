import { configureStore } from '@reduxjs/toolkit';

import CurrentUserManager from './CurrentUserManager';
import homeMenuSelection from './HomeMenuSelector'
let store = configureStore({
    reducer: {
        currentlySelectedView: homeMenuSelection,
        currentUser: CurrentUserManager
    }
})

export default store