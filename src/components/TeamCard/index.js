import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {matches} = props
  const {name, id, teamImageUrl} = matches
  // console.log(matches)
  return (
    <>
      <Link to={`/team-matches/${id}`}>
        <li className="list">
          <div className="div1">
            <img src={teamImageUrl} alt={name} className="img" />
          </div>
          <p>{name}</p>
        </li>
      </Link>
    </>
  )
}
export default TeamCard
