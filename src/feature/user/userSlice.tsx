import { createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

type InitialState = {
  auth:{
    user:User | null,
    displayName:string
  }
}

export const initialState:InitialState = {
  auth:{
    user:null ,
    displayName:""
  },
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
