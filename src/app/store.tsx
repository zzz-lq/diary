import { configureStore} from "@reduxjs/toolkit";
import userReducer from "../feature/user/userSlice"
import diariesReducer from "../feature/diaries/diariesSlice";
import notificationsReducer from "../feature/notifications/notificationsSlice";

const store = configureStore({
  reducer:{
    user:userReducer,
    diaries:diariesReducer,
    notifications:notificationsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>;
export default store