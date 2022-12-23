import SignInLinks from "./signedInLinks"
import SignOutLinks from "./signedOutLinks"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"

const Navbar = () => {

  const auth = useSelector((state:RootState) => state.user.auth)

  return(
    <nav className="nav-wrapper grey darken-3">
      <div className="container">
        <Link to="/" className="brand-logo left" style={{ marginLeft: "1rem" }}>
          Diaries App
        </Link>
        {
          auth.user ? <SignInLinks /> : <SignOutLinks />
        }
      </div>
    </nav>
  )
}

export default Navbar