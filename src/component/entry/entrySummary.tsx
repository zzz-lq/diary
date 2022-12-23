import { Link } from "react-router-dom"
import { upDateEntriesDocument } from "../../utils/firebase"
import { useSelector,useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { upDateDiary } from "../../feature/diaries/diariesSlice"
import moment from "moment/moment"
import { RootState } from "../../app/store"
import { EntryType } from "../../utils/types"

type EntrySummaryProps = {
  entry: EntryType,
  abEdit:boolean,
  diaryId: string
}

const EntrySummary = (props:EntrySummaryProps) => {

  const {entry,abEdit,diaryId} = props
  const {title,id,content,createdAt} = entry
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const diaries = useSelector((state:RootState) => state.diaries.diaries)
  const diary = diaries.find((diary) => diary.id === diaryId)

  const handleDelete = async () => {

    const newEntries = diary?.entries.filter((item) => (item.id !== id))
    // console.log(newEntries)
    const newDiaries = diaries.map((item) => {
      if ((item.id === diaryId)){
        return({...item,entries:newEntries})
      }
      return item
    })
    // console.log(newDiaries)
    dispatch(upDateDiary(newDiaries))
    await upDateEntriesDocument(diary?.id || "",newEntries ||[])
    console.log("update entry done!")
    navigate(`/diary/${diaryId}`)
  }

  let editButton = abEdit ? (
    <Link to={`/diary/${diaryId}/${id}/edit`} title="edit" className="secondary-content">
      <i style={{ color: "#424242" }} className="material-icons edit-icon">
        create
      </i>
    </Link>
  ) : null;

  let deleteButton = abEdit ? (
    <a
      onClick={handleDelete}
      title="delete"
      style={{ margin: "0 1rem" }}
      className="secondary-content"
    >
      <i style={{ color: "#424242" }} className="material-icons edit-icon">
        delete
      </i>
    </a>
  ) : null;

  return(
    <div className="card hoverable z-depth-2 entry-summary">
      <div className="card-content grey-text text-darken-3">
        <div className="card-title">
          {title}

          {deleteButton}
          {editButton}
          <Link
            to={`/diary/${diaryId}/${id}`}
            style={{ margin: "0 1rem" }}
            title="view"
            className="secondary-content"
          >
            <i
              style={{ color: "#424242" }}
              className="material-icons edit-icon"
            >
              visibility
            </i>
          </Link>
        </div>

        <p className="truncate">{content}</p>

        <p className="grey-text">{moment(diary?.createdAt.toDate()).calendar()}</p>
      </div>
    </div>
  )
}

export default EntrySummary