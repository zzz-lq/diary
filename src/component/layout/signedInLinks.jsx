import { NavLink } from "react-router-dom"
import { useSelector,useDispatch } from "react-redux"
import { signOutUser } from "../../utils/firebase"
import { upDateAuth } from "../../feature/user/userSlice"
import { useNavigate } from 'react-router-dom'

const SignInLinks = () => {

  const auth = useSelector(state => state.user.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const signOutClick = async () => {
    await signOutUser()
    dispatch(upDateAuth(null))
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
          auth.displayName? auth.displayName : auth.email
        }
        </NavLink>
      </li>
    </ul>
  )
}

export default SignInLinks