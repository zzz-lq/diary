import { createSlice } from "@reduxjs/toolkit";
import { DiaryType } from "../../utils/types";

type InitialState = {
  diaries: DiaryType[]
}
 
const initialState:InitialState = {
  diaries: [],
};

const diariesSlice = createSlice({
  name:"diaries",
  initialState,
  reducers:{
    upDateDiary(state,action){
      state.diaries =  action.payload.slice()
    }
  }
})

export const {upDateDiary} = diariesSlice.actions

export default diariesSlice.reducer