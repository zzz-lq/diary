import { useState } from "react"
import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth } from "../../utils/firebase"
import { useDispatch } from "react-redux"
import { upDateAuth } from "../../feature/user/userSlice"
import { useNavigate } from 'react-router-dom'
import { ChangeEvent,FormEvent } from "react"

//自动推断 
const initialState = {
  email: "",
  password: "",
  confirmPassword:"",
  firstName:"",
  lastName:"",
}

const SignUp = () => {

  const [signUpFormData,setsignUpFormData] = useState(initialState)
  const {email,password,confirmPassword,firstName,lastName} = signUpFormData
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onChangeValue = (e:ChangeEvent<HTMLInputElement>) => {
    const {name,value} = e.target
    setsignUpFormData({...signUpFormData,[name]:value})
  }

  const resetForm = () => {
    setsignUpFormData(initialState)
  }

  const onSubmitValue = async (e:FormEvent<HTMLFormElement>) => {

    e.preventDefault()

    if (password !== confirmPassword){
      alert("password is not equal, please check again")
      return;
    }

    try {
      const response = await createAuthUserWithEmailAndPassword(email,password)
      if (response){
        await createUserDocumentFromAuth(response.user,{firstname:firstName,lastname:lastName})
        const displayName = firstName + " " + lastName
        dispatch(upDateAuth({user:response.user,displayName}))
        resetForm()
        navigate("/")
      }
    }catch(error){
      console.log("there is something worry",error)
    }
  }

  return(
    <div className="container">
    <form className="white" onSubmit={onSubmitValue}>
      <h5 className="grey-text text-darken-3">Sign Up</h5>
      <div className="input-field">
        <label htmlFor="email" >Email</label>
        <input
          type="email"
          required
          id="email"
          name="email"
          value={email}
          onChange={onChangeValue}
        />
      </div>
      <div className="input-field">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          required
          id="password"
          name="password"
          value={password}
          onChange={onChangeValue}
        />
      </div>
      <div className="input-field">
        <label htmlFor="confirmPassword">ConfirmPassword</label>
        <input
          type="password"
          required
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={onChangeValue}
        />
      </div>
      <div className="input-field">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          required
          id="firstName"
          name="firstName"
          value={firstName}
          onChange={onChangeValue}
        />
      </div>
      <div className="input-field">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          required
          id="lastName"
          name="lastName"
          value={lastName}
          onChange={onChangeValue}
        />
      </div>
      <div className="input-field">
        <button className="btn pink lighten-1 z-depth-0">Sign Up</button>
      </div>
    </form>
  </div>
  )
}

export default SignUp