import { createSlice } from "@reduxjs/toolkit";
import { getDocumentByDiaries } from "../../utils/firebase"

// const initialState = async() => {
//   return await getDocumentByDiaries()
// }
 
const initialState = {
  diaries: [
    {
      id: "1",
      uid:"aUsM80aYEFerVsRQQzA2r1s2SAS2",
      title: "Journey to Karachi",
      type: "private",
      displayName:"zhi lucia",
      entries: [
        {
          id: "1",
          title: "Seaview",
          content: "We enjoyed alot, on horses and cars and water",
        },
        {
          id: "2",
          title: "Dolmen Mall",
          content: "We did shopping and eating",
        },
      ],
    },
  ],
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