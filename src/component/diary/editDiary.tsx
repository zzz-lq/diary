import { useParams } from "react-router-dom"
import { useEffect,useState } from "react"
import { useSelector,useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { upDateDiaryDocument } from "../../utils/firebase"
import { upDateDiary } from "../../feature/diaries/diariesSlice"
import { Timestamp } from "firebase/firestore"
import { RootState } from "../../app/store"
import { ChangeEvent,FormEvent } from "react"

const EditDiary = () => {

  const auth = useSelector((state:RootState) => state.user.auth)
  const diaries = useSelector((state:RootState) => state.diaries.diaries)
  const {did} = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // 当前的diary
  const diary = diaries.find((diary) => diary.id === did)
  // console.log(diary)
  const initialFormData ={
    title: diary?.title || "",
    type: diary?.type || "",
  }
  const [formData,setFormData] = useState(initialFormData)
  // console.log(diary)
  const {title,type} = formData

  useEffect(() => {
    if (!auth){
      navigate("/signin")
    }
  },[auth])

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    const {name,value} = e.target
    setFormData({...formData,[name]:value})
  }

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // console.log("title",title)
    // console.log("type",type)
    const createdAt = Timestamp.now()
    const newData = diaries.filter((diary) => {
      if (diary.id === did ){
        diary = {...diary,type,title,createdAt}
        // console.log(diary)
        return diary
      }
      return diary
    })
    dispatch(upDateDiary(newData))
    const data = {
      ...formData,
      createdAt,
    }
    await upDateDiaryDocument(did as string,data)
    navigate("/")
    console.log("update done!")
  }

  return(
    <div className="container">
      <form className="white" onSubmit={handleSubmit}>
        <h5 className="grey-text text-darken-3">Edit Diary</h5>
        <div className="input-field">
          <label htmlFor="title"></label>
          <input
            required
            type="text"
            id="title"
            name="title"
            onChange={handleChange}
            value={title}
          />
        </div>
        Type:

        { diary && 
        diary.type === "public" ? (
          <>
            <p>
              <label>
                <input
                  className="with-gap"
                  name="type"
                  type="radio"
                  id="type"
                  required
                  defaultChecked
                  value="public"
                  onChange={handleChange}
                />
                <span>Public</span>
              </label>
            </p>
            <p>
              <label>
                <input
                  className="with-gap"
                  name="type"
                  id="type"
                  required
                  type="radio"
                  value="private"
                  onChange={handleChange}
                />
                <span>Private</span>
              </label>
            </p>
          </>
        ) : (
          <>
            <p>
              <label>
                <input
                  className="with-gap"
                  name="type"
                  type="radio"
                  id="type"
                  required
                  value="public"
                  onChange={handleChange}
                />
                <span>Public</span>
              </label>
            </p>
            <p>
              <label>
                <input
                  className="with-gap"
                  name="type"
                  id="type"
                  required
                  type="radio"
                  value="private"
                  defaultChecked
                  onChange={handleChange}
                />
                <span>Private</span>
              </label>
            </p>
          </>
        )}
        
        <div className="input-field">
          <button className="btn pink lighten-1 z-depth-0">Confirm</button>
        </div>
      </form>
    </div>
  )
}

export default EditDiary