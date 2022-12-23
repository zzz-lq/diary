import "./signin.css"
import { signInWithGooglePopup,createUserDocumentFromAuth,signInAuthUserWithEmailAndPassword,getDocument} from "../../utils/firebase"
import { useDispatch,useSelector } from "react-redux"
import { upDateAuth } from "../../feature/user/userSlice"
import { useState,useEffect } from "react"
import { useNavigate } from 'react-router-dom'

const initialState = {
  email:"",
  password:"",
}
const SignIn = () => {

  const auth = useSelector(state => state.user.auth)
  const [formData,setFormData] = useState(initialState)
  const {email,password} = formData
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // console.log(auth)

  useEffect(() => {
    if (auth){
      navigate("/")
      // console.log("sign in have",auth)
    }
  },[auth])

  const signInWithGoogle = async (e) => {
    e.preventDefault()
    const {user} = await signInWithGooglePopup()
    // console.log(user.uid)
    await createUserDocumentFromAuth(user,{firstName:user.displayName,lastName:""})
    // 设置user
    dispatch(upDateAuth(user))
    
  }

  const onChangeValue = (e) => {
    const {name,value} = e.target
    setFormData({...formData,[name]:value})
  }

  const resetValue = () => {
    setFormData(initialState)
  }

  const onSubmitValue = async(e) => {

    e.preventDefault()
    try{
      const {user} = await signInAuthUserWithEmailAndPassword(email,password)
      const saveUser = await getDocument("users",user.uid)
      user.displayName = saveUser.firstName +" " + saveUser.lastName
      dispatch(upDateAuth(user))
      resetValue()
    }catch(error){
      console.log("there is something worry",error)
    }
  }

  return(
    <div className="container">
      <form  className="white" onSubmit={onSubmitValue}>
        <h5 className="grey-text text-darken-3">Sign In</h5>
        <div className="input-field col">
          <input
            type="email"
            required
            id="email"
            name="email"
            value={email}
            onChange={onChangeValue}
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="input-field col">
          <input
            type="password"
            required
            id="password"
            name="password"
            value={password}
            onChange={onChangeValue}
          />
          <label htmlFor="password">Password</label>
        </div>
        <div >
          <button className="btn pink lighten-1 z-depth-0">Login</button>
          <button onClick={signInWithGoogle} className="google btn pink lighten-1 z-depth-0 ">
            <i className="fa-brands fa-google"></i>
          </button>
        </div>
      </form>
      
    </div>
  )
}

export default SignIn