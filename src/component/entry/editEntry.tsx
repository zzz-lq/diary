import { useParams } from "react-router-dom"
import { useSelector,useDispatch } from "react-redux"
import { useState,useEffect } from "react"
import { upDateDiary } from "../../feature/diaries/diariesSlice"
import { upDateEntriesDocument } from "../../utils/firebase"
import { useNavigate } from "react-router-dom"
import { Timestamp } from "firebase/firestore"
import { RootState } from "../../app/store"
import { DiaryType } from "../../utils/types"
import { ChangeEvent,FormEvent } from "react"

const initialState = {
  title:"",
  content:"",
}

const EditEntry = () => {

  const {did,eid} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const diaries = useSelector((state:RootState) => state.diaries.diaries)
  const [formData,setFormData] = useState(initialState)
  const {title,content} = formData
  // const [entry,setEntry] = useState()
  const [diary,setDiary] = useState({} as DiaryType)

  useEffect(() => {
    const newdiary = diaries.find((diary) => diary.id === did)
    if (newdiary) {
      setDiary(newdiary)
      const newentry = newdiary.entries.filter((entry) => entry.id === eid)
      // setEntry(newentry[0])
      const {title,content} = newentry[0]
      // console.log(content,title)
      setFormData({title,content})
    }
    // console.log(formData)
  },[])

  const onChangeValue = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name,value} = e.target
    setFormData({...formData,[name]:value})
  }

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // console.log("start")
    const createdAt = Timestamp.now()
    // const newEntry = {id:entry.id,createdAt,title,content}
    // console.log(newEntry)
    const newEntries = diary.entries.map((item) => {
      if (item.id === eid){
        return {id:item.id,title,content,createdAt}
      }
      // console.log("2")
      return item
    })
    // console.log(newEntries)
    // const newDiary = {...diary,entries:newEntries}
    // console.log(newDiary)
    const newDiaries = diaries.map((item) => {
      if (item.id === did){
        return({...item,entries:newEntries})
      }
      return item
    })
    // console.log(newDiaries)
    dispatch(upDateDiary(newDiaries))
    await upDateEntriesDocument(diary.id,newEntries)
    console.log("update entry done!")
    navigate(`/diary/${did}`)
  }
  
  return(
    <div className="container">
      <form className="white" onSubmit={handleSubmit}>
        <h5 className="grey-text text-darken-3">Edit entry</h5>
        <div className="input-field">
          <label htmlFor="title"></label>
          <input
            required
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={onChangeValue}
          />
        </div>
        <div className="input-field">
          <label htmlFor="content"></label>
          <textarea
            id="content"
            className="materialize-textarea"
            name="content"
            value={content}
            onChange={onChangeValue}
          ></textarea>
        </div>

        <div className="input-field">
          <button className="btn pink lighten-1 z-depth-0">Confirm</button>
        </div>
      </form>
    </div>
  )
}

export default EditEntry