import { createSlice } from "@reduxjs/toolkit"
import { Timestamp } from "firebase/firestore"

const initialState = {
  notifications:[{
  id:"1",
  content:"Joined the party",
  user:"Zhi lu",
  createdAt:Timestamp.now(),
}]}

const notificationSlice = createSlice({
  name:"notifications",
  initialState,
  reducers:{
    setNotifications(state,action){
      state.notifications = action.payload
    },
    addNotification(state,action){
      state.notifications = [action.payload,...state.notifications]
    }
  }
})

export const {setNotifications,addNotification} = notificationSlice.actions
export default notificationSlice.reducer