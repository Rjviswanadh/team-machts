import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

import './index.css'

// const teamMatchesApiUrl = 'https://apis.ccbp.in/ipl/'

class TeamMatches extends Component {
  state = {
    isLoading: true,

    recent: [],
    latests: [],
  }

  componentDidMount() {
    this.getRecentMatches()
  }

  getRecentMatches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    // console.log(id)

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const fetchedData = await response.json()
    console.log(fetchedData)
    // const teamBannerURL = fetchedData.team_banner_ur
    // console.log(latestMatch)
    const teamBannerURL = fetchedData.team_banner_url
    const latestList = {
      umpires: fetchedData.latest_match_details.umpires,
      result: fetchedData.latest_match_details.result,
      manOfTheMatch: fetchedData.latest_match_details.man_of_the_match,
      id: fetchedData.latest_match_details.id,
      date: fetchedData.latest_match_details.date,
      venue: fetchedData.latest_match_details.venue,
      competingTeam: fetchedData.latest_match_details.competing_team,
      competingTeamLogo: fetchedData.latest_match_details.competing_team_logo,
      firstInnings: fetchedData.latest_match_details.first_innings,
      secondInnings: fetchedData.latest_match_details.second_innings,
      matchStatus: fetchedData.latest_match_details.match_status,
    }
    //  console.log(latestList, '8888')
    const recentMatches = fetchedData.recent_matches.map(recentMatch => ({
      umpires: recentMatch.umpires,
      result: recentMatch.result,
      manOfTheMatch: recentMatch.man_of_the_match,
      id: recentMatch.id,
      date: recentMatch.date,
      venue: recentMatch.venue,
      competingTeam: recentMatch.competing_team,
      competingTeamLogo: recentMatch.competing_team_logo,
      firstInnings: recentMatch.first_innings,
      secondInnings: recentMatch.second_innings,
      matchStatus: recentMatch.match_status,
    }))
    this.setState({
      banner: teamBannerURL,
      latests: latestList,
      recent: recentMatches,
      isLoading: false,
    })
  }

  renderRecentMatchesList = () => {
    const {recent} = this.state

    return (
      <ul className="recent-matches-list">
        {recent.map(recentMatch => (
          <MatchCard listOfItems={recent} key={recentMatch.id} />
        ))}
      </ul>
    )
  }

  renderTeamMatches = () => {
    const {banner, latests} = this.state
    console.log(latests)

    return (
      <div className="team-matches-container">
        <LatestMatch latestMatches={latests} banner={banner} />
        {this.renderRecentMatchesList()}
      </div>
    )
  }

  renderLoader = () => (
    <div // testid="loader"
      className="loader-container"
    >
      <Loader type="Oval" color="#ffffff" height="50" />
    </div>
  )

  getRouteClassName = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'SH':
        return 'srh'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  render() {
    const {isLoading} = this.state
    const className = `team-matches-route-container ${this.getRouteClassName()}`

    return (
      <div className={className}>
        {isLoading ? this.renderLoader() : this.renderTeamMatches()}
      </div>
    )
  }
}

export default TeamMatches
