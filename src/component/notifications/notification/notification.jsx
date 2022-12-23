import moment from "moment"

const Notification = ({notification}) => {

  const {content,displayName,createdAt} = notification
  // console.log(createdAt)
  return(
    <li >
      <span className="pink-text">{displayName} </span>
      <span>{content}</span>
      <div className="grey-text note-date">
      {moment(createdAt.toDate()).calendar()}
      </div>
    </li>
  )
}

export default Notification