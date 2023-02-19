import {Link} from 'react-router-dom'
import './index.css'

const MatchCard = props => {
  const {listOfItems} = props
  console.log(listOfItems)
  const {
    firstInnings,
    competingTeamLogo,
    result,
    competingTeam,
    matchStatus,
  } = listOfItems
  console.log(listOfItems)
  return (
    <>
      <Link to="/team-matches/:id">
        <li className="match-item">
          <img src={competingTeamLogo} alt={competingTeam} />
          <p>{competingTeam}</p>
          <p>{firstInnings}</p>
          <p>{result}</p>
          <p>{matchStatus}</p>
        </li>
      </Link>
    </>
  )
}
export default MatchCard
