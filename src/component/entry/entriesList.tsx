import EntrySummary from "./entrySummary"
import { useSelector } from "react-redux"
import { useNavigate,Link } from "react-router-dom"
import { useState,useEffect } from "react"
import { RootState } from "../../app/store"
import { DiaryType } from "../../utils/types"

type EntriesListProps = {
  diary:DiaryType
}

const EntriesList = (props:EntriesListProps) => {

  const {diary} = props
  const [entries,setEntries] = useState(diary.entries)
  const auth = useSelector((state:RootState) => state.user.auth)
  const navigate = useNavigate()
  const [abEdit,setAbEdit] = useState(false)

  useEffect(() => {
    if (!auth){
      navigate("/signin")
    }
  },[auth])

  useEffect(() => {
    if (diary.uid === auth.user?.uid){
      setAbEdit(true)
    }
  },[])

  useEffect(() => {
    const en = diary.entries.slice()
    setEntries(en)
  },[diary])

  let button = abEdit ? (
    <Link
      title="create new entry"
      className="btn-floating btn-large  waves-effect hoverable waves-light green"
      to={`/diary/${diary.id}/create`}
    >
      <i className="material-icons">add</i>
    </Link>
  ) : null;

  return(
    <div className="project-list section">
      <h4 className="card-title" style={{ color: "#424242" }}>
        diaryName
      </h4>
      <div className="divider"></div>
        {
          entries.length > 0 && (
            entries.map(entry => {
              return(<EntrySummary key={entry.id} entry={entry} abEdit={abEdit} diaryId={diary.id}/>)
            })
          )
        }
      <div className="fixed-action-btn">{button}</div>
    </div>
  )
}

export default EntriesList