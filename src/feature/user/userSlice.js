import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth:null,
}

const userSlice = createSlice({
  name:"user",
  initialState,
  reducers:{
    upDateAuth(state,action){
      state.auth = action.payload
    }
  }
})

export const {upDateAuth} = userSlice.actions

export default userSlice.reducer
