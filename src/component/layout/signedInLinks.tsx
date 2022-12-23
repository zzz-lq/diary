import { NavLink } from "react-router-dom"
import { useSelector,useDispatch } from "react-redux"
import { signOutUser } from "../../utils/firebase"
import { upDateAuth } from "../../feature/user/userSlice"
import { useNavigate } from 'react-router-dom'
import { RootState } from "../../app/store"

const SignInLinks = () => {

  const auth = useSelector((state:RootState) => state.user.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const signOutClick = async () => {
    await signOutUser()
    dispatch(upDateAuth({
      auth:{
        user:null ,
        displayName:""
      },
    }))
    navigate("/signin")
  }

  return(
    <ul className="right">
      <li >
        <a onClick={signOutClick}>Log Out</a>
      </li>
      <li >
        <NavLink to="/" className="btn btn-floating pink lighten-1" >
          {
          auth.displayName? auth.displayName : auth.user?.email
        }
        </NavLink>
      </li>
    </ul>
  )
}

export default SignInLinks