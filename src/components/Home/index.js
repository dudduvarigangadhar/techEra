import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Home extends Component {
  state = {courses: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.renderCourses()
  }

  renderCourses = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      // console.log(data)

      const updatedData = data.courses.map(eachItem => ({
        id: eachItem.id,
        logoUrl: eachItem.logo_url,
        name: eachItem.name,
      }))
      this.setState({
        courses: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getCourses = () => {
    const {courses} = this.state
    return (
      <ul className="coursesContainer">
        {courses.map(eachItem => (
          <Link
            to={`/courses/:${eachItem.id}`}
            key={eachItem.id}
            className="imgContainer"
          >
            <img
              src={eachItem.logoUrl}
              alt={eachItem.name}
              className="imgElement"
            />
            <p className="name">{eachItem.name}</p>
          </Link>
        ))}
      </ul>
    )
  }

  coursesLoading = () => (
    <div className="loaderContainer">
      <div data-testid="loader">
        <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
      </div>
    </div>
  )

  coursesFailure = () => (
    <div className="loaderContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failureImg"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button">Retry</button>
    </div>
  )

  getViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.getCourses()
      case apiStatusConstants.inProgress:
        return this.coursesLoading()
      case apiStatusConstants.failure:
        return this.coursesFailure()
      default:
        return null
    }
  }

  render() {
    const {courses} = this.state
    return (
      <div className="HomeContainer">
        <h1 className="Heading">Courses</h1>
        <>{this.getViews()}</>
      </div>
    )
  }
}

export default Home
