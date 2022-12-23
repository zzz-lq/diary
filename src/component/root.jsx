import { Outlet } from "react-router-dom"
import Navbar from "./layout/navbar"
import Footer from "./layout/footer"

const Root = () => {

  return (
    <>
      <Navbar />
      <Outlet />
      <div style={{height: "150px"}}></div>
      <Footer />
    </>
  )
}

export default Root