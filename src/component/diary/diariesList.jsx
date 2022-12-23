import DiarySummary from "./diarySummary"
import { Link, useNavigate } from "react-router-dom"
import { useSelector,useDispatch } from "react-redux"
import { upDateDiary } from "../../feature/diaries/diariesSlice"
import { deleteDocument } from "../../utils/firebase"
import { useState,useEffect } from "react"
import store from "../../app/store"

const DiariesList = () => {

  const auth = useSelector(state => state.user.auth)
  const diaries = useSelector(state => state.diaries.diaries)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isChecked,setIsChecked] = useState(false)
  const [filterDiaries,setFilterDiaries] = useState(diaries)
  // console.log("filterDiaries",filterDiaries)
  // const [update,setUpdate] = useState({})
  
  // // 让redux立即更新
  // useEffect(() => {
  //   store.subscribe(() => {
  //     console.log("okk")
  //     setUpdate({})
  //   })
  // })

  useEffect(() => {
    const newOne = diaries.slice()
    setFilterDiaries(newOne)
  },[diaries])

  useEffect(() => {
    if (isChecked && auth){
      const newDiaries = diaries.filter((diary) => (diary.uid === auth.uid))
      setFilterDiaries(newDiaries)
    }else {
      setFilterDiaries(diaries)
    }
  },[isChecked])

  const deleteDiary = async (diary) => {
    const newDiaries = diaries.filter((item) => (item.id !== diary.id))
    // alert("delete")
    // console.log("newDiaries",newDiaries)
    dispatch(upDateDiary(newDiaries))
    // alert('start')
    await deleteDocument("diaries",diary.id)
    console.log("delete done!")
    navigate("/")
  }
  const taggleChange = () => {
    setIsChecked(!isChecked)
  }


  return(
    <div className="project-list section">
      <h4
        className="card-title"
        style={{ color: "#424242", textShadow: "2px 2px 2px #776a6a" }}
      >
        Diaries
        <span className="switch secondary-content">
          <label htmlFor="switch">
            <span
              style={{
                fontSize: "1.3rem",
                color: "brown",
                textShadow: "1px 1px 1px gray",
              }}
            >
              My Diaries Only
            </span>
            <input
              id="switch"
              type="checkbox"
              onChange={taggleChange}
            />
            <span className="lever"></span>
          </label>
        </span>
      </h4>

      <div className="divider"></div>

      {
        (filterDiaries && auth) && (
          filterDiaries.map((diary) => {
            // console.log(diary.uid)
            // console.log(auth.uid)
            if (diary.type === "private") {
              if (diary.uid === auth.uid){
                return(
                  <DiarySummary key={diary.id} diary={diary} abEdit={true} deleteDiary={deleteDiary}/>
                )
              }
            }
             else if (diary.type === "public"){
              if (diary.uid === auth.uid) {
                return(
                  <DiarySummary key={diary.id} diary={diary} abEdit={true} deleteDiary={deleteDiary} />
                )
              }else{
                return(
                  <DiarySummary key={diary.id} diary={diary} abEdit={false} deleteDiary={deleteDiary} />
                )
              }
            }
          })
        )
        
      }

      <div className="fixed-action-btn">
        <Link
          title="create new diary"
          className="btn-floating btn-large  waves-effect hoverable waves-light green"
          to="/create"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  )
}

export default DiariesList

