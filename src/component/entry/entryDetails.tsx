import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import moment from "moment"
import { RootState } from "../../app/store"

const EntryDetails = () => {

  const {did,eid} = useParams()
  const diaries = useSelector((state:RootState) => state.diaries.diaries)
  const diary = diaries.find((diary) => diary.id === did)
  const entry = diary?.entries.find((entry) => entry.id === eid)
  
  return(
    <div className="container section entry-details">
      <div className="card z-depth-0">
        <div className="card-content">
          <span className="card-title">{entry?.title}</span>
          <pre style={{ width: "100%", overflow: "auto" }}>
            {entry?.content}
          </pre>
        </div>
        <div className="card-action grey lighten-4 grey-text">
          <div>{moment(diary?.createdAt.toDate()).calendar()}</div>
        </div>
      </div>
    </div>
  )
}

export default EntryDetails