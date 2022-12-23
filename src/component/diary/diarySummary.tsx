import { Link } from "react-router-dom"
import { useState,useEffect } from "react"
import moment from "moment/moment"
import { DiaryType } from "../../utils/types"

type DiarySummaryProps = {
  diary:DiaryType,
  abEdit:boolean,
  deleteDiary:(diary:DiaryType) => {}
}

const DiarySummary = (props:DiarySummaryProps) => {

  const {diary,abEdit,deleteDiary} = props
  const {title,entries,type,displayName,createdAt,id} = diary
  const [authName,setAuthName] = useState(displayName)
  const totalLength = entries.length
  // console.log(title,createdAt)

  useEffect(() => {
    if (abEdit) {
      setAuthName("You")
    }
  },[])

  const handleDelete = async () => {
    await deleteDiary(diary)
  }

  const addButton = abEdit ? (
    <Link
      to={"/diary/" + diary.id + "/create"}
      className="btn btn-small waves-effect  waves-light entries-btn"
      title="Add entry"
      style={{
        width: "50px",
        backgroundColor: "#4aa69b",
      }}
    >
      <i className="material-icons right">add</i>
    </Link>
  ) : null;

  const editButton = abEdit ? (
    <Link
      to={"/diary/" + diary.id + "/edit"}
      title="edit"
      style={{ color: "#4aa69b", margin: "0 0.5rem" }}
      className="secondary-content"
    >
      <i style={{ color: "#424242" }} className="material-icons ">
        create
      </i>
    </Link>
  ) : null;

    const deleteButton = abEdit ? (
      <a
        onClick={handleDelete}
        title="delete"
        style={{ color: "#4aa69b" }}
        className="secondary-content"
      >
        <i style={{ color: "#424242" }} className="material-icons edit-icon">
          delete
        </i>
      </a>
    ) : null;

  return(
    <div className="card hoverable z-depth-2 diary-summary">
    <div className="card-content grey-text text-darken-3">
      <div className="card-title">
        {title}
        <a
          title={type === "private" ? "private" : "public"}
          className="secondary-content"
        >
          <i
            style={{ color: "#424242", cursor: "default" }}
            className="material-icons"
          >
            {type === "private" ? "lock" : "lock_open"}
          </i>
        </a>
        {editButton}
        {deleteButton}
      </div>

      <span
        className="new badge"
        data-badge-caption={
          totalLength > 1 ? "saved entries" : "saved entry"
        }
      >
        {totalLength}
      </span>

      <p>
        Posted by <span className="pink-text">{authName ? authName : "Unkown"}</span>
      </p>

      <p className="grey-text">
        {/* time */}
        {moment(createdAt.toDate()).calendar()}
      </p>
      
      <div className="right-align">
       
        {totalLength > 0 ? (
            <Link 
              to={{pathname:"/diary/" + id}}
              className="btn btn-small waves-effect  waves-light entries-btn"
              title="View entries"
              style={{
                width: "50px",
                backgroundColor: "#4aa69b",
              }}
            >
              <i className="material-icons">send</i>
            </Link>
          ) : (
            addButton
          )}
        
      </div>
    </div>
  </div>
  )
}

export default DiarySummary