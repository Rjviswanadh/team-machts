import {Component} from 'react'

import Loader from 'react-loader-spinner'

import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {
    matchList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getMatchDetails()
  }

  getMatchDetails = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    // console.log(data.teams)

    const newMatchList = data.teams.map(eachMatch => ({
      id: eachMatch.id,
      name: eachMatch.name,
      teamImageUrl: eachMatch.team_image_url,
    }))
    this.setState({matchList: newMatchList, isLoading: false})
  }

  render() {
    const {matchList, isLoading} = this.state
    // console.log(matchList)
    return (
      <>
        <div className="bg-img">
          <div className="div">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
              className="img ipl"
            />
            <h1 className="heading ipl">IPL Dashboard</h1>
          </div>
          {isLoading ? (
            <div // testid="loader"
            >
              <Loader type="Oval" color="green" height={50} />
            </div>
          ) : (
            <ul className="background">
              {matchList.map(eachItem => (
                <TeamCard matches={eachItem} key={eachItem.id} />
              ))}
            </ul>
          )}
        </div>
      </>
    )
  }
}
export default Home
