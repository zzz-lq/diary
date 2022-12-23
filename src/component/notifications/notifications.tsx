import Notification from "./notification/notification"
import { useEffect } from "react"
import { getNotificationsDocument } from "../../utils/firebase"
import { setNotifications } from "../../feature/notifications/notificationsSlice"
import { useDispatch,useSelector } from "react-redux"
import { RootState } from "../../app/store"

const Notifications = () => {

  const dispatch = useDispatch()
  const notifications = useSelector((state:RootState) => state.notifications.notifications)
  // console.log("notifications",notifications)

  useEffect(() => {
    const getData = async () => {
      const data = await getNotificationsDocument()
      dispatch(setNotifications(data))
      // console.log(data)
    }
    getData()
  },[])

  return(
    <div className="section">
      <h4
        className="card-title"
        style={{ color: "#424242", textShadow: "2px 2px 2px #776a6a" }}
      >
        Notifications
      </h4>
      <div className="divider"></div>
      <div className="card z-depth-0">
        <div className="card-content">
          <ul className="notifications">
              {
                notifications && (
                  notifications.length > 4 ? (
                    notifications.slice(-4,).map((notification) => {
                      return <Notification key={notification.id} notification={notification}/>
                    })
                  ):(
                    notifications.map((notification) => {
                      return <Notification key={notification.id} notification={notification}/>
                    })
                  )    
                )
              }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Notifications 