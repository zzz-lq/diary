import { useState,useEffect } from "react"
import { addDocument,addNotificationsDocument } from "../../utils/firebase"
import { useSelector,useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { uuidv4 } from "@firebase/util"
import { upDateDiary } from "../../feature/diaries/diariesSlice"
import { addNotification } from "../../feature/notifications/notificationsSlice"
import { Timestamp } from "firebase/firestore"

const initialState = {
  title: "",
  type:"public",
  entries:[],
}

const CreateDiary = () => {

  const auth = useSelector(state => state.user.auth)
  const diaries = useSelector(state => state.diaries.diaries)
  const [formData,setFormData] = useState(initialState)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!auth){
      navigate("/signin")
    }
  },[auth])
  
  const handleChange = (e) => {
    const {name,value} = e.target
    setFormData({...formData,[name]:value})
  }

  const handleSubmit = async(e) => {

    e.preventDefault()
    const id = uuidv4();
    // const second = new Date().getTime()
    const createdAt = Timestamp.now();
    const data = {
      ...formData,
      id,
      createdAt,
      uid:auth.uid,
      displayName:auth.displayName,
    }
    // console.log(formData.type)
    await addDocument("diaries",data)
    const newone = [...diaries,{data}]
    dispatch(upDateDiary(newone))
    console.log("add done!") 

    if (formData.type === "public"){
      const ndata = {
        id:uuidv4(),
        createdAt,
        displayName:auth.displayName,
        content:"added a new project"
      }
      await addNotificationsDocument(ndata);
      dispatch(addNotification(ndata))
    }
    navigate("/")
  }

  return(
    <div className="container">
      <form className="white" onSubmit={handleSubmit}>
        <h5 className="grey-text text-darken-3">Create new diary</h5>
        <div className="input-field">
          <label htmlFor="title">Title</label>
          <input required type="text" id="title" name="title" onChange={handleChange} />
        </div>
        Type:
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
        <div className="input-field">
          <button className="btn pink lighten-1 z-depth-0">Create</button>
        </div>
      </form>
    </div>
  )
}

export default CreateDiary