import DiariesList from "../diary/diariesList"
import Notifications from "../notifications/notifications"
import { useSelector,useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { useEffect,useState } from "react"
import { BeatLoader } from "react-spinners";
import { getDocumentByDiaries} from "../../utils/firebase"
import { upDateDiary } from "../../feature/diaries/diariesSlice"
import store from "../../app/store"

const DashBoard = () => {

  const auth = useSelector(state => state.user.auth)
  const diaries = useSelector(state => state.diaries.diaries)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [update,setUpdate] = useState({})
  
  // 让redux立即更新
  useEffect(() => {
    // store.subscribe()是redux提供的，监测store更新的函数
    store.subscribe(() => {
      // 当store数据更新后执行 setUpdate() ，组件重新加载，实现界面store数据更新
      console.log("ok")
      setUpdate({})
    })
  })

  useEffect(() => {
    
    if (auth === null) {
      navigate("/signin")
      // alert("board dont have")
    }
    // only once
    // addCollectionAndDocuments("diaries",data)
  },[auth])

  useEffect(() => {
    const getData = async() => {
      const newData = await getDocumentByDiaries()
      // console.log(newData)
      dispatch(upDateDiary(newData))
    }
    getData()
  },[])

  return(
    <>
      {diaries ? 
      (
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            minWidth: "500px",
            minHeight: "100vh",
          }}
          className="dashboard container">
          <div className="row">
            <div className="col s12 l6 ">
              <DiariesList  />
            </div>
            <div className="col s12 l4 offset-l1">
              <Notifications />
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            minHeight: "90vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BeatLoader loading />
        </div>)}
    </>
  )

}

export default DashBoard