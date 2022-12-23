import { useEffect, useState } from "react"
import { uuidv4 } from "@firebase/util"
import { useSelector,useDispatch } from "react-redux"
import { useNavigate,useParams } from "react-router-dom"
import { upDateDiary } from "../../feature/diaries/diariesSlice"
import { upDateEntriesDocument } from "../../utils/firebase"
import { Timestamp } from "firebase/firestore"
import { RootState } from "../../app/store"
import { ChangeEvent,FormEvent } from "react"

const initialFormData = {
  id:"",
  title:"",
  content:"",
  createdAt:Timestamp.now(),
}

const CreateEntry = () => {

  const diaries = useSelector((state:RootState) => state.diaries.diaries)
  const {did} = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // 当前的diary
  const diary = diaries.find((diary) => diary.id === did)
  const [formData,setFormData] = useState(initialFormData)
  const {content,title} = formData


  const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name,value} = e.target
    setFormData({...formData,[name]:value})
  }

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (diary){
      const entries = diary.entries
      const id = uuidv4()
      const createdAt = Timestamp.now()
      const data = {
        id,
        title,
        content,
        createdAt,
      }
      // console.log(data)
      const newone = diaries.map(diary => {
        if (diary.id === did){
          return {...diary,entries:[...entries,data]}
        }
        return diary
      })
      // console.log(newone)
      dispatch(upDateDiary(newone))
      await upDateEntriesDocument(diary.id,[...entries,data]);
      console.log("entry updata done!")
      navigate(`/diary/${did}`)
    }
  }

  return(
    <div className="container">
    <form  className="white" onSubmit={handleSubmit}>
      <h5 className="grey-text text-darken-3">Create new entry</h5>
      <div className="input-field">
        <label htmlFor="title">Title</label>
        <input required type="text" id="title" name="title" onChange={handleChange} />
      </div>
      <div className="input-field">
        <label htmlFor="content">Entry Content</label>
        <textarea
          id="content"
          className="materialize-textarea"
          name="content"
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="input-field">
        <button className="btn pink lighten-1 z-depth-0">Create</button>
      </div>
    </form>
  </div>
  )
}

export default CreateEntry