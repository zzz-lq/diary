import EntriesList from "../entry/entriesList"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

const DiaryDetails = () => {

  const diaries = useSelector(state => state.diaries.diaries)
  const {did} = useParams()
  const diary = diaries.find((diary) => diary.id === did)

  return(
    <div className="dashboard container">
      <div className="row">
        <div className="col s12 l10">
          <EntriesList diary={diary}/>
        </div>
      </div>
    </div>
  )
}

export default DiaryDetails